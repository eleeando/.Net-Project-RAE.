import React from 'react';


const Hero = () => {
  return (
    <div className='text-base-content'>
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-success font-bold p-2 text-3xl'>
          Welcome to 
        </p>
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
        RAE .
        </h1>
        <div className='flex justify-center items-center'>
          <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>
            ALL IN ONE PLACE
          </p>
        </div>
        <p className='md:text-2xl text-xl font-bold text-gray-500 flex flex-row justify-center gap-14'><span>Plan </span>   <span>Code</span>  <span>Meet up</span></p>
        
      </div>
    </div>
  );
};

export default Hero;