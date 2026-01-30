export default function SideNav({ route, onNavigate }) {
  const items = [
    { key: "dashboard", label: "Översikt" },
    { key: "anteckningar", label: "anteckningar" }, 
    { key: "residents", label: "Brukare" },
    { key: "notes", label: "Allmänt" },
    // { key: "staff", label: "Personal" },
    { key: "settings", label: "Inställningar" },
  ];

  return (
    <nav className="nav">
      <style>{css}</style>

      <div className="navCard">
        {items.map((it) => {
          const active = route === it.key;

          return (
            <button
              key={it.key}
              className={active ? "navItem navItemActive" : "navItem"}
              type="button"
              onClick={() => onNavigate(it.key)}
            >
              {it.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

const css = `
  .navCard {
    background: #ffffff;
    border: 1px solid rgba(15, 23, 42, 0.12);
    border-radius: 16px;
    padding-top: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
  }

  .navItem {
    width: 100%;
    text-align: left;
    border-radius: 12px;
    border: 1px solid rgba(15, 23, 42, 0.12);
    background: #ffffff;
    padding-top: 10px;
    padding-right: 12px;
    padding-bottom: 10px;
    padding-left: 12px;
    font-size: 13px;
    font-weight: 800;
    cursor: pointer;
    margin-top: 8px;
  }

  .navItem:first-child {
    margin-top: 0;
  }

  .navItemActive {
    background: rgba(37, 99, 235, 0.10);
    border-color: rgba(37, 99, 235, 0.35);
    color: rgba(37, 99, 235, 1);
  }
`;
