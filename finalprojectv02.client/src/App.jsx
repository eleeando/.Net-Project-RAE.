import PreLogRegNav from "./components/preLogRegDashboard/PreLogRegNav";
import { Route, Routes } from "react-router-dom";
import LogRegCompany from "./views/LogRegCompany";
import { useState } from "react";
import LogRegUser from "./views/LogRegUser";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import Tache from "./views/Tache";
import PreLogRegDashboard from "./views/PreLogRegDashboard";
import NotFoundPage from "./views/NotFoundPage";
import ShowAllProjects from "./components/Projects/ShowAllProjects";
import ComapnyDahsboard from "./components/CompanyDahsboard/ComapnyDahsboard";
import CreateProjectWithNavbar from "./components/Projects/CreateProjectWithnavbar";
import CreateTask from "./components/Tasks/CreateTask";

export default function App() {
    const [color, setColor] = useState("lemonade");
    const [token, setToken] = useState(false);
    const tokens = localStorage.getItem("token")
    
    return (
        <div data-theme={color}>
            {!tokens && <PreLogRegNav setColor={setColor} />}
            <Routes>
                
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/" element={<PreLogRegDashboard />} />
                <Route path="/register/login/company" element={<LogRegCompany setToken={setToken} />} />
                <Route path="/register/login/user" element={<LogRegUser setToken={setToken} />} />
                <Route path="/tasks/project/:projectId" element={<Tache />} />
                <Route path="/user/dashboard" element={<UserDashboard setColor={setColor} />} />
                <Route path="/projects/user/:id" element={<ShowAllProjects setColor={setColor}/>}/>
                <Route path="/company/dashboard" element={<ComapnyDahsboard setColor={setColor}/>}/>
                <Route path="/projects/company/:id" element={<CreateProjectWithNavbar setColor={setColor}/>}/>
                <Route path="/tasks/user/:id" element={<Tache setColor={setColor}/>}/>
            </Routes>
           
        </div>
    );
}
