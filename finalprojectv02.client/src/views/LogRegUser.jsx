import LoginUser from "../components/LogRegUser/LoginUser"
import RegisterUser from "../components/LogRegUser/RegisterUser"


const LogRegUser = ({setToken}) => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='flex rounded-lg p-6 shadow-md'>
            <RegisterUser setToken={setToken} />
            <div className="mx-28"></div>
            <LoginUser setToken={setToken}/>
            </div>
        </div>
    )
}

export default LogRegUser