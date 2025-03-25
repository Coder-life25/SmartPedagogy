import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Routes, Outlet } from "react-router";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AssignmentSection from "./pages/AssignmentSection";
import ClassroomOverview from "./pages/ClassroomOverview";
import FeedbackInsights from "./pages/FeedbackInsights";
import PlagarismIntegriryReport from "./pages/PlagarismIntegriryReport";
import Body from "./components/Body";
function App() {
  const AppLayout = () => {
    return (
      <div>
        <NavBar />
        <Outlet />
      </div>
    );
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<Body />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/assignmentSection" element={<AssignmentSection />} />
            <Route path="/classroomOverview" element={<ClassroomOverview />} />
            <Route path="/feedbackInsights" element={<FeedbackInsights />} />
            <Route
              path="/plagarismIntegrityReports"
              element={<PlagarismIntegriryReport />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
