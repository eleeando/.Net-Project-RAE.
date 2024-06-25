import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Projects = ({id}) => {
  useEffect(()=>{
    async function getOneUserProject(){
      try {
        const response  = await axios.get("http://localhost:5292/api/user/" + localStorage.getItem("userId"));
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getOneUserProject();
  },[id])
  return (
    <div className="flex flex-col gap-4 w-52">
  <div className="skeleton h-32 w-full"></div>
  <div className="skeleton h-4 w-28"></div>
  <div className="skeleton h-4 w-full"></div>
  <div className="skeleton h-4 w-full"></div>
</div>
  )
}

export default Projects