import axios from "axios";
import { useState,useEffect } from "react";
import Projects from "./Projects";
import { Skeleton } from "@mui/material";
import { AiOutlineMenu } from "react-icons/ai";
import { MdOutlineWork } from "react-icons/md";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GrTasks } from "react-icons/gr";
import { MdMessage } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUser } from "react-icons/fa";


const ShowAllProjects = ({setColor}) => {
    const nav=useNavigate()
    const {id} =useParams();
        const changeTheme = (color) => {
            setColor(color);
        };
        const [user, setUser] = useState(null);
        useEffect(() => {
            async function getUser() {
                try {
                    const response = await axios.get("http://localhost:5292/api/user/" + localStorage.getItem("userId"));
                    setUser(response.data)
                } catch (error) {
                    console.log(error);
                }
    
            }
            getUser();
        }, [])
        const logout = ()=>{
            localStorage.clear();
            nav("/")
        }
        return (
            <>
                {!user ? (<Skeleton />) : (<div className="drawer lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col items-center justify-center">
                        {/*Page content here*/}
                        <Projects id={id}/>
                        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
    
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                            {/* Sidebar content here */}
                            <li className="text-primary text-2xl">
                                <div className="avatar">
                                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={`../../../../FinalProjectV02.Server/Uploads/StaticContent/${user.userPhoto}`} alt={user.firstName}  />
    
                                    </div>
                                </div>
                                Welcome {user.firstName }
                            </li>
                            <li className="text-primary"><h1 className="text-2xl"><AiOutlineMenu /> Menu</h1></li>
                            <li>
                                <select className="select select-bordered w-full max-w-xs" onChange={(e) => changeTheme(e.target.value)}>
                                    <option disabled defaultValue>Choose theme</option>
                                    <option value="dark">dark</option>
                                    <option value="light">light</option>
                                    <option value="cupcake">cupcake</option>
                                    <option value="bumblebee">bumblebee</option>
                                    <option value="emerald">emerald</option>
                                    <option value="corporate">corporate</option>
                                    <option value="synthwave">synthwave</option>
                                    <option value="retro">retro</option>
                                    <option value="cyberpunk">cyberpunk</option>
                                    <option value="valentine">valentine</option>
                                    <option value="haloween">haloween</option>
                                    <option value="garden">garden</option>
                                    <option value="forest">forest</option>
                                    <option value="aqua">aqua</option>
                                    <option value="lofi">lofi</option>
                                    <option value="pastel">pastel</option>
                                    <option value="fantasy">fantasy</option>
                                    <option value="wireframe">wireframe</option>
                                    <option value="black">black</option>
                                    <option value="luxury">luxury</option>
                                    <option value="dracula">dracula</option>
                                    <option value="cmyk">cmyk</option>
                                    <option value="autumn">autumn</option>
                                    <option value="buisness">buisness</option>
                                    <option value="acid">acid</option>
                                    <option value="lemonade">lemonade</option>
                                    <option value="night">night</option>
                                    <option value="coffee">coffee</option>
                                    <option value="winter">winter</option>
                                    <option value="dim">dim</option>
                                    <option value="nord">nord</option>
                                    <option value="sunset">sunset</option>
                                </select> 
                            </li>
                            <li className="text-primary text-xl"><Link to={"/user/dashboard"}><FaUser />HomePage</Link></li>
                            <li className="text-primary text-xl"><Link to={`/projects/user/${localStorage.getItem("userId")}`}><MdOutlineWork />My projects</Link></li>
                            <li className="text-primary text-xl"><Link to={`/tasks/user/${localStorage.getItem("userId")}`}><GrTasks />My Tasks</Link></li>
                            <li className="text-primary text-xl"><Link to={`/messages/user/${localStorage.getItem("userId")}`}><MdMessage />Chat room</Link></li>
                            <li className="text-error text-xl"><button onClick={()=>logout()} ><HiOutlineLogout />Logout</button></li>
    
                        </ul>
    
                    </div>
                </div>)}
            </>
        )
}

export default ShowAllProjects