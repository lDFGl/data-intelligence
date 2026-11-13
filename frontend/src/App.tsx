import { Activity, BarChart3, Database, FileSpreadsheet, GitCompareArrows, LayoutDashboard, ShieldCheck } from "lucide-react";

const modules = [
  { title: "Importação de dados", description: "Envie arquivos Excel e CSV para iniciar uma análise.", icon: FileSpreadsheet, status: "Planejado" },
  { title: "Explorador de dados", description: "Visualize, filtre e compreenda a estrutura das bases.", icon: Database, status: "Planejado" },
  { title: "Comparação de bases", description: "Cruze registros e identifique diferenças entre arquivos.", icon: GitCompareArrows, status: "Planejado" },
  { title: "Qualidade dos dados", description: "Identifique duplicidades, campos vazios e inconsistências.", icon: ShieldCheck, status: "Planejado" },
];

export default function App() {
  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">FG</div>
          <div><strong>DATA</strong><span>INTELLIGENCE</span></div>
        </div>
        <div className="nav-label">PLATAFORMA</div>
        <a className="nav-item active" href="#overview"><LayoutDashboard size={18} /> Visão geral</a>
        <a className="nav-item" href="#modules"><FileSpreadsheet size={18} /> Análises</a>
        <div className="sidebar-note"><Activity size={16} /> Fundação técnica em implantação</div>
      </aside>

      <section className="main-content" id="overview">
        <header className="topbar">
          <div><span className="eyebrow">PLATAFORMA CORPORATIVA</span><h1>Visão geral</h1></div>
          <span className="environment"><i /> Ambiente de desenvolvimento</span>
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
          <span className="count-pill">04 módulos planejados</span>
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

        <section className="notice">
          <div className="notice-icon"><ShieldCheck size={20} /></div>
          <div><strong>Ambiente inicial — sem dados corporativos</strong><p>Esta versão contém apenas a estrutura visual e técnica inicial. Uploads, autenticação, banco de dados e análises serão implementados e homologados nas próximas etapas.</p></div>
        </section>
        <footer>FG Data Intelligence <span>•</span> Versão 0.1.0 <span>•</span> Fundação em desenvolvimento</footer>
      </section>
    </main>
  );
}
