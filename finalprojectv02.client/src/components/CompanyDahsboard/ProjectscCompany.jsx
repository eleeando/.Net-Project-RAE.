import axios from "axios";
import { useEffect, useState } from "react";

const ProjectscCompany = () => {
    const [company, setCompany] = useState(null);
    const [employees, setEmployess] = useState(null);
    const [roles, setRoles] = useState(null); // State to store roles
console.log(company);
    useEffect(() => {
        async function fetchData() {
            try {
                const companyRes = await axios.get("http://localhost:5292/api/project/company/" + localStorage.getItem("companyId"));
                const employeesRes = await axios.get("http://localhost:5292/api/company/employees/" + localStorage.getItem("companyId"));
                const rolesRes = await axios.get("http://localhost:5292/api/company/employees/");
                setCompany(companyRes.data.$values);
                setEmployess(employeesRes.data.$values);
                setRoles(rolesRes.data.$values);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);
    const addRoleNameToEmployees = (users, roles) => {
        if (!users || !roles) return users;

        const rolesMap = new Map(roles.map(role => [role.roleId, role.roleName]));

        return users.map(user => ({
            ...user,
            roleName: rolesMap.get(user.roleId)
        }));
    };

    const employeesWithRoleNames = addRoleNameToEmployees(employees, roles);

    return (
        
        <div className="flex gap-36">
            <div >
                <h1 className="text-center text-lg font-black">Employees</h1>
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Job</th>

                        </tr>
                    </thead>
                    <tbody>
                        {employeesWithRoleNames && employeesWithRoleNames.map(e => (
                            <tr key={e.userId}>
                                <td>{e.firstName}</td>
                                <td>{e.roleName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="overflow-x-auto">
                <h1 className="text-center text-lg font-black">Projects</h1>
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Progress</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {company && company.map(e => (
                            <tr key={e.userId}>
                                <td>{e.projectDescription}</td>
                                <td><div className="radial-progress" style={{"--value":20}} role="progressbar">20%</div></td>
                                <td><button className="btn btn-error">Delete Project</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProjectscCompany;
