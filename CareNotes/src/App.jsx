// src/App.jsx
import { useEffect, useMemo, useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Residents from "./pages/Residents";
import ResidentDetails from "./pages/ResidentDetails";
import Notes from "./pages/Notes";
import Staff from "./pages/Staff";
import Settings from "./pages/Settings";
import Layout from "./components/Layout";
import { getResidents } from "./services/residentsApi";

export default function App() {
  const [role, setRole] = useState(null);
  const [route, setRoute] = useState("dashboard");
  const [selectedResidentId, setSelectedResidentId] = useState(null);

  const [residents, setResidents] = useState([]);
  const [residentsError, setResidentsError] = useState(null);
  const [residentsLoading, setResidentsLoading] = useState(false);

  useEffect(() => {
    if (!role) return;

    let alive = true;

    async function load() {
      setResidentsLoading(true);
      setResidentsError(null);

      try {
        const data = await getResidents();
        if (!alive) return;
        setResidents(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!alive) return;
        setResidents([]);
        setResidentsError(err?.message || "Kunde inte hämta brukare");
      } finally {
        if (!alive) return;
        setResidentsLoading(false);
      }
    }

    load();

    return () => {
      alive = false;
    };
  }, [role]);

  const selectedResident = useMemo(() => {
    if (!selectedResidentId) return null;
    return residents.find((r) => r.id === selectedResidentId) || null;
  }, [selectedResidentId, residents]);

  function logout() {
    setRole(null);
    setRoute("dashboard");
    setSelectedResidentId(null);
    setResidents([]);
    setResidentsError(null);
  }

  function navigate(nextRoute) {
    setRoute(nextRoute);
    setSelectedResidentId(null);
  }

  if (!role) {
    return <Login onSelectRole={(r) => setRole(r)} />;
  }

  return (
    <Layout role={role} route={route} onNavigate={navigate} onLogout={logout}>
      {route === "dashboard" ? <Dashboard /> : null}

      {route === "residents" ? (
        selectedResident ? (
          <ResidentDetails
            resident={selectedResident}
            role={role}
            onBack={() => setSelectedResidentId(null)}
          />
        ) : (
          <Residents
            residents={residents}
            loading={residentsLoading}
            error={residentsError}
            onSelect={(id) => setSelectedResidentId(id)}
          />
        )
      ) : null}

      {route === "notes" ? <Notes role={role} /> : null}
      {route === "staff" ? <Staff role={role} /> : null}
      {route === "settings" ? <Settings /> : null}
    </Layout>
  );
}
