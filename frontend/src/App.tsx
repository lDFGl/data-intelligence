import { useMemo, useState } from "react";
import { Activity, AlertCircle, BarChart3, Database, FileSpreadsheet, GitCompareArrows, LayoutDashboard, ShieldCheck, Upload, X } from "lucide-react";

const modules = [
  { title: "Importação de dados", description: "Pré-visualize arquivos CSV diretamente no navegador.", icon: FileSpreadsheet, status: "Demonstração" },
  { title: "Explorador de dados", description: "Visualize a estrutura e os primeiros registros da base.", icon: Database, status: "Em evolução" },
  { title: "Comparação de bases", description: "Cruze registros e identifique diferenças entre arquivos.", icon: GitCompareArrows, status: "Planejado" },
  { title: "Qualidade dos dados", description: "Identifique duplicidades, campos vazios e inconsistências.", icon: ShieldCheck, status: "Planejado" },
];

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const PREVIEW_LIMIT = 100;

function parseCsv(input: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;

  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];
    if (char === '"') {
      if (quoted && input[i + 1] === '"') {
        cell += '"';
        i += 1;
      } else {
        quoted = !quoted;
      }
    } else if (char === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && input[i + 1] === "\n") i += 1;
      row.push(cell);
      if (row.some((value) => value.trim() !== "")) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  if (quoted) throw new Error("O arquivo contém aspas não finalizadas. Verifique a estrutura do CSV.");
  row.push(cell);
  if (row.some((value) => value.trim() !== "")) rows.push(row);
  return rows;
}

export default function App() {
  const [fileName, setFileName] = useState("");
  const [headers, setHeaders] = useState<string[]>([]);
  const [records, setRecords] = useState<string[][]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [error, setError] = useState("");

  const previewRows = useMemo(() => records.slice(0, PREVIEW_LIMIT), [records]);

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setError("");
    setFileName("");
    setHeaders([]);
    setRecords([]);
    setTotalRows(0);

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setError("Nesta demonstração, selecione um arquivo CSV. O suporte a Excel será implementado em uma próxima etapa.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("O arquivo excede o limite de 5 MB desta demonstração.");
      return;
    }
    if (file.size === 0) {
      setError("O arquivo está vazio.");
      return;
    }

    try {
      const text = await file.text();
      const parsed = parseCsv(text.replace(/^\uFEFF/, ""));
      if (parsed.length < 2) throw new Error("O CSV precisa conter uma linha de cabeçalho e ao menos um registro.");
      const columns = parsed[0].map((value, index) => value.trim() || `Coluna ${index + 1}`);
      if (columns.length === 0) throw new Error("Não foi possível identificar as colunas do arquivo.");
      setFileName(file.name);
      setHeaders(columns);
      setRecords(parsed.slice(1));
      setTotalRows(parsed.length - 1);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Não foi possível ler o arquivo.");
    }
  }

  function clearFile() {
    setFileName("");
    setHeaders([]);
    setRecords([]);
    setTotalRows(0);
    setError("");
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">FG</div>
          <div><strong>DATA</strong><span>INTELLIGENCE</span></div>
        </div>
        <div className="nav-label">PLATAFORMA</div>
        <a className="nav-item active" href="#overview"><LayoutDashboard size={18} /> Visão geral</a>
        <a className="nav-item" href="#importacao"><FileSpreadsheet size={18} /> Importação CSV</a>
        <div className="sidebar-note"><Activity size={16} /> Demonstração em desenvolvimento</div>
      </aside>

      <section className="main-content" id="overview">
        <header className="topbar">
          <div><span className="eyebrow">PLATAFORMA CORPORATIVA</span><h1>Visão geral</h1></div>
          <span className="environment"><i /> Demonstração pública</span>
        </header>

        <section className="welcome-panel">
          <div>
            <span className="eyebrow light">FG DATA INTELLIGENCE</span>
            <h2>Dados organizados.<br />Decisões mais confiáveis.</h2>
            <p>Uma plataforma para importar, cruzar e analisar informações com rastreabilidade.</p>
          </div>
          <div className="welcome-icon"><BarChart3 size={68} strokeWidth={1.2} /></div>
        </section>

        <div className="section-heading" id="modules">
          <div><span className="eyebrow">CENTRAL DE ANÁLISES</span><h2>Módulos da plataforma</h2></div>
          <span className="count-pill">01 recurso demonstrativo</span>
        </div>

        <section className="module-grid">
          {modules.map(({ title, description, icon: Icon, status }) => (
            <article className="module-card" key={title}>
              <div className="module-icon"><Icon size={21} /></div>
              <span className="status">{status}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </section>

        <section className="import-panel" id="importacao">
          <div className="import-heading">
            <div><span className="eyebrow">TESTE LOCAL NO NAVEGADOR</span><h2>Pré-visualização de CSV</h2></div>
            {fileName && <button className="clear-button" onClick={clearFile} type="button"><X size={15} /> Limpar</button>}
          </div>
          <p className="import-description">Selecione uma planilha CSV para visualizar cabeçalhos e registros. O arquivo é processado localmente e não é enviado a nenhum servidor.</p>
          <label className="upload-zone">
            <Upload size={22} />
            <strong>Selecionar arquivo CSV</strong>
            <span>Máximo de 5 MB · Prévia de até 100 registros</span>
            <input type="file" accept=".csv,text/csv" onChange={handleFile} />
          </label>
          {error && <div className="error-message"><AlertCircle size={17} />{error}</div>}
          {fileName && (
            <div className="preview">
              <div className="preview-meta"><strong>{fileName}</strong><span>{totalRows.toLocaleString("pt-BR")} registros · {headers.length} colunas</span></div>
              {totalRows > PREVIEW_LIMIT && <p className="preview-limit">Exibindo os primeiros {PREVIEW_LIMIT} registros. O arquivo completo não é armazenado.</p>}
              <div className="table-wrap">
                <table>
                  <thead><tr>{headers.map((header, index) => <th key={index}>{header}</th>)}</tr></thead>
                  <tbody>{previewRows.map((record, rowIndex) => (
                    <tr key={rowIndex}>{headers.map((_, columnIndex) => <td key={columnIndex}>{record[columnIndex] ?? ""}</td>)}</tr>
                  ))}</tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        <section className="notice">
          <div className="notice-icon"><ShieldCheck size={20} /></div>
          <div><strong>Demonstração pública — não utilize dados reais</strong><p>O recurso de CSV funciona apenas no navegador, mas esta página é pública. Utilize exclusivamente arquivos fictícios e sem dados pessoais ou corporativos. Não há autenticação, banco de dados ou armazenamento seguro nesta versão.</p></div>
        </section>
        <footer>FG Data Intelligence <span>•</span> Versão 0.1.1 <span>•</span> Demonstração em desenvolvimento</footer>
      </section>
    </main>
  );
}
