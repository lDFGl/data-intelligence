import { useMemo, useState } from "react";
import { Activity, AlertCircle, BarChart3, Database, FileSpreadsheet, FileText, GitCompareArrows, LayoutDashboard, ShieldCheck, Upload, X } from "lucide-react";
import ExcelJS from "exceljs";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";

GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

const modules = [
  { title: "Importação de dados", description: "Pré-visualize arquivos CSV, Excel e PDF diretamente no navegador.", icon: FileSpreadsheet, status: "Demonstração" },
  { title: "Explorador de dados", description: "Visualize a estrutura e os primeiros registros da base.", icon: Database, status: "Em evolução" },
  { title: "Comparação de bases", description: "Cruze registros e identifique diferenças entre arquivos.", icon: GitCompareArrows, status: "Planejado" },
  { title: "Qualidade dos dados", description: "Identifique duplicidades, campos vazios e inconsistências.", icon: ShieldCheck, status: "Planejado" },
];

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const PREVIEW_LIMIT = 100;
const PDF_PAGE_LIMIT = 20;
const PDF_TEXT_LIMIT = 100_000;
const EXCEL_ROW_LIMIT = 20_000;
const EXCEL_COLUMN_LIMIT = 100;

type PreviewData = { headers: string[]; records: string[][]; totalRows: number };

function parseCsv(input: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  let commaCount = 0;
  let semicolonCount = 0;
  let inFirstFieldQuote = false;

  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];
    if (char === '"') {
      if (inFirstFieldQuote && input[i + 1] === '"') i += 1;
      else inFirstFieldQuote = !inFirstFieldQuote;
    } else if (!inFirstFieldQuote && (char === "\n" || char === "\r")) {
      break;
    } else if (!inFirstFieldQuote && char === ",") commaCount += 1;
    else if (!inFirstFieldQuote && char === ";") semicolonCount += 1;
  }
  const delimiter = semicolonCount > commaCount ? ";" : ",";

  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];
    if (char === '"') {
      if (quoted && input[i + 1] === '"') {
        cell += '"';
        i += 1;
      } else quoted = !quoted;
    } else if (char === delimiter && !quoted) {
      row.push(cell); cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && input[i + 1] === "\n") i += 1;
      row.push(cell);
      if (row.some((value) => value.trim() !== "")) rows.push(row);
      row = []; cell = "";
    } else cell += char;
  }
  if (quoted) throw new Error("O arquivo contém aspas não finalizadas. Verifique a estrutura do CSV.");
  row.push(cell);
  if (row.some((value) => value.trim() !== "")) rows.push(row);
  return rows;
}

function normalizeTable(rows: string[][]): PreviewData {
  if (rows.length < 2) throw new Error("A planilha precisa conter cabeçalho e ao menos um registro.");
  const headers = rows[0].map((value, index) => value.trim() || `Coluna ${index + 1}`);
  if (headers.length > EXCEL_COLUMN_LIMIT) throw new Error(`O arquivo ultrapassa o limite demonstrativo de ${EXCEL_COLUMN_LIMIT} colunas.`);
  const data = rows.slice(1);
  return { headers, records: data.slice(0, EXCEL_ROW_LIMIT), totalRows: data.length };
}

function cellToText(value: ExcelJS.CellValue): string {
  if (value === null || value === undefined) return "";
  if (value instanceof Date) return value.toLocaleDateString("pt-BR");
  if (typeof value === "object") {
    if ("formula" in value || "sharedFormula" in value) return "[Fórmula não executada]";
    if ("richText" in value) return value.richText.map((part) => part.text).join("");
    if ("text" in value) return String(value.text);
    if ("hyperlink" in value) return String(value.hyperlink);
    return JSON.stringify(value);
  }
  return String(value);
}

async function readExcel(file: File): Promise<{ sheets: string[]; data: Record<string, PreviewData> }> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(await file.arrayBuffer());
  const sheets = workbook.worksheets.filter((sheet) => sheet.state === "visible").map((sheet) => sheet.name);
  if (sheets.length === 0) throw new Error("Não foram encontradas abas visíveis no arquivo Excel.");
  const data: Record<string, PreviewData> = {};
  for (const name of sheets) {
    const sheet = workbook.getWorksheet(name);
    if (!sheet) continue;
    const rows: string[][] = [];
    const maxRow = Math.min(sheet.rowCount, EXCEL_ROW_LIMIT + 1);
    const maxCol = Math.min(sheet.columnCount, EXCEL_COLUMN_LIMIT);
    for (let rowNumber = 1; rowNumber <= maxRow; rowNumber += 1) {
      const row = sheet.getRow(rowNumber);
      const values = Array.from({ length: maxCol }, (_, index) => cellToText(row.getCell(index + 1).value));
      if (values.some((value) => value.trim() !== "")) rows.push(values);
    }
    if (rows.length >= 2) data[name] = normalizeTable(rows);
  }
  if (Object.keys(data).length === 0) throw new Error("As abas não possuem tabelas com cabeçalho e registros.");
  return { sheets: Object.keys(data), data };
}

async function readPdf(file: File): Promise<{ text: string; pages: number; extractedPages: number }> {
  const pdf = await getDocument({ data: await file.arrayBuffer() }).promise;
  const pageCount = pdf.numPages;
  const chunks: string[] = [];
  const pagesToRead = Math.min(pageCount, PDF_PAGE_LIMIT);
  let length = 0;
  for (let pageNumber = 1; pageNumber <= pagesToRead; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    const pageText = content.items.map((item) => ("str" in item ? item.str : "")).join(" ").replace(/\s+/g, " ").trim();
    if (pageText) chunks.push(`PÁGINA ${pageNumber}\n${pageText}`);
    length += pageText.length;
    if (length >= PDF_TEXT_LIMIT) break;
  }
  const text = chunks.join("\n\n").slice(0, PDF_TEXT_LIMIT);
  if (!text.trim()) throw new Error("Não foi possível extrair texto. Se o PDF for digitalizado como imagem, será necessário OCR, ainda não disponível nesta demonstração.");
  return { text, pages: pageCount, extractedPages: pagesToRead };
}

export default function App() {
  const [fileName, setFileName] = useState("");
  const [headers, setHeaders] = useState<string[]>([]);
  const [records, setRecords] = useState<string[][]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [error, setError] = useState("");
  const [fileType, setFileType] = useState<"csv" | "excel" | "pdf" | "">("");
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [activeSheet, setActiveSheet] = useState("");
  const [sheetData, setSheetData] = useState<Record<string, PreviewData>>({});
  const [pdfText, setPdfText] = useState("");
  const [pdfPages, setPdfPages] = useState(0);
  const [pdfExtractedPages, setPdfExtractedPages] = useState(0);

  const previewRows = useMemo(() => records.slice(0, PREVIEW_LIMIT), [records]);

  function clearFile() {
    setFileName(""); setHeaders([]); setRecords([]); setTotalRows(0); setError("");
    setFileType(""); setSheetNames([]); setActiveSheet(""); setSheetData({});
    setPdfText(""); setPdfPages(0); setPdfExtractedPages(0);
  }

  function selectSheet(name: string, data = sheetData) {
    const selected = data[name];
    if (!selected) return;
    setActiveSheet(name); setHeaders(selected.headers); setRecords(selected.records); setTotalRows(selected.totalRows);
  }

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    clearFile();
    if (file.size > MAX_FILE_SIZE) { setError("O arquivo excede o limite de 10 MB desta demonstração."); return; }
    if (file.size === 0) { setError("O arquivo está vazio."); return; }

    const extension = file.name.split(".").pop()?.toLowerCase();
    try {
      if (extension === "csv") {
        const parsed = parseCsv((await file.text()).replace(/^\uFEFF/, ""));
        const table = normalizeTable(parsed);
        setFileType("csv"); setFileName(file.name); setHeaders(table.headers);
        setRecords(table.records); setTotalRows(table.totalRows);
      } else if (extension === "xlsx") {
        const result = await readExcel(file);
        setFileType("excel"); setFileName(file.name); setSheetNames(result.sheets); setSheetData(result.data);
        selectSheet(result.sheets[0], result.data);
      } else if (extension === "pdf") {
        const result = await readPdf(file);
        setFileType("pdf"); setFileName(file.name); setPdfText(result.text);
        setPdfPages(result.pages); setPdfExtractedPages(Math.min(result.extractedPages, result.pages));
      } else {
        setError("Formato não suportado. Selecione um arquivo .xlsx, .csv ou .pdf.");
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Não foi possível ler o arquivo. Verifique se ele não está corrompido ou protegido por senha.");
    }
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark">FG</div><div><strong>DATA</strong><span>INTELLIGENCE</span></div></div>
        <div className="nav-label">PLATAFORMA</div>
        <a className="nav-item active" href="#overview"><LayoutDashboard size={18} /> Visão geral</a>
        <a className="nav-item" href="#importacao"><FileSpreadsheet size={18} /> Importação de arquivos</a>
        <div className="sidebar-note"><Activity size={16} /> Demonstração em desenvolvimento</div>
      </aside>

      <section className="main-content" id="overview">
        <header className="topbar"><div><span className="eyebrow">PLATAFORMA CORPORATIVA</span><h1>Visão geral</h1></div><span className="environment"><i /> Demonstração pública</span></header>
        <section className="welcome-panel"><div><span className="eyebrow light">FG DATA INTELLIGENCE</span><h2>Dados organizados.<br />Decisões mais confiáveis.</h2><p>Uma plataforma para importar, cruzar e analisar informações com rastreabilidade.</p></div><div className="welcome-icon"><BarChart3 size={68} strokeWidth={1.2} /></div></section>

        <div className="section-heading" id="modules"><div><span className="eyebrow">CENTRAL DE ANÁLISES</span><h2>Módulos da plataforma</h2></div><span className="count-pill">03 formatos demonstrativos</span></div>
        <section className="module-grid">
          {modules.map(({ title, description, icon: Icon, status }) => <article className="module-card" key={title}><div className="module-icon"><Icon size={21} /></div><span className="status">{status}</span><h3>{title}</h3><p>{description}</p></article>)}
        </section>

        <section className="import-panel" id="importacao">
          <div className="import-heading"><div><span className="eyebrow">TESTE LOCAL NO NAVEGADOR</span><h2>Pré-visualização de arquivos</h2></div>{fileName && <button className="clear-button" onClick={clearFile} type="button"><X size={15} /> Limpar</button>}</div>
          <p className="import-description">Selecione um arquivo Excel, CSV ou PDF para visualizar seu conteúdo. O processamento ocorre localmente no navegador; o arquivo não é enviado a um servidor.</p>
          <label className="upload-zone"><Upload size={22} /><strong>Selecionar arquivo</strong><span>Excel (.xlsx), CSV (.csv) ou PDF (.pdf) · Máximo de 10 MB</span><input type="file" accept=".xlsx,.csv,.pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv,application/pdf" onChange={handleFile} /></label>
          {error && <div className="error-message"><AlertCircle size={17} />{error}</div>}
          {fileName && fileType === "excel" && <div className="sheet-selector"><label htmlFor="sheet-select">Aba da planilha</label><select id="sheet-select" value={activeSheet} onChange={(event) => selectSheet(event.target.value)}>{sheetNames.map((name) => <option key={name} value={name}>{name}</option>)}</select><span>{sheetNames.length} aba(s) com dados identificadas</span></div>}
          {fileName && fileType !== "pdf" && <div className="preview"><div className="preview-meta"><strong>{fileName}{activeSheet ? ` · ${activeSheet}` : ""}</strong><span>{totalRows.toLocaleString("pt-BR")} registros · {headers.length} colunas</span></div>{totalRows > PREVIEW_LIMIT && <p className="preview-limit">Exibindo os primeiros {PREVIEW_LIMIT} registros. {fileType === "excel" && totalRows > EXCEL_ROW_LIMIT ? `A leitura foi limitada a ${EXCEL_ROW_LIMIT.toLocaleString("pt-BR")} linhas por aba.` : "O arquivo completo não é exibido na prévia."}</p>}<div className="table-wrap"><table><thead><tr>{headers.map((header, index) => <th key={index}>{header}</th>)}</tr></thead><tbody>{previewRows.map((record, rowIndex) => <tr key={rowIndex}>{headers.map((_, columnIndex) => <td key={columnIndex}>{record[columnIndex] ?? ""}</td>)}</tr>)}</tbody></table></div></div>}
          {fileName && fileType === "pdf" && <div className="pdf-preview"><div className="preview-meta"><strong><FileText size={15} /> {fileName}</strong><span>{pdfPages} página(s) no documento</span></div><p className="pdf-note">Texto extraído de até {PDF_PAGE_LIMIT} páginas (limite de {PDF_TEXT_LIMIT.toLocaleString("pt-BR")} caracteres). PDFs digitalizados como imagem precisam de OCR, ainda não disponível.</p><pre>{pdfText}{pdfPages > pdfExtractedPages ? "\n\n[Prévia limitada: nem todas as páginas foram processadas.]" : ""}</pre></div>}
        </section>

        <section className="notice"><div className="notice-icon"><ShieldCheck size={20} /></div><div><strong>Demonstração pública — não utilize dados reais</strong><p>Excel, CSV e PDF são processados localmente no navegador e não são enviados para API. Esta página é pública e não oferece autenticação, banco de dados ou armazenamento seguro. PDFs com senha e documentos digitalizados podem não ser lidos; nenhum macro ou fórmula é executado.</p></div></section>
        <footer>FG Data Intelligence <span>•</span> Versão 0.2.0 <span>•</span> Demonstração em desenvolvimento</footer>
      </section>
    </main>
  );
}
