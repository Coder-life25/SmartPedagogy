import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Routes, Outlet } from "react-router";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AssignmentSection from "./pages/teachers/AssignmentSection";
import ClassroomOverview from "./pages/teachers/ClassroomOverview";
import FeedbackInsights from "./pages/teachers/FeedbackInsights";
import PlagarismIntegriryReport from "./pages/teachers/PlagarismIntegriryReport";
import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
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
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route path="/" element={<Body />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/assignmentSection"
                element={<AssignmentSection />}
              />
              <Route
                path="/classroomOverview"
                element={<ClassroomOverview />}
              />
              <Route path="/feedbackInsights" element={<FeedbackInsights />} />
              <Route
                path="/plagarismIntegrityReports"
                element={<PlagarismIntegriryReport />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
