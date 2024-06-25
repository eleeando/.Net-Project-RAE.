import { useEffect, useState } from 'react'
import CreateTask from './CreateTask'
import ListTasks from './ListTasks'
import toast, { Toaster } from 'react-hot-toast';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


function TaskDashboard() {
  const [tasks, setTasks] = useState([])
  console.log(tasks)
  useEffect(()=>{
    if (JSON.parse(localStorage.getItem("tasks"))) {
      setTasks(JSON.parse(localStorage.getItem("tasks")))
    }
    
  }, [])
  return (

  <DndProvider backend={HTML5Backend}>
    <div className=' bg-gradient-to-r from-purple-500 to-pink-500 w-screen h-screen flex flex-col items-center p-4 gap-16 pt-32'>
      <Toaster/>
      <CreateTask tasks={tasks} setTasks={setTasks}  />
      <ListTasks tasks={tasks} setTasks={setTasks} />
    </div>
  </DndProvider>
  )
}

export default TaskDashboard
