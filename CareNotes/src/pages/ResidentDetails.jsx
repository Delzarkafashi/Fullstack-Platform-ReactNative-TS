import { useEffect, useState } from "react";
import {
  getResidentById,
  getCarePlan,
  getDocumentation,
  createDocumentation,
} from "../services/residentsApi";

export default function ResidentDetails({ resident, role, onBack }) {
  const [details, setDetails] = useState(resident);
  const [carePlan, setCarePlan] = useState(null);
  const [docs, setDocs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const [docCategory, setDocCategory] = useState("hem");
  const [docNote, setDocNote] = useState("");
  const [docSaving, setDocSaving] = useState(false);
  const [docErr, setDocErr] = useState(null);

  useEffect(() => {
    let alive = true;

    async function load() {
      setLoading(true);
      setErr(null);

      try {
        const id = resident?.id;
        const [d, cp, documentation] = await Promise.all([
          getResidentById(id),
          getCarePlan(id),
          getDocumentation(id),
        ]);

        if (!alive) return;

        setDetails(d ?? resident);
        setCarePlan(cp ?? null);
        setDocs(Array.isArray(documentation) ? documentation : []);
      } catch (e) {
        if (!alive) return;
        setErr(e?.message || "Kunde inte hämta detaljer");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [resident?.id]);

  async function onCreateDoc() {
    setDocSaving(true);
    setDocErr(null);

    try {
      const created = await createDocumentation(details.id, {
        category: docCategory,
        note: docNote,
      });

      setDocNote("");
      setDocs((prev) => [{ ...created }, ...prev]);
    } catch (e) {
      setDocErr(e?.message || "Kunde inte spara dokumentation");
    } finally {
      setDocSaving(false);
    }
  }

  const r = details ?? resident;

  return (
    <section className="panel">
      <div className="top">
        <div>
          <h1 className="h1">{r.fullName}</h1>
          <div className="sub">
            <span>{r.unit}</span>
            <span className="dot">•</span>
            <span>{r.room}</span>
            <span className="dot">•</span>
            <span>{r.personalNumber}</span>
          </div>
        </div>

        <button className="btn" type="button" onClick={onBack}>
          Tillbaka
        </button>
      </div>

      {loading && <div className="muted">Laddar detaljer</div>}
      {err && <div className="error">{err}</div>}

      <div className="grid">
        <div className="card">
          <div className="label">Telefon</div>
          <div className="value">{r.phone || "Saknas"}</div>

          <div className="label">Akut kontakt</div>
          <div className="value">{r.emergencyContact || "Saknas"}</div>

          <div className="label">Status</div>
          <div className="value">{r.isActive ? "Aktiv" : "Inaktiv"}</div>

          <div className="hintSmall">Roll: {role}</div>
        </div>

        <div className="card">
          <div className="sectionTitle">Bemötandeplan</div>

          {!carePlan ? (
            <div className="muted">Ingen bemötandeplan hittades</div>
          ) : (
            <>
              {carePlan.content && (
                <>
                  <div className="label">Innehåll</div>
                  <div className="text">{carePlan.content}</div>
                </>
              )}

              {carePlan.summary && (
                <>
                  <div className="label">Sammanfattning</div>
                  <div className="text">{carePlan.summary}</div>
                </>
              )}

              {Array.isArray(carePlan.sections) &&
              carePlan.sections.length > 0 ? (
                <div className="sections">
                  {carePlan.sections
                    .slice()
                    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
                    .map((s, idx) => (
                      <div className="sectionBox" key={`${s.title}-${idx}`}>
                        <div className="sectionH">{s.title}</div>
                        <div className="text">{s.content}</div>
                      </div>
                    ))}
                </div>
              ) : null}
            </>
          )}
        </div>

        <div className="card full">
          <div className="sectionTitle">Dokumentation</div>

          <div className="docForm">
            <select
              className="select"
              value={docCategory}
              onChange={(e) => setDocCategory(e.target.value)}
            >
              <option value="hem">Hem</option>
              <option value="jobb">Jobb</option>
              <option value="hygien">Hygien</option>
              <option value="mat">Mat</option>
              <option value="traning">Träning</option>
            </select>

            <textarea
              className="textarea"
              value={docNote}
              onChange={(e) => setDocNote(e.target.value)}
              placeholder="Skriv anteckning"
              rows={3}
            />

            {docErr && <div className="error">{docErr}</div>}

            <button
              className="btnPrimary"
              type="button"
              onClick={onCreateDoc}
              disabled={docSaving || docNote.trim().length === 0}
            >
              {docSaving ? "Sparar" : "Spara"}
            </button>
          </div>

          {docs.length > 0 ? (
            <div className="docList">
              {docs.map((d) => (
                <div className="docRow" key={d.id}>
                  <div className="docTop">
                    <div className="badge">{d.category}</div>
                    <div className="docDate">{formatDate(d.createdAt)}</div>
                  </div>
                  <div className="text">{d.note}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="muted">Ingen dokumentation ännu</div>
          )}
        </div>
      </div>

      <style>{css}</style>
    </section>
  );
}

function formatDate(value) {
  if (!value) return "";
  const dt = new Date(value);
  if (Number.isNaN(dt.getTime())) return "";
  return dt.toLocaleString();
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

  .btnPrimary {
    border: 1px solid rgba(15, 23, 42, 0.12);
    background: rgba(15, 23, 42, 0.06);
    border-radius: 12px;
    padding-top: 10px;
    padding-right: 12px;
    padding-bottom: 10px;
    padding-left: 12px;
    cursor: pointer;
    font-weight: 900;
    width: 140px;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .full {
    grid-column: 1 / 3;
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

  .text {
    font-size: 13px;
    opacity: 0.9;
    line-height: 1.45;
    white-space: pre-wrap;
  }

  .hintSmall {
    margin-top: 10px;
    font-size: 12px;
    opacity: 0.65;
  }

  .sectionTitle {
    font-weight: 950;
    margin-bottom: 8px;
  }

  .sections {
    margin-top: 10px;
    display: grid;
    gap: 10px;
  }

  .sectionBox {
    border: 1px solid rgba(15, 23, 42, 0.12);
    background: #ffffff;
    border-radius: 12px;
    padding-top: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
  }

  .sectionH {
    font-weight: 950;
    margin-bottom: 6px;
  }

  .docForm {
    display: grid;
    gap: 10px;
    margin-bottom: 12px;
  }

  .select {
    border-radius: 12px;
    border: 1px solid rgba(15, 23, 42, 0.14);
    padding-top: 10px;
    padding-right: 12px;
    padding-bottom: 10px;
    padding-left: 12px;
    font-weight: 700;
    background: #ffffff;
    width: 220px;
  }

  .textarea {
    border-radius: 12px;
    border: 1px solid rgba(15, 23, 42, 0.14);
    padding-top: 10px;
    padding-right: 12px;
    padding-bottom: 10px;
    padding-left: 12px;
    background: #ffffff;
    font-weight: 650;
  }

  .docList {
    display: grid;
    gap: 10px;
  }

  .docRow {
    border-radius: 12px;
    border: 1px solid rgba(15, 23, 42, 0.12);
    background: #ffffff;
    padding-top: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
  }

  .docTop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 6px;
  }

  .badge {
    font-size: 12px;
    font-weight: 900;
    opacity: 0.85;
    padding-top: 4px;
    padding-right: 8px;
    padding-bottom: 4px;
    padding-left: 8px;
    border-radius: 999px;
    border: 1px solid rgba(15, 23, 42, 0.12);
    background: rgba(15, 23, 42, 0.04);
  }

  .docDate {
    font-size: 12px;
    opacity: 0.7;
    font-weight: 700;
  }

  .muted {
    font-size: 13px;
    opacity: 0.7;
    padding-top: 10px;
    padding-right: 0;
    padding-bottom: 0;
    padding-left: 0;
  }

  .error {
    color: #b91c1c;
    font-weight: 800;
    margin-top: 8px;
    margin-bottom: 8px;
  }
`;
