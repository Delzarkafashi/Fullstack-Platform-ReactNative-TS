export default function Dashboard() {
  return (
    <section className="panel">
      <style>{css}</style>

      <h1 className="h1">Översikt</h1>

      {/* Statistik */}
      <div className="stats">
        <div className="statCard">
          <span className="statLabel">Brukare</span>
          <span className="statValue">24</span>
        </div>

        <div className="statCard">
          <span className="statLabel">Aktiva ärenden</span>
          <span className="statValue">7</span>
        </div>

        <div className="statCard">
          <span className="statLabel">Anteckningar idag</span>
          <span className="statValue">13</span>
        </div>

        <div className="statCard">
          <span className="statLabel">Personal i tjänst</span>
          <span className="statValue">5</span>
        </div>
      </div>

      {/* Innehåll */}
      <div className="grid">
        <div className="box">
          <h2>Senaste händelser</h2>
          <ul className="list">
            <li>Anteckning skapad för Anna Karlsson</li>
            <li>Genomförandeplan uppdaterad</li>
            <li>Ny brukare tillagd</li>
            <li>Personal ändrad på avdelning B</li>
          </ul>
        </div>

        <div className="box">
          <h2>Att göra</h2>
          <ul className="list">
            <li>Signera 3 anteckningar</li>
            <li>Följ upp möte med brukare</li>
            <li>Uppdatera genomförandeplan</li>
          </ul>
        </div>

        <div className="box">
          <h2>Snabblänkar</h2>
          <div className="actions">
            <button>Ny anteckning</button>
            <button>Visa brukare</button>
            <button>Personal</button>
            <button>Inställningar</button>
          </div>
        </div>

        <div className="box">
          <h2>Systemstatus</h2>
          <ul className="list muted">
            <li>API status: OK</li>
            <li>Senaste backup: Idag 02:00</li>
            <li>Version: 0.1.0</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

const css = `
.panel {
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 16px;
  padding-top: 14px;
  padding-right: 14px;
  padding-bottom: 14px;
  padding-left: 14px;
  max-width: 1100px;
}

.h1 {
  margin-top: 0;
  margin-right: 0;
  margin-bottom: 16px;
  margin-left: 0;
  font-size: 18px;
  font-weight: 950;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}

.statCard {
  border-radius: 14px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  padding-top: 14px;
  padding-right: 14px;
  padding-bottom: 14px;
  padding-left: 14px;
  background: rgba(15, 23, 42, 0.02);
}

.statLabel {
  display: block;
  font-size: 12px;
  color: rgba(15, 23, 42, 0.6);
}

.statValue {
  font-size: 24px;
  font-weight: 800;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 14px;
}

.box {
  border-radius: 16px;
  border: 1px dashed rgba(15, 23, 42, 0.22);
  background: rgba(15, 23, 42, 0.02);
  padding-top: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
  padding-left: 16px;
}

.box h2 {
  margin-top: 0;
  margin-right: 0;
  margin-bottom: 10px;
  margin-left: 0;
  font-size: 14px;
  font-weight: 800;
}

.list {
  margin-top: 0;
  margin-right: 0;
  margin-bottom: 0;
  margin-left: 0;
  padding-left: 16px;
}

.list li {
  margin-bottom: 6px;
  font-size: 13px;
}

.muted {
  color: rgba(15, 23, 42, 0.6);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.actions button {
  border-radius: 10px;
  border: 1px solid rgba(15, 23, 42, 0.2);
  background: #ffffff;
  padding-top: 8px;
  padding-right: 12px;
  padding-bottom: 8px;
  padding-left: 12px;
  font-size: 13px;
  cursor: pointer;
}
`;
