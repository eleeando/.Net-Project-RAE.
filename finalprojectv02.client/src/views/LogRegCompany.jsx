import React from 'react';
import RegistraionCompany from '../components/LogRegCompany/RegistraionCompany';
import LoginCompany from '../components/LogRegCompany/LoginCompany';

const LogRegCompany = ({ setToken }) => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex rounded-lg p-6 shadow-md'>
        <RegistraionCompany setToken={setToken}/>
        <div className="mx-28"></div> 
        <LoginCompany setToken={setToken} />
      </div>
    </div>
  );
};

export default LogRegCompany;
