export default function Staff({ role }) {
  return (
    <section className="panel">
      <style>{css}</style>
      <h1 className="h1">Personal</h1>
      <div className="box">Tom sida</div>
      <div className="muted">Endast Chef ska kunna hantera detta senare. Roll: {role}</div>
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
    margin-bottom: 12px;
    margin-left: 0;
    font-size: 18px;
    font-weight: 950;
  }

  .box {
    border-radius: 16px;
    border: 1px dashed rgba(15, 23, 42, 0.22);
    background: rgba(15, 23, 42, 0.02);
    padding-top: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
  }

  .muted {
    font-size: 13px;
    opacity: 0.7;
    margin-top: 10px;
  }
`;
