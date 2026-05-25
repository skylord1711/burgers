import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSettings } from "./hooks/useSettings";
import { useToast } from "./hooks/useToast";
import HomePage from "./pages/HomePage";
import ControlPanel from "./pages/ControlPanel";

const queryClient = new QueryClient();

function AppContent() {
  const { settings, updateSettings, updateSocialPlatform, trackClick, resetStats } = useSettings();
  const { toasts, removeToast } = useToast();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            settings={settings}
            trackClick={trackClick}
            toasts={toasts}
            removeToast={removeToast}
          />
        }
      />
      <Route
        path="/control"
        element={
          <ControlPanel
            settings={settings}
            updateSettings={updateSettings}
            updateSocialPlatform={updateSocialPlatform}
            resetStats={resetStats}
            onLogout={() => {
              // handled inside
            }}
          />
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
