export default function Layout({ role, route, onLogout, onNavigate, children }) {
  const items = [
    { key: "dashboard", label: "Översikt" },
    { key: "residents", label: "Brukare" },
    { key: "notes", label: "Allmänt" },
    { key: "staff", label: "Personal" },
    { key: "settings", label: "Inställningar" },
  ];

  return (
    <>
      <style>{css}</style>

      <div className="app">
        <header className="topbar">
          <div className="brand">
            <div className="brandName">CareNotes</div>
            <div className="brandTag">Tom UI</div>
          </div>

          <div className="topActions">
            <div className="rolePill">{role === "chef" ? "Chef" : "Personal"}</div>
            <button className="btn btnGhost" type="button" onClick={onLogout}>
              Logga ut
            </button>
          </div>
        </header>

        <nav className="sidenav">
          <div className="navList">
            {items.map((it) => (
              <button
                key={it.key}
                className={`navBtn ${route === it.key ? "navBtnActive" : ""}`}
                type="button"
                onClick={() => onNavigate(it.key)}
              >
                {it.label}
              </button>
            ))}
          </div>
        </nav>

        <main className="main">{children}</main>
      </div>
    </>
  );
}

const css = `
  :root {
    color-scheme: light;
  }

  body {
    margin: 0;
    font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
    background: #f6f7fb;
    color: #0f172a;
  }

  .app {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 280px 1fr;
    grid-template-rows: 60px 1fr;
    grid-template-areas:
      "top top"
      "nav main";
  }

  .topbar {
    grid-area: top;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #ffffff;
    border-bottom: 1px solid rgba(15, 23, 42, 0.12);
    padding-top: 0;
    padding-right: 16px;
    padding-bottom: 0;
    padding-left: 16px;
  }

  .brand {
    display: flex;
    align-items: baseline;
    gap: 10px;
  }

  .brandName {
    font-weight: 900;
    letter-spacing: 0.2px;
  }

  .brandTag {
    font-size: 12px;
    font-weight: 800;
    color: rgba(37, 99, 235, 0.85);
    background: rgba(37, 99, 235, 0.10);
    padding-top: 4px;
    padding-right: 8px;
    padding-bottom: 4px;
    padding-left: 8px;
    border-radius: 999px;
  }

  .topActions {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .rolePill {
    font-size: 12px;
    font-weight: 800;
    padding-top: 6px;
    padding-right: 10px;
    padding-bottom: 6px;
    padding-left: 10px;
    border-radius: 999px;
    border: 1px solid rgba(15, 23, 42, 0.12);
    background: rgba(15, 23, 42, 0.04);
  }

  .sidenav {
    grid-area: nav;
    background: #ffffff;
    border-right: 1px solid rgba(15, 23, 42, 0.12);
    padding-top: 12px;
    padding-right: 12px;
    padding-bottom: 12px;
    padding-left: 12px;
  }

  .navList {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .navBtn {
    width: 100%;
    text-align: left;
    cursor: pointer;
    border-radius: 12px;
    border: 1px solid rgba(15, 23, 42, 0.12);
    background: #ffffff;
    font-weight: 800;
    padding-top: 10px;
    padding-right: 12px;
    padding-bottom: 10px;
    padding-left: 12px;
  }

  .navBtn:hover {
    background: rgba(15, 23, 42, 0.04);
  }

  .navBtnActive {
    background: rgba(37, 99, 235, 0.10);
    border-color: rgba(37, 99, 235, 0.35);
    color: #1d4ed8;
  }

  .main {
    grid-area: main;
    padding-top: 16px;
    padding-right: 16px;
    padding-bottom: 16px;
    padding-left: 16px;
  }

  .btn {
    border: 0;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 900;
    padding-top: 10px;
    padding-right: 12px;
    padding-bottom: 10px;
    padding-left: 12px;
  }

  .btnGhost {
    background: transparent;
    color: #0f172a;
    border: 1px solid rgba(15, 23, 42, 0.12);
  }

  @media (max-width: 980px) {
    .app {
      grid-template-columns: 1fr;
      grid-template-rows: 60px auto 1fr;
      grid-template-areas:
        "top"
        "nav"
        "main";
    }
  }
`;
