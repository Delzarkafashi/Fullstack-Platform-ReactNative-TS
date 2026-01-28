import ResidentList from "../components/Residents/ResidentList";

export default function ResidentsPage({
  residents = [],
  loading = false,
  error = null,
  onSelect,
}) {
  return (
    <ResidentList
      residents={residents}
      loading={loading}
      error={error}
      onSelect={onSelect}
    />
  );
}
