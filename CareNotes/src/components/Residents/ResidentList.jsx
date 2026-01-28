import { useMemo, useState } from "react";
import ResidentCard from "./ResidentCard";

export default function ResidentList({
  residents = [],
  loading = false,
  error = null,
  onSelect,
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return residents;

    return residents.filter((r) => {
      const name = (r.fullName ?? "").toLowerCase();
      const unit = (r.unit ?? "").toLowerCase();
      const room = (r.room ?? "").toLowerCase();
      return name.includes(q) || unit.includes(q) || room.includes(q);
    });
  }, [query, residents]);

  return (
    <section className="panel">
      <div className="header">
        <h1 className="h1">Brukare</h1>

        <input
          className="input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Sök brukare, boende, rum"
        />
      </div>

      {loading ? <div className="muted">Laddar</div> : null}
      {error ? <div className="error">{String(error)}</div> : null}

      {!loading && !error && filtered.length === 0 ? (
        <div className="muted">Inga brukare ännu</div>
      ) : null}

      {!loading && !error && filtered.length > 0 ? (
        <div className="list">
          {filtered.map((r) => (
            <ResidentCard key={r.id} resident={r} onSelect={onSelect} />
          ))}
        </div>
      ) : null}

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

  .header {
    display: grid;
    gap: 10px;
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

  .input {
    width: 100%;
    border-radius: 12px;
    border: 1px solid rgba(15, 23, 42, 0.14);
    padding-top: 10px;
    padding-right: 12px;
    padding-bottom: 10px;
    padding-left: 12px;
    font-weight: 650;
    background: #ffffff;
  }

  .error {
    color: #b91c1c;
    font-weight: 800;
    margin-top: 8px;
    margin-right: 0;
    margin-bottom: 8px;
    margin-left: 0;
  }

  .muted {
    font-size: 13px;
    opacity: 0.7;
    padding-top: 10px;
    padding-right: 0;
    padding-bottom: 0;
    padding-left: 0;
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 10px;
  }
`;
