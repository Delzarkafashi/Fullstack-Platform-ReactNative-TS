export default function ResidentCard({ resident, onSelect }) {
  return (
    <button
      className="card"
      type="button"
      onClick={() => onSelect(resident.id)}
    >
      <div className="name">{resident.fullName}</div>

      <div className="meta">
        <span>{resident.unit}</span>
        <span className="dot">•</span>
        <span>{resident.room ?? "-"}</span>
      </div>

      <style>{css}</style>
    </button>
  );
}

const css = `
  .card {
    text-align: left;
    border-radius: 14px;
    border: 1px solid rgba(15, 23, 42, 0.12);
    background: #ffffff;
    padding-top: 10px;
    padding-right: 12px;
    padding-bottom: 10px;
    padding-left: 12px;
    cursor: pointer;
    width: 100%;
  }

  .card:hover {
    background: rgba(15, 23, 42, 0.03);
  }

  .name {
    font-weight: 950;
    margin-bottom: 6px;
  }

  .meta {
    font-size: 12px;
    opacity: 0.75;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .dot {
    opacity: 0.55;
  }
`;
