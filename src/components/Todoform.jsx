import React, { useState } from 'react';

import { useTodo} from "../contexts/TodoContext.js"

function TodoForm() {
  const [todo,settodo]=useState("");
  const {addTodo} =useTodo();
  const add=(e)=>{
    e.preventDefault();
    if(!todo){
      return ;
    }
    else{
      addTodo({todo,completed:false});
      settodo("");//again new todo to empty string for future use
    }

  }
    return (
        <form  onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                value={todo}//linking value to state
                onChange={(e)=>{settodo(e.target.value)}}//on any change change todo simultaneously
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;