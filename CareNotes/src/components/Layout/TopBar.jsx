export default function TopBar({ onLogout }) {
  return (
    <header className="topbar">
      <style>{css}</style>

      <div className="left">
        <div className="brand">CareNotes</div>
        <div className="tag">Tom UI</div>
      </div>

      <div className="right">
        <button className="logout" type="button" onClick={onLogout}>
          Logga ut
        </button>
      </div>
    </header>
  );
}

const css = `
  .topbar {
    background: #ffffff;
    border-bottom: 1px solid rgba(15, 23, 42, 0.10);
    padding-top: 12px;
    padding-right: 16px;
    padding-bottom: 12px;
    padding-left: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .brand {
    font-weight: 950;
    font-size: 16px;
  }

  .tag {
    font-size: 12px;
    font-weight: 800;
    padding-top: 4px;
    padding-right: 10px;
    padding-bottom: 4px;
    padding-left: 10px;
    border-radius: 999px;
    background: rgba(37, 99, 235, 0.10);
    color: rgba(37, 99, 235, 1);
    border: 1px solid rgba(37, 99, 235, 0.25);
  }

  .right {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .logout {
    border-radius: 12px;
    border: 1px solid rgba(15, 23, 42, 0.18);
    background: #ffffff;
    padding-top: 8px;
    padding-right: 12px;
    padding-bottom: 8px;
    padding-left: 12px;
    font-size: 13px;
    font-weight: 900;
    cursor: pointer;
  }
`;
