import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateProject() {
    const nav = useNavigate();
    useEffect(() => {
        async function getEmployees() {
            try {
                const employeesRes = await axios.get("http://localhost:5292/api/company/employees/" + localStorage.getItem("companyId"));
                setEmployess(employeesRes.data.$values)
            } catch (error) {

            }
        }
        getEmployees();
    }, [])
    const [employees, setEmployess] = useState(null)
    const formArray = [1, 2, 3];
    const [formNo, setFormNo] = useState(formArray[0])
    const [state, setState] = useState({
        OwnerId: "",
        CompanyId: localStorage.getItem("companyId"),
        ProjectDescription: "",
        ProjectDuration: "",


    })
    const next = () => {
        setFormNo(formNo + 1)
    }
    const pre = () => {
        setFormNo(formNo - 1)
    }
    const submit = async ()=>{
        try {
            const send = await axios.post("http://localhost:5292/api/project",state);
            console.log(send);
            nav("/company/dashboard")
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="w-screen h-screen bg-base-100 flex justify-center items-center">
            <ToastContainer />
            <div className="card w-[370px] rounded-md shadow-md bg-white p-5">
                <div className='flex justify-center items-center'>
                    {
                        formArray.map((v, i) => <><div className={`w-[35px] my-3 text-base-100 rounded-full ${formNo - 1 === i || formNo - 1 === i + 1 || formNo === formArray.length ? 'bg-primary' : 'bg-neutral'} h-[35px] flex justify-center items-center`}>
                            {v}
                        </div>
                            {
                                i !== formArray.length - 1 && <div className={`w-[85px] h-[2px] ${formNo === i + 2 || formNo === formArray.length ? 'bg-blue-500' : 'bg-slate-400'}`}></div>
                            }
                        </>)
                    }
                </div>
                {
                    formNo === 1 &&
                    <div>
                        <select className="select select-bordered w-full max-w-xs" onChange={e=>setState({...state,OwnerId:e.target.value})}>
                            <option disabled selected>Scrum master for the project</option>
                            {employees && employees.map(emp => {
                                return (<option key={emp.userId} value={emp.userId}>{emp.firstName} {emp.lastName}</option>)
                            })}
                        </select>
                        <div className='mt-4 gap-3 flex justify-center items-center'>
                            <button onClick={pre} className='px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500'>Previous</button>
                            <button onClick={next} className='px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500'>Next</button>
                        </div>
                    </div>
                }

                {
                    formNo === 2 && 
                    <div className='flex flex-col'>
                    <textarea className="textarea textarea-bordered" placeholder="Project Description" onChange={e=>setState({...state,ProjectDescription:e.target.value})}></textarea>
                    <div className='mt-4 gap-3 flex justify-center items-center'>
                            <button onClick={pre} className='px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500'>Previous</button>
                            <button onClick={next} className='px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500'>Next</button>
                        </div>
                        </div>
                }

                {
                    formNo === 3 && 
                    <div className='flex flex-col'>
                        <label className='text-xl'>Project Duration</label>
                        <input type="date" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={e=>setState({...state,ProjectDuration:e.target.value})} />
                        <div className='mt-4 gap-3 flex justify-center items-center'>
                            <button onClick={pre} className='px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500'>Previous</button>
                            <button onClick={submit} className='px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500'>Make project</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default CreateProject;