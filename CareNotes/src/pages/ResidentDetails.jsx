export default function ResidentDetails({ resident, role, onBack }) {
  return (
    <section className="panel">
      <div className="top">
        <div>
          <h1 className="h1">{resident.fullName}</h1>
          <div className="sub">
            <span>{resident.unit}</span>
            <span className="dot">•</span>
            <span>{resident.room}</span>
            <span className="dot">•</span>
            <span>{resident.personalNumber}</span>
          </div>
        </div>

        <button className="btn" type="button" onClick={onBack}>
          Tillbaka
        </button>
      </div>

      <div className="card">
        <div className="label">Telefon</div>
        <div className="value">{resident.phone || "Saknas"}</div>

        <div className="label">Akut kontakt</div>
        <div className="value">{resident.emergencyContact || "Saknas"}</div>

        <div className="label">Status</div>
        <div className="value">{resident.isActive ? "Aktiv" : "Inaktiv"}</div>

        <div className="hint">
          Detta är tom detaljer sida. Nästa steg blir journal, bemötandeplan, dokument.
        </div>

        <div className="hintSmall">
          Roll: {role}
        </div>
      </div>

      <style>{css}</style>
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

  .top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
  }

  .h1 {
    margin-top: 0;
    margin-right: 0;
    margin-bottom: 0;
    margin-left: 0;
    font-size: 18px;
    font-weight: 950;
  }

  .sub {
    margin-top: 6px;
    font-size: 12px;
    opacity: 0.75;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
  }

  .dot {
    opacity: 0.55;
  }

  .btn {
    border: 1px solid rgba(15, 23, 42, 0.12);
    background: transparent;
    border-radius: 12px;
    padding-top: 10px;
    padding-right: 12px;
    padding-bottom: 10px;
    padding-left: 12px;
    cursor: pointer;
    font-weight: 900;
  }

  .card {
    border-radius: 16px;
    border: 1px solid rgba(15, 23, 42, 0.12);
    background: rgba(15, 23, 42, 0.02);
    padding-top: 12px;
    padding-right: 12px;
    padding-bottom: 12px;
    padding-left: 12px;
  }

  .label {
    font-size: 12px;
    font-weight: 900;
    opacity: 0.75;
    margin-top: 10px;
    margin-right: 0;
    margin-bottom: 6px;
    margin-left: 0;
  }

  .value {
    font-weight: 850;
  }

  .hint {
    margin-top: 14px;
    font-size: 13px;
    opacity: 0.75;
  }

  .hintSmall {
    margin-top: 8px;
    font-size: 12px;
    opacity: 0.65;
  }
`;
