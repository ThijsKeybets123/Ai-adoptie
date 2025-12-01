import { Routes, Route } from "react-router-dom";
import Index from "./Index";
import Auth from "./Auth";
import Assessment from "./Assessment";
import Dashboard from "./Dashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/assessment" element={<Assessment />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
