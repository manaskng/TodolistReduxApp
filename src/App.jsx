import { useState } from 'react'
import {TodoProvider} from "./contexts"
import './App.css'
import { useEffect } from 'react';
import { Todoform, Todoitem } from './components';

function App() {
  const [todos,settodos]=useState([]);

  const addTodo=(todo)=>{
     settodos((prev)=>
      [{id:Date.now(),...todo},...prev]
     )
  }
  // if update new one if matches else keep array as previous
  const updateTodo=(id,todo)=>{
    settodos((prev)=> prev.map((prevtodos)=>(prevtodos.id===id)?todo:prevtodos))

  }
  const deleteTodo=(id)=>{
    settodos((prev)=>prev.filter((prevtodos)=>prevtodos.id!=id))
  };
  const completeToggle=(id)=>{
    settodos((prev)=>prev.map(
      (prevtodos)=>(prevtodos.id===id)?{...prevtodos ,completed: !prevtodos.completed}:prevtodos))
  }
  //localStorage
  useEffect(() => {
   const todos = JSON.parse(localStorage.getItem("todos"));

    if(todos&&todos.length>0)
    settodos(todos);
  }, [])
  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos));
    
  }, [todos])
  
  return (
    <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,completeToggle}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <Todoform/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo)=>(
                          <div key={todo.id} className='w-full'>
                           <Todoitem todo={todo}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
