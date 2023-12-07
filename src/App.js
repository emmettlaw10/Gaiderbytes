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
import ProtectedRoute from './components/ProtectedRoute';
import AdminSignUp from "./pages/AdminSignUp";
import ChangeAdminPassword from "./pages/ChangeAdminPassword";





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
    let apiUrl = `${process.env.REACT_APP_DOMAIN}studentApplication`
    try {
      const response = await fetch(apiUrl, {
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
    let apiUrl = `${process.env.REACT_APP_DOMAIN}coachApplication`
    try {
      const response = await fetch(apiUrl, {
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
    let apiUrl = `${process.env.REACT_APP_DOMAIN}adminLogin`
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.status === 300) {
        localStorage.setItem('token', data.token);
  
        setUser(formData);
        localStorage.setItem('authToken', response.token);
        window.location.pathname = "/adminDashboard/students";
      } else if (response.status === 301) {
        console.log("Unauthorized");
        window.location.pathname = "/adminUnauthorized";
      } else if (response.status === 500) {
        console.log("Server Error");
        window.location.pathname = "/serverError";
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleLogout = async () => {
    let apiUrl = `${process.env.REACT_APP_DOMAIN}admin/log_out`
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          }
        });
  
        localStorage.removeItem('token');
        window.location.pathname = "/";
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
  };
  
  const match = async (data) => {
    let apiUrl = `${process.env.REACT_APP_DOMAIN}admin/match`
    try {
      console.log(data)
      const response = await fetch(apiUrl, {
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
    let apiUrl = `${process.env.REACT_APP_DOMAIN}admin/student/${id}/status`
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
    let apiUrl = `${process.env.REACT_APP_DOMAIN}admin/coach/${id}/status`
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
    let apiUrl = `${process.env.REACT_APP_DOMAIN}admin/application/${id}/unmatch`
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
    <BrowserRouter>
      <DynamicNavbar onLogout={handleLogout}/>
        <div className="pt-[75px] px-[10%]">
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/student-application" element={<StudentApplication onSave={handleSave} student={student} />} />
            <Route exact path="/coach-application" element={<CoachApplication onSave={handleSaveCoach} coach={coach}/>} />
            <Route exact path="/success" element={<ApplicationSuccess/>} />
            <Route exact path="/fail" element={<ApplicationFail/>} />
            <Route exact path="/serverError" element={<ServerError/>} />
            <Route exact path="/checkStatus" element={<StatusCheck/>} />
            <Route exact path="/eligibilityCheck" element={<EligibilityCheck/>}/>
            <Route exact path="/eligible" element={<Eligible/>} />
            <Route exact path="/ineligible" element={<Ineligible/>} />
            <Route exact path="/students" element={<StudentsPage/>} />
            <Route exact path="/coaches" element={<CoachesPage/>} />
            <Route exact path="/about-us" element={<AboutUs/>}/>
            <Route exact path="/admin" element={<AdminLogin onSave={handleLogin}/>}/>
            <Route exact path="/adminDashboard/students" element={<ProtectedRoute><AdminStudent/></ProtectedRoute>}/>
            <Route exact path="/adminDashboard/coaches" element={<ProtectedRoute> <AdminCoach /> </ProtectedRoute>}/>
            <Route exact path="/adminUnauthorized" element={<AdminUnauthorized/>}/>
            <Route exact path="/adminDashboard/matching" element={<ProtectedRoute><MatchingPage createMatch={match}/></ProtectedRoute>}/>
            <Route exact path="/matchFailStudent" element={<StudentMatchedAlready/>}/>
            <Route exact path="/matchFailCoach" element={<CoachMax/>}/>
            <Route exact path="/matchSuccess" element={<MatchSuccess/>}/>
            <Route exact path="/admin/signup" element={<AdminSignUp />} />
            <Route exact path="/adminDashboard/change_password" element={<ProtectedRoute><ChangeAdminPassword /></ProtectedRoute>} />
            <Route exact path="/adminDashboard/studentDetails" element={<ProtectedRoute><StudentDetails updateStudentStatus={updateStudentStatus} removeCoach={removeCoach}/></ProtectedRoute>}/>
            <Route exact path="/adminDashboard/coachDetails" element={<ProtectedRoute><CoachDetails updateCoachStatus={updateCoachStatus} /></ProtectedRoute>}/>
          </Routes>
        </div>
    </BrowserRouter>
  );

  function DynamicNavbar() {
    const location = useLocation();
    return /^\/adminDashboard\b/.test(location.pathname) 
      ? <AdminNavbar onLogout={handleLogout} /> 
      : <Navbar onLogout={handleLogout} />;
  }
}

export default App;
