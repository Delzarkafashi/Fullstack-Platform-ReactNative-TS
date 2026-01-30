export default function General() {
  return (
    <section className="panel">
      <style>{css}</style>

      <h1 className="h1">Allmänt</h1>

      <div className="grid">
        <div className="box">
          <h2>Snabbinställningar</h2>

          <div className="row">
            <div>
              <div className="label">Journalföring</div>
              <div className="hint">Styr beteende för anteckningar och signering</div>
            </div>

            <div className="pill ok">Aktiv</div>
          </div>

          <div className="row">
            <div>
              <div className="label">Autospara anteckning</div>
              <div className="hint">Sparar utkast automatiskt var 30 sek</div>
            </div>

            <button className="btn">På</button>
          </div>

          <div className="row">
            <div>
              <div className="label">Kräv signering</div>
              <div className="hint">Anteckningar måste signeras för att bli klara</div>
            </div>

            <button className="btn">På</button>
          </div>

          <div className="row">
            <div>
              <div className="label">Dölj känsliga fält</div>
              <div className="hint">Visar mindre info i listor och översikt</div>
            </div>

            <button className="btn">Av</button>
          </div>
        </div>

        <div className="box">
          <h2>Roll och behörighet</h2>

          <div className="kv">
            <div className="k">Roll</div>
            <div className="v">Chef</div>
          </div>

          <div className="kv">
            <div className="k">Behörighet</div>
            <div className="v">Full åtkomst</div>
          </div>

          <div className="kv">
            <div className="k">Avdelning</div>
            <div className="v">Boende A</div>
          </div>

          <div className="divider"></div>

          <h3 className="h3">Åtgärder</h3>

          <div className="actions">
            <button className="btnPrimary">Bjud in personal</button>
            <button className="btn">Hantera roller</button>
            <button className="btnDanger">Logga ut alla enheter</button>
          </div>
        </div>

        <div className="box">
          <h2>Rutin och rapport</h2>

          <div className="card">
            <div className="cardTitle">Daglig sammanfattning</div>
            <div className="cardText">Skapa en kort sammanfattning för senaste dygnet</div>
            <button className="btn">Skapa rapport</button>
          </div>

          <div className="card">
            <div className="cardTitle">Månadsrapport</div>
            <div className="cardText">Exportera statistik och signeringar</div>
            <div className="actions">
              <button className="btn">PDF</button>
              <button className="btn">CSV</button>
            </div>
          </div>
        </div>

        <div className="box">
          <h2>Systemstatus</h2>

          <div className="statusGrid">
            <div className="statusItem">
              <div className="statusLabel">API</div>
              <div className="pill ok">OK</div>
            </div>

            <div className="statusItem">
              <div className="statusLabel">Databas</div>
              <div className="pill ok">OK</div>
            </div>

            <div className="statusItem">
              <div className="statusLabel">Senaste backup</div>
              <div className="statusValue">Idag 02:00</div>
            </div>

            <div className="statusItem">
              <div className="statusLabel">Version</div>
              <div className="statusValue">0.1.0</div>
            </div>
          </div>

          <div className="divider"></div>

          <h3 className="h3">Senaste händelser</h3>
          <ul className="list">
            <li>Anteckning signerad av personal</li>
            <li>Ny brukare tillagd</li>
            <li>Genomförandeplan uppdaterad</li>
            <li>Inställning ändrad: kräver signering</li>
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

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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
    margin-bottom: 12px;
    margin-left: 0;
    font-size: 14px;
    font-weight: 900;
  }

  .h3 {
    margin-top: 0;
    margin-right: 0;
    margin-bottom: 10px;
    margin-left: 0;
    font-size: 13px;
    font-weight: 900;
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding-top: 10px;
    padding-right: 0;
    padding-bottom: 10px;
    padding-left: 0;
    border-top: 1px solid rgba(15, 23, 42, 0.10);
  }

  .row:first-of-type {
    border-top: 0;
    padding-top: 0;
  }

  .label {
    font-size: 13px;
    font-weight: 800;
  }

  .hint {
    font-size: 12px;
    color: rgba(15, 23, 42, 0.60);
    margin-top: 2px;
  }

  .pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    padding-top: 6px;
    padding-right: 10px;
    padding-bottom: 6px;
    padding-left: 10px;
    font-size: 12px;
    font-weight: 800;
    border: 1px solid rgba(15, 23, 42, 0.18);
    background: #ffffff;
    white-space: nowrap;
  }

  .ok {
    background: rgba(16, 185, 129, 0.10);
    border-color: rgba(16, 185, 129, 0.35);
    color: rgba(5, 150, 105, 1);
  }

  .btn {
    border-radius: 10px;
    border: 1px solid rgba(15, 23, 42, 0.20);
    background: #ffffff;
    padding-top: 8px;
    padding-right: 12px;
    padding-bottom: 8px;
    padding-left: 12px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
  }

  .btnPrimary {
    border-radius: 10px;
    border: 1px solid rgba(37, 99, 235, 0.35);
    background: rgba(37, 99, 235, 0.10);
    padding-top: 8px;
    padding-right: 12px;
    padding-bottom: 8px;
    padding-left: 12px;
    font-size: 13px;
    font-weight: 800;
    cursor: pointer;
  }

  .btnDanger {
    border-radius: 10px;
    border: 1px solid rgba(239, 68, 68, 0.35);
    background: rgba(239, 68, 68, 0.10);
    padding-top: 8px;
    padding-right: 12px;
    padding-bottom: 8px;
    padding-left: 12px;
    font-size: 13px;
    font-weight: 800;
    cursor: pointer;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .kv {
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 10px;
    padding-top: 10px;
    padding-right: 0;
    padding-bottom: 10px;
    padding-left: 0;
    border-top: 1px solid rgba(15, 23, 42, 0.10);
  }

  .kv:first-of-type {
    border-top: 0;
    padding-top: 0;
  }

  .k {
    font-size: 12px;
    color: rgba(15, 23, 42, 0.60);
    font-weight: 800;
  }

  .v {
    font-size: 13px;
    font-weight: 800;
  }

  .divider {
    height: 1px;
    background: rgba(15, 23, 42, 0.10);
    margin-top: 14px;
    margin-right: 0;
    margin-bottom: 14px;
    margin-left: 0;
  }

  .card {
    border-radius: 14px;
    border: 1px solid rgba(15, 23, 42, 0.12);
    background: rgba(255, 255, 255, 0.70);
    padding-top: 12px;
    padding-right: 12px;
    padding-bottom: 12px;
    padding-left: 12px;
    margin-top: 10px;
  }

  .card:first-of-type {
    margin-top: 0;
  }

  .cardTitle {
    font-size: 13px;
    font-weight: 900;
    margin-bottom: 4px;
  }

  .cardText {
    font-size: 12px;
    color: rgba(15, 23, 42, 0.60);
    margin-bottom: 10px;
  }

  .statusGrid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .statusItem {
    border-radius: 14px;
    border: 1px solid rgba(15, 23, 42, 0.12);
    background: rgba(255, 255, 255, 0.70);
    padding-top: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  .statusLabel {
    font-size: 12px;
    color: rgba(15, 23, 42, 0.60);
    font-weight: 900;
  }

  .statusValue {
    font-size: 12px;
    font-weight: 900;
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
`;
