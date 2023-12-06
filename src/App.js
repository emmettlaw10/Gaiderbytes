import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import StudentApplication from "./pages/StudentApplication";
import CoachApplication from "./pages/CoachApplication";
import StatusCheck from './pages/statusCheck/StatusCheck';
import ApplicationSuccess from "./pages/ApplicationSuccess";
import ApplicationFail from "./pages/ApplicationFail";
import ServerError from "./pages/ServerError";
import Home from './pages/Home';
import AboutUs from "./pages/AboutUs";
import CoachesPage from './pages/CoachesPage';
import { useState } from "react";
import Navbar from './components/navbar/Navbar';
import Eligible from "./pages/Eligible";
import Ineligible from "./pages/Ineligible";
import EligibilityCheck from "./pages/EligibilityCheck";
import StudentsPage from "./pages/StudentsPage";
import AdminLogin from "./pages/AdminLogin";
import AdminUnauthorized from "./pages/AdminUnauthorized";
import MatchingPage from "./pages/MatchingPage";
import AdminStudent from "./pages/AdminStudent";
import AdminNavbar from "./components/adminNavbar/adminNavbar";
import AdminCoach from './pages/AdminCoach';
import StudentMatchedAlready from "./pages/StudentMatchedAlready";
import MatchSuccess from "./pages/MatchSuccess";
import CoachMax from "./pages/CoachMax";
import StudentDetails from "./pages/StudentDetails";
import CoachDetails from "./pages/CoachDetails";
import { AuthProvider } from "./authentication/AuthContext";
import {ProtectedRoute} from './authentication/ProtectedRoute'; 




function App() {
  const [student, setStudent] = useState({
    first_name: "",
    last_name: "",
    email: "",
    province: "",
    city: "",
    address: "",
    postal_code: "",
    date_of_birth: "",
    pronoun: "",
    institution_name: "",
    program_name: "",
    emergency_contact_first_name: "",
    emergency_contact_last_name: "",
    emergency_contact_phone: "",
    emergency_contact_relation: "",
  });

  const [coach, setCoach] = useState({
    first_name: "",
    last_name: "",
    email: "",
    province: "",
    city: "",
    address: "",
    postal_code: "",
    date_of_birth: "",
    pronoun: "",
    years_of_experience:"",
    self_identification: "",
    gen_status: "",
    languages: "",
    institutions: "",
    availability: "",
    introduction: "",
    reside_in_canada: "",
    post_secondary_exp: "",
    post_secondary_program: ""

  });

  const [user, setUser] = useState({
    username: "",
    password: ""
  })

  const handleSave = async (values) => {
    try {
      const response = await fetch("http://localhost:5000/studentApplication", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.status === 201) {
        console.log("Application submitted successfully");
        setStudent(values);
        window.location.pathname = "/success";
      } else if (response.status === 400) {
        console.log("Student has already applied");
        window.location.pathname = "/fail";
      } else if (response.status === 500) {
        console.log("Server Error");
        window.location.pathname = "/serverError"
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSaveCoach = async (formData) => {
    try {
      const response = await fetch("http://localhost:5000/coachApplication", {
        method: "POST",
        body: formData,
      });
      if (response.status === 201) {
        console.log("Application submitted successfully");
        setCoach(formData);
        window.location.pathname = "/success";
      } else if (response.status === 400) {
        console.log("Coach has already applied");
        window.location.pathname = "/fail";
      } else if (response.status === 500) {
        console.log("Server Error");
        window.location.pathname = "/serverError";
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleLogin = async (formData) => {
    try {
      const response = await fetch("http://localhost:5000/adminLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),

      });
      if (response.status === 300) {
        setUser(formData);
        localStorage.setItem('authToken', response.token);
        window.location.pathname = "/adminDashboard/students";
      } else if (response.status === 301) {
        console.log(response.status);
        window.location.pathname = "/adminUnauthorized";
      } else if (response.status === 500) {
        console.log("Server Error");
        window.location.pathname = "/serverError";
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const match = async (data) => {
    try {
      console.log(data)
      const response = await fetch("http://localhost:5000/admin/match", {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: data,
      });
      if (response.status === 206) {
        console.log(response.status)
        window.location.reload()
      } else if (response.status === 406) {
        console.log(response.status);
        window.location.pathname = "/matchFailStudent";
      }else if (response.status === 416) {
        console.log(response.status);
        window.location.pathname = "/matchFailCoach";
      } else if (response.status === 500) {
        console.log("Server Error");
        window.location.pathname = "/serverError";
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateStudentStatus = async (data, id) => {
    let apiUrl = `http://localhost:5000/admin/student/${id}/status`
    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: data,
      });
      if (response.status === 200) {
        window.location.reload()
      } else if (response.status === 400) {
        console.log(response.status);
      } else if (response.status === 500) {
        console.log("Server Error");
        window.location.pathname = "/serverError";
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateCoachStatus = async (data, id) => {
    let apiUrl = `http://localhost:5000/admin/coach/${id}/status`
    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: data,
      });
      if (response.status === 200) {
        window.location.reload()
      } else if (response.status === 400) {
        console.log(response.status);
        window.location.pathname = "/matchFailStudent";
      } else if (response.status === 500) {
        console.log("Server Error");
        window.location.pathname = "/serverError";
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const removeCoach = async (id) => {
    let apiUrl = `http://localhost:5000/admin/application/${id}/unmatch`
    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
      });
      if (response.status === 200) {
        console.log(response.status)
        window.location.reload()
      } else if (response.status === 500) {
        console.log("Server Error");
        window.location.pathname = "/serverError";
        }
    } catch (error) {
      console.error(error.message);
    }
  }


  return (
    <AuthProvider>
      <BrowserRouter>
        <DynamicNavbar/>
        <div className="pt-[75px] px-[10%]">
          <Routes>
            {/* Protected admin dashboard routes */}
            <Route path="/adminDashboard/students" element={
              <ProtectedRoute component={AdminStudent} />
            }/>
            <Route path="/adminDashboard/coaches" element={
              <ProtectedRoute component={AdminCoach} />
            }/>
            <Route path="/adminDashboard/studentDetails" element={
              <ProtectedRoute component={() => <StudentDetails updateStudentStatus={updateStudentStatus} removeCoach={removeCoach}/>} />
            }/>
            <Route path="/adminDashboard/coachDetails" element={
              <ProtectedRoute component={() => <CoachDetails updateCoachStatus={updateCoachStatus} />} />
            }/>
  
            {/* Other public routes */}
            <Route path="/" element={<Home/>}/>
            <Route path="/student-application" element={<StudentApplication onSave={handleSave} student={student} />} />
            <Route path="/coach-application" element={<CoachApplication onSave={handleSaveCoach} coach={coach}/>} />
            <Route path="/success" element={<ApplicationSuccess/>} />
            <Route path="/fail" element={<ApplicationFail/>} />
            <Route path="/serverError" element={<ServerError/>} />
            <Route path="/checkStatus" element={<StatusCheck/>} />
            <Route path="/eligibilityCheck" element={<EligibilityCheck/>}/>
            <Route path="/eligible" element={<Eligible/>} />
            <Route path="/ineligible" element={<Ineligible/>} />
            <Route path="/students" element={<StudentsPage/>} />
            <Route path="/coaches" element={<CoachesPage/>} />
            <Route path="/about-us" element={<AboutUs/>}/>
            <Route path="/admin" element={<AdminLogin onSave={handleLogin}/>}/>
            <Route path="/adminUnauthorized" element={<AdminUnauthorized/>}/>
            <Route path="/adminDashboard/matching" element={<ProtectedRoute component={MatchingPage} createMatch={match}/>}/>
            <Route path="/matchFailStudent" element={<StudentMatchedAlready/>}/>
            <Route path="/matchFailCoach" element={<CoachMax/>}/>
            <Route path="/matchSuccess" element={<MatchSuccess/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );  
}

function DynamicNavbar() {
  const location = useLocation();
  return /^\/adminDashboard\b/.test(location.pathname) ? <AdminNavbar/> : <Navbar/>;
}

export default App;
