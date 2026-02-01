import { useEffect, useMemo, useState } from "react";
import { getResidents, getDocumentation } from "../services/residentsApi";

export default function Dashboard({ onNavigate }) {
  const [residents, setResidents] = useState([]);
  const [docs, setDocs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let alive = true;

    async function load() {
      setLoading(true);
      setErr(null);

      try {
        const resList = await getResidents();
        const list = Array.isArray(resList) ? resList : [];
        if (!alive) return;
        setResidents(list);

        const docsPerResident = await Promise.all(
          list.map(async (r) => {
            const d = await getDocumentation(r.id);
            const arr = Array.isArray(d) ? d : [];
            return arr.map((x) => ({
              ...x,
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

        if (!alive) return;
        setDocs(flat);
      } catch (e) {
        if (!alive) return;
        setResidents([]);
        setDocs([]);
        setErr(e?.message || "Kunde inte hämta data");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    load();

    return () => {
      alive = false;
    };
  }, []);

  const stats = useMemo(() => {
    const totalResidents = residents.length;
    const activeResidents = residents.filter((r) => r.isActive).length;

    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth();
    const d = today.getDate();

    const notesToday = docs.filter((x) => {
      const dt = new Date(x.createdAt);
      return dt.getFullYear() === y && dt.getMonth() === m && dt.getDate() === d;
    }).length;

    return { totalResidents, activeResidents, notesToday };
  }, [residents, docs]);

  const recentDocs = useMemo(() => docs.slice(0, 5), [docs]);

  return (
    <section className="panel">
      <style>{css}</style>

      <h1 className="h1">Översikt</h1>

      {loading ? <div className="muted">Laddar</div> : null}
      {err ? <div className="error">{err}</div> : null}

      <div className="stats">
        <div className="statCard">
          <span className="statLabel">Brukare</span>
          <span className="statValue">{stats.totalResidents}</span>
        </div>

        <div className="statCard">
          <span className="statLabel">Aktiva brukare</span>
          <span className="statValue">{stats.activeResidents}</span>
        </div>

        <div className="statCard">
          <span className="statLabel">Anteckningar idag</span>
          <span className="statValue">{stats.notesToday}</span>
        </div>
      </div>

      <div className="grid">
        <div className="box">
          <h2>Senaste händelser</h2>

          {recentDocs.length === 0 ? (
            <div className="muted">Ingen dokumentation ännu</div>
          ) : (
            <ul className="list">
              {recentDocs.map((x) => (
                <li key={`${x.id}-${x.createdAt}-${x.residentId}`}>
                  {x.residentName} skrev {x.category} {formatDate(x.createdAt)}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="box">
          <h2>Att göra</h2>
          <ul className="list">
            <li>Följ upp möte med brukare</li>
            <li>Uppdatera genomförandeplan</li>
            <li>Skapa ny dokumentation vid behov</li>
          </ul>
        </div>

        <div className="box">
          <h2>Snabblänkar</h2>
          <div className="actions">
            <button type="button" onClick={() => onNavigate?.("documentation")}>
              Ny dokumentation
            </button>

            <button type="button" onClick={() => onNavigate?.("residents")}>
              Visa brukare
            </button>

            <button type="button" onClick={() => onNavigate?.("settings")}>
              Inställningar
            </button>
          </div>
        </div>

        <div className="box">
          <h2>Systemstatus</h2>
          <ul className="list muted">
            <li>API status: OK</li>
            <li>Version: 0.1.0</li>
          </ul>
        </div>
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

.error {
  color: #b91c1c;
  font-weight: 800;
  margin-top: 8px;
  margin-right: 0;
  margin-bottom: 8px;
  margin-left: 0;
}
`;
