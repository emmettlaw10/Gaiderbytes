import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import AdminSuccess from "./pages/AdminSuccessTemp";



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
      const response = await fetch("/studentApplication", {
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
      const response = await fetch("/coachApplication", {
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
    console.log("herelol")
    console.log(formData)
    try {
      const response = await fetch("/adminLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),

      });
      if (response.status === 300) {
        console.log("Application submitted successfully");
        setUser(formData);
        window.location.pathname = "/adminAuthorized";
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

  return (
    <BrowserRouter>
      <Navbar/>
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
            <Route exact path="/adminAuthorized" element={<AdminSuccess/>}/>
            <Route exact path="/adminUnauthorized" element={<AdminUnauthorized/>}/>
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
