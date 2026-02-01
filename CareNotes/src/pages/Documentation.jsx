import { useEffect, useMemo, useState } from "react";
import { getResidents, getDocumentation, createDocumentation } from "../services/residentsApi";

export default function Documentation() {
  const [residents, setResidents] = useState([]);
  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const [residentId, setResidentId] = useState("");
  const [category, setCategory] = useState("hem");
  const [note, setNote] = useState("");

  const [saving, setSaving] = useState(false);
  const [saveErr, setSaveErr] = useState(null);

  const residentMap = useMemo(() => {
    const map = new Map();
    (Array.isArray(residents) ? residents : []).forEach((r) => {
      map.set(r.id, r.fullName);
    });
    return map;
  }, [residents]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setErr(null);

      try {
        const resList = await getResidents();
        const list = Array.isArray(resList) ? resList : [];
        setResidents(list);

        if (list.length > 0) {
          setResidentId(String(list[0].id));
        }

        const docsPerResident = await Promise.all(
          list.map(async (r) => {
            const docs = await getDocumentation(r.id);
            return (Array.isArray(docs) ? docs : []).map((d) => ({
              ...d,
              residentName: r.fullName,
            }));
          })
        );

        const flat = docsPerResident.flat();

        flat.sort((a, b) => {
          const ta = new Date(a.createdAt).getTime();
          const tb = new Date(b.createdAt).getTime();
          return tb - ta;
        });

        setItems(flat);
      } catch (e) {
        setResidents([]);
        setItems([]);
        setErr(e?.message || "Kunde inte hämta dokumentation");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  async function onCreate() {
    setSaving(true);
    setSaveErr(null);

    try {
      const rid = Number(residentId);
      const created = await createDocumentation(rid, {
        category,
        note,
      });

      const name = residentMap.get(rid) || `Brukare ID ${rid}`;

      const newItem = {
        ...created,
        residentName: name,
      };

      setNote("");

      setItems((prev) => {
        const next = [newItem, ...(Array.isArray(prev) ? prev : [])];
        next.sort((a, b) => {
          const ta = new Date(a.createdAt).getTime();
          const tb = new Date(b.createdAt).getTime();
          return tb - ta;
        });
        return next;
      });
    } catch (e) {
      setSaveErr(e?.message || "Kunde inte spara dokumentation");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="panel">
      <style>{css}</style>

      <h1 className="h1">Dokumentation</h1>

      <div className="createBox">
        <div className="createTitle">Ny dokumentation</div>

        <div className="createGrid">
          <div className="field">
            <div className="label">Klient</div>
            <select
              className="select"
              value={residentId}
              onChange={(e) => setResidentId(e.target.value)}
              disabled={loading || residents.length === 0}
            >
              {residents.map((r) => (
                <option key={r.id} value={String(r.id)}>
                  {r.fullName}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <div className="label">Kategori</div>
            <select
              className="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={loading}
            >
              <option value="hem">Hem</option>
              <option value="jobb">Jobb</option>
              <option value="hygien">Hygien</option>
              <option value="mat">Mat</option>
              <option value="traning">Träning</option>
            </select>
          </div>
        </div>

        <div className="field">
          <div className="label">Anteckning</div>
          <textarea
            className="textarea"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Skriv anteckning"
            rows={3}
            disabled={loading}
          />
        </div>

        {saveErr ? <div className="error">{saveErr}</div> : null}

        <button
          className="btnPrimary"
          type="button"
          onClick={onCreate}
          disabled={saving || loading || note.trim().length === 0 || !residentId}
        >
          {saving ? "Sparar" : "Spara"}
        </button>
      </div>

      {loading ? <div className="muted">Laddar</div> : null}
      {err ? <div className="error">{err}</div> : null}

      {!loading && !err && items.length === 0 ? (
        <div className="muted">Ingen dokumentation</div>
      ) : null}

      <div className="list">
        {items.map((d) => (
          <div className="row" key={`${d.id}-${d.createdAt}-${d.residentId}`}>
            <div className="top">
              <div className="badge">{d.category}</div>
              <div className="date">{formatDate(d.createdAt)}</div>
            </div>

            <div className="meta">
              {d.residentName ? d.residentName : `Brukare ID ${d.residentId}`}
            </div>

            <div className="text">{d.note}</div>
          </div>
        ))}
      </div>
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

  .h1 {
    margin-top: 0;
    margin-right: 0;
    margin-bottom: 16px;
    margin-left: 0;
    font-size: 18px;
    font-weight: 950;
  }

  .createBox {
    border-radius: 16px;
    border: 1px solid rgba(15, 23, 42, 0.12);
    background: rgba(15, 23, 42, 0.02);
    padding-top: 12px;
    padding-right: 12px;
    padding-bottom: 12px;
    padding-left: 12px;
    margin-bottom: 14px;
  }

  .createTitle {
    font-weight: 950;
    margin-bottom: 10px;
  }

  .createGrid {
    display: grid;
    grid-template-columns: 1fr 220px;
    gap: 10px;
    margin-bottom: 10px;
  }

  .field {
    display: grid;
    gap: 6px;
  }

  .label {
    font-size: 12px;
    font-weight: 900;
    opacity: 0.75;
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
    width: 100%;
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

  .list {
    display: grid;
    gap: 10px;
  }

  .row {
    border-radius: 12px;
    border: 1px solid rgba(15, 23, 42, 0.12);
    background: #ffffff;
    padding-top: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
  }

  .top {
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
    text-transform: lowercase;
  }

  .date {
    font-size: 12px;
    opacity: 0.7;
    font-weight: 700;
  }

  .meta {
    font-size: 12px;
    opacity: 0.75;
    font-weight: 900;
    margin-bottom: 6px;
  }

  .text {
    font-size: 13px;
    opacity: 0.9;
    line-height: 1.45;
    white-space: pre-wrap;
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
