import React, { useEffect, useState, useMemo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import toast from 'react-hot-toast';

const ListTasks = ({ tasks, setTasks }) => {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [closed, setClosed] = useState([]);

  useEffect(() => {
    if (Array.isArray(tasks)) {
      const fTodos = tasks.filter((task) => task.status === "todo");
      const fInProgress = tasks.filter((task) => task.status === "inProgress");
      const fClosed = tasks.filter((task) => task.status === "closed");

      setTodos(fTodos);
      setInProgress(fInProgress);
      setClosed(fClosed);
    }
  }, [tasks]);

  return (
    <div className='flex gap-16'>
      <Section status="todo" tasks={todos} setTasks={setTasks} color={"primary"} />
      <Section status="inProgress" tasks={inProgress} setTasks={setTasks}  color={"error"} />

      <Section status="closed" tasks={closed} setTasks={setTasks} color={"neutral"}/>
    </div>
  );
};
export default ListTasks;
const Section = ({ status, tasks, setTasks,color}) => {
  const [{ isOver }, drop] = useDrop(() => ({   //we used "ctrl+space" to add "import { useDrag } from 'react-dnd';" on the top
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()  //we are making the react dnd state being acceptable by the props
    })
  }))
  const text = status === 'inProgress' ? "In Progress" : (status === 'closed' ? "Closed" : "Todo");
  const bg = status === 'inProgress' ? "bg-purple-500" : (status === 'closed' ? "bg-green-500" : "bg-slate-500");

  const addItemToSection = (id) => {
    setTasks((prev) => {
      const mTasks = prev.map(t => {
        if(t.id === id){
          return {...t, status: status}
        }

        return t
      })
      localStorage.setItem("tasks", JSON.stringify(mTasks))
      toast("Task status changed",  {icon:"👍"})
      return mTasks
    } 
    )}

  return (
    <div ref={drop} className={`w-64 ${isOver? "bg-slate-200" : ""} rounded-md p-2`}>
      <Header text={text} bg={bg} count={tasks.length} />
      {tasks.length > 0 && tasks.map((task) => (
        <Task key={task.id} task={task} setTasks={setTasks} color={color}/>
      ))}
    </div>
  );
};

const Header = ({ text, bg, count }) => (
  <div className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}>
    {text}
    <div className='ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center'>{count}</div>
  </div>
);

const Task = ({ task, setTasks,color }) => {
  const [{ isDragging }, drag] = useDrag(() => ({   //we used "ctrl+space" to add "import { useDrag } from 'react-dnd';" on the top
    type: "task",
    item: {id: task.id},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()  //we are making the react dnd state being acceptable by the props
    })
  }))

  console.log(isDragging)


  const handleRemove = (id) => {
    setTasks(prevTasks => prevTasks.filter(t => t.id !== id));
    toast("Task Removed", { icon: "⛔" });
  };

  return (
    <div ref={drag} className={`flex items-center mt-8 p-4 rounded-md text-sm ${isDragging? "opacity-25" : "opacity-100" } text-black bg-${color} relative cursor-grab`}>
      <p>{task.name}</p>
      <button className='absolute bottom-1 right-1 text-slate-400' onClick={() => handleRemove(task.id)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </button>
    </div>
  );
};


