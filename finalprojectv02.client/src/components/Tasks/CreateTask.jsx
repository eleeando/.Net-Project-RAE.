import React, { useState } from 'react'
// import { toast } from 'react-toastify';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';  //to generate the id


const CreateTask = ({tasks, setTasks}) => {
    const [task, setTask] = useState({
        id:"",
        name:"",
        status:"todo"   //can be in progress or closed
    })
    console.log(task)

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        if(task.name.length <3) return toast.error("🙅‍♀️ A task must have more than 3 characters 🙅‍♀️.")
        if(task.name.length <5) return toast.error("🙅‍♀️ A task must not be more than 5 characters 🙅‍♀️.")
        setTasks((pre)=>{
            const list = [...tasks, task] //on a changé tasks par pre
            localStorage.setItem("tasks", JSON.stringify(list))
            return list
        })

        toast.success("🎊 Task Created 🎊")

        setTask({
            id:"",
            name:"",
            status:"todo"
        })
    }
  return (
    <form onSubmit={handleSubmit}>
        <input type="text"
        className='border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 w-64 px-1' 
        onChange={(e)=>setTask({...task, id:uuidv4(), name:e.target.value})}
        value={task.name}
        />
        <button className='bg-black rounded-md px-4 h-12 text-primary'>Create</button>
    </form>
  )
}

export default CreateTask