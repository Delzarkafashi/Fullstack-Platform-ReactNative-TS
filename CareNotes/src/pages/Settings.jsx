export default function Settings() {
  return (
    <section className="panel">
      <style>{css}</style>

      <h1 className="h1">Inställningar</h1>

      <div className="grid">
        {/* Konto */}
        <div className="box">
          <h2>Konto</h2>

          <div className="row">
            <div>
              <div className="label">Användarnamn</div>
              <div className="hint">Visas i systemet</div>
            </div>
            <div className="value">Chef</div>
          </div>

          <div className="row">
            <div>
              <div className="label">E-post</div>
              <div className="hint">Används för inloggning</div>
            </div>
            <div className="value">chef@carenotes.se</div>
          </div>

          <div className="actions">
            <button className="btn">Ändra lösenord</button>
            <button className="btn">Byt e-post</button>
          </div>
        </div>

        {/* Säkerhet */}
        <div className="box">
          <h2>Säkerhet</h2>

          <div className="row">
            <div>
              <div className="label">Tvåfaktorsautentisering</div>
              <div className="hint">Extra skydd vid inloggning</div>
            </div>
            <div className="pill ok">Aktiv</div>
          </div>

          <div className="row">
            <div>
              <div className="label">Automatisk utloggning</div>
              <div className="hint">Loggar ut efter inaktivitet</div>
            </div>
            <div className="pill">30 min</div>
          </div>

          <div className="actions">
            <button className="btnDanger">Logga ut alla enheter</button>
          </div>
        </div>

        {/* System */}
        <div className="box">
          <h2>System</h2>

          <div className="row">
            <div>
              <div className="label">Språk</div>
              <div className="hint">Systemets språk</div>
            </div>
            <div className="pill">Svenska</div>
          </div>

          <div className="row">
            <div>
              <div className="label">Tema</div>
              <div className="hint">Utseende</div>
            </div>
            <div className="pill">Ljust</div>
          </div>

          <div className="row">
            <div>
              <div className="label">Versionsinfo</div>
              <div className="hint">CareNotes</div>
            </div>
            <div className="value">v0.1.0</div>
          </div>
        </div>

        {/* Farligt */}
        <div className="box danger">
          <h2>Avancerat</h2>

          <p className="warning">
            Dessa åtgärder påverkar hela systemet.
          </p>

          <div className="actions">
            <button className="btnDanger">Återställ inställningar</button>
            <button className="btnDanger">Inaktivera konto</button>
          </div>
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
  margin-bottom: 16px;
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
  padding: 16px;
}

.box h2 {
  margin-top: 0;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 900;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding-top: 10px;
  padding-bottom: 10px;
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
  color: rgba(15, 23, 42, 0.6);
}

.value {
  font-size: 13px;
  font-weight: 800;
}

.pill {
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 800;
  border: 1px solid rgba(15, 23, 42, 0.18);
  background: #ffffff;
}

.ok {
  background: rgba(16, 185, 129, 0.10);
  border-color: rgba(16, 185, 129, 0.35);
  color: rgba(5, 150, 105, 1);
}

.actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  flex-wrap: wrap;
}

.btn {
  border-radius: 10px;
  border: 1px solid rgba(15, 23, 42, 0.20);
  background: #ffffff;
  padding: 8px 12px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.btnDanger {
  border-radius: 10px;
  border: 1px solid rgba(239, 68, 68, 0.35);
  background: rgba(239, 68, 68, 0.10);
  padding: 8px 12px;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
}

.warning {
  font-size: 12px;
  color: rgba(239, 68, 68, 0.9);
  margin-bottom: 10px;
}

.danger {
  border-color: rgba(239, 68, 68, 0.35);
}
`;
