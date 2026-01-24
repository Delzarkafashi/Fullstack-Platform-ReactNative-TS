// fronten/App.tsx

import AppLayout from "./layout/AppLayout";
import HomeScreen from "./screens/HomeScreen";

export default function App() {
  return (
    <AppLayout>
      <HomeScreen />
    </AppLayout>
  );
}
