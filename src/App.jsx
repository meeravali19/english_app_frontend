import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingpage";
import Home from "./pages/Home";
import Vocabulary from "./pages/Vocabulary";
import Layout from "./pages/Layout";
import Idioms from "./pages/Idioms";
import OneWordSubstitution from "./pages/OneWordSubstitution";
import PhrasalVerbs from "./pages/PhrasalVerbs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";

function App() {
  return (
    // 👇 This wrapper enables smooth scrolling for all anchor links
    <div className="scroll-smooth">
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

        {/* All study modules inside Layout */}
        <Route element={<Layout />}>
          <Route path="/vocabulary" element={<Vocabulary />} />
          <Route path="/idioms" element={<Idioms />} />
          <Route path="/onewordsubstitution" element={<OneWordSubstitution />} />
          <Route path="/phrasalverbs" element={<PhrasalVerbs />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
