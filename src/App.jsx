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
import DashboardOverview from "./pages/students/DashboardOverview";
import TotalAssignments from "./pages/students/TotalAssignments";
import FeedbackAndScore from "./pages/students/FeedbackAndScore";
import PlagiarismCheckResults from "./pages/students/PlagiarismCheckResults";
import AssignmentSubmission from "./pages/students/AssignmentSubmission";
import { addUser } from "../src/utils/appSlice";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../src/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import Profile from "./components/Profile";
function App() {
  const AppLayout = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userProfile = async () => {
      try {
        let res = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });
        dispatch(addUser(res.data));
        navigate("/");
        // console.log(res.data);
      } catch (err) {
        navigate("/login");
        console.log(err.message);
      }
    };

    useEffect(() => {
      !user && userProfile();
    }, []);

    console.log("appLayout called");
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
              <Route path="/profile" element={<Profile />} />
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
                path="/plagiarismIntegrityReport"
                element={<PlagarismIntegriryReport />}
              />

              {/** students Route */}

              <Route
                path="/dashboardOverview"
                element={<DashboardOverview />}
              />
              <Route path="/totalAssignments" element={<TotalAssignments />} />
              <Route path="/feedbackAndScore" element={<FeedbackAndScore />} />
              <Route
                path="/plagiarismCheckResults"
                element={<PlagiarismCheckResults />}
              />
              <Route
                path="/assignment/:id"
                element={<AssignmentSubmission />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
