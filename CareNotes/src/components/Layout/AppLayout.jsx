import SideNav from "./SideNav";
import TopBar from "./TopBar";

export default function AppLayout({ role, route, onNavigate, onLogout, children }) {
  return (
    <div className="appShell">
      <style>{css}</style>

      <TopBar role={role} onLogout={onLogout} />

      <div className="body">
        <aside className="sidebar">
          <SideNav route={route} onNavigate={onNavigate} />
        </aside>

        <main className="main">
          <div className="content">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

const css = `
  .appShell {
    min-height: 100vh;
    background: #f6f7fb;
  }

  .body {
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: 16px;
    padding-top: 16px;
    padding-right: 16px;
    padding-bottom: 16px;
    padding-left: 16px;
  }

  .sidebar {
    position: sticky;
    top: 16px;
    align-self: start;
  }

  .main {
    min-width: 0;
  }

  .content {
    max-width: 1100px;
  }

  @media (max-width: 980px) {
    .body {
      grid-template-columns: 1fr;
    }

    .sidebar {
      position: static;
    }
  }
`;
