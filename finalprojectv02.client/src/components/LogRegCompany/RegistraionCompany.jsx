import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegistraionCompany = ({ setToken }) => {
    const nav = useNavigate();
    const [registerCompany, setRegisterCompany] = useState({
        CompanyName: "",
        CompanyEmail: "",
        CompanyType: "",
        LogoImg: null,
        CompanyPassword: "",
        CompanyConfirmPassword: "",
    });
    console.log(registerCompany)
    const [validationErrors, setValidationErrors] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterCompany((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setRegisterCompany((prevState) => ({
            ...prevState,
            LogoImg: file
        }));
    };

    const formHandler = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("CompanyName", registerCompany.CompanyName);
        formData.append("CompanyEmail", registerCompany.CompanyEmail);
        formData.append("CompanyType", registerCompany.CompanyType);
        formData.append("LogoImg", registerCompany.LogoImg);
        formData.append("CompanyPassword", registerCompany.CompanyPassword);
        formData.append("CompanyConfirmPassword", registerCompany.CompanyConfirmPassword);
        try {
            const response = await axios.post("http://localhost:5292/api/company/register", formData);
            localStorage.setItem("companyId",response.data.company.companyId);
            localStorage.setItem("token",response.data.token);
            setToken("company");
            setRegisterCompany({
                CompanyName: "",
                CompanyEmail: "",
                CompanyType: "",
                LogoImg: null,
                CompanyPassword: "",
                CompanyConfirmPassword: "",
            });
            setValidationErrors(null);
            nav("/company/dashboard")
        } catch (error) {
            if (error.response.data.errors) {
                setValidationErrors(error.response.data.errors);
            }else{
                setValidationErrors(error.response.data)
            }
            
        }
    }
    return (
        <form onSubmit={formHandler} className="gap-10">
            {validationErrors && (validationErrors.CompanyName && validationErrors.CompanyName.map((val,key)=><li className="text-red-700" key={key}>{val}</li>))}
            <label className="input input-bordered flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                <input type="text" className="grow" placeholder="Company Name" value={registerCompany.CompanyName} name="CompanyName" onChange={handleChange} />
            </label>
            {validationErrors && validationErrors.CompanyEmail && validationErrors.CompanyEmail.map((val,key)=><li className="text-red-700" key={key}>{val}</li>)}
            <label className="input input-bordered flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                <input type="email" className="grow" placeholder="Email" value={registerCompany.CompanyEmail} name="CompanyEmail" onChange={handleChange} />
            </label>
            {validationErrors && (validationErrors.CompanyType && validationErrors.CompanyType.map((val,key)=><li className="text-red-700" key={key}>{val}</li>))}
            <label className="input input-bordered flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                <input type="text" className="grow" placeholder="Company Type" value={registerCompany.CompanyType} name="CompanyType" onChange={handleChange} />
            </label>
            {validationErrors && (validationErrors.LogoImg && validationErrors.CompanyName.map((val,key)=><li className="text-red-700" key={key}>{val}</li>))}
            <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Pick a photo</span>
                    </div>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="file-input file-input-bordered w-full max-w-xs"
                    />
                </label>
                {validationErrors && (validationErrors.CompanyPassword && validationErrors.CompanyPassword.map((val,key)=><li className="text-red-700" key={key}>{val}</li>))}
            <label className="input input-bordered flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                <input type="password" className="grow" value={registerCompany.CompanyPassword} placeholder="Password" onChange={handleChange} name="CompanyPassword" />
            </label>
            {validationErrors && (validationErrors.CompanyConfirmPassword && validationErrors.CompanyConfirmPassword.map((val,key)=><li className="text-red-700" key={key}>{val}</li>))}
            <label className="input input-bordered flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                <input type="password" className="grow" value={registerCompany.CompanyConfirmPassword} placeholder="Confirm Password" onChange={handleChange} name="CompanyConfirmPassword" />
            </label>
            <button type="submit" className="btn btn-primary content-center">
                    Register
                </button>
        </form>

    )
}

export default RegistraionCompany