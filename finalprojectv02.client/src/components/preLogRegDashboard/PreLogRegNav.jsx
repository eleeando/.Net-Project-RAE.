import { Link } from "react-router-dom";
import { useState } from "react";
import im from "../../assets/rae3.png"
const PreLogRegNav = ({ setColor }) => {
    const changeTheme = (color) => {
        setColor(color);
    };

    return (
        <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white">
            
            <div className="avatar right-24">
                <div className=" rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 h-12">
                    <img src={im} />
                </div>
            </div>

            <ul className="hidden md:flex items-center text-base-content">
                <li className="p-4"><Link to={"/"}>Home</Link></li>
                <li className="p-4"><Link to={"/register/login/user"}>Employee</Link></li>
                <li className="p-4"><Link to={"/register/login/company"}>Company</Link></li>
                <li className="p-4">About</li>
                <li className="p-4">Contact</li>
                <li>
                    <select className="select select-bordered w-15 max-w-xl" onChange={(event) => changeTheme(event.target.value)}>
                        <option disabled selected>Choose theme</option>
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
            </ul>
        </div>
    );
};

export default PreLogRegNav;