export default function Login({ onSelectRole }) {
  return (
    <>
      <style>{css}</style>

      <div className="loginWrap">
        <div className="loginCard">
          <div className="loginTitle">CareNotes</div>
          <div className="loginSub">Logga in för att fortsätta</div>

          <div className="loginButtons">
            <button
              className="btn btnPrimary"
              type="button"
              onClick={() => onSelectRole("chef")}
            >
              Logga in
            </button>
          </div>

          <div className="loginMeta">UI först. Data kopplas från backend sen.</div>
        </div>
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

  .loginWrap {
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding-top: 16px;
    padding-right: 16px;
    padding-bottom: 16px;
    padding-left: 16px;
  }

  .loginCard {
    width: 100%;
    max-width: 420px;
    background: #ffffff;
    border: 1px solid rgba(15, 23, 42, 0.12);
    border-radius: 18px;
    padding-top: 18px;
    padding-right: 18px;
    padding-bottom: 18px;
    padding-left: 18px;
  }

  .loginTitle {
    font-size: 20px;
    font-weight: 950;
    margin-top: 0;
    margin-right: 0;
    margin-bottom: 8px;
    margin-left: 0;
  }

  .loginSub {
    font-size: 13px;
    opacity: 0.75;
    margin-top: 0;
    margin-right: 0;
    margin-bottom: 14px;
    margin-left: 0;
  }

  .loginButtons {
    display: grid;
    gap: 10px;
  }

  .loginMeta {
    margin-top: 12px;
    font-size: 12px;
    opacity: 0.7;
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

  .btnPrimary {
    background: #2563eb;
    color: #ffffff;
  }
`;
