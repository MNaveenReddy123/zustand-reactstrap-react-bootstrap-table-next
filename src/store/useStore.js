import {create} from 'zustand';
import { persist } from 'zustand/middleware';
// persist store to localStorage
export const useStore=create(persist((set,get)=>({
    //counter store global state and actions 

    counts:0,
    increase:()=>set(state=>({counts:state.counts+1})), 
    decrease:()=>set(state=>({counts:state.counts-1})),
    resetCount:()=>set({counts:0}),

    // todo store  global state and actions
    todos:[],
    addTodo:(todo)=>
        {
            const newTodo={id: Date.now(),todo,done:false}
            set(state => ({todos:[...state.todos,newTodo]}))
    },
    removeTodo:(id)=>{
        set(state =>({todos:state.todos.filter(todo=>todo.id!==id)}))
    },
    toggleTodo:(id)=>{
        set(state=>({todos:state.todos.map(todo=>todo.id===id?{...todo,done:!todo.done}:todo)}))
    }
    ,
    // derived/read-only
    get doneCount() {
    // note: getter isn't reactive here — use selectors in components for derived values
    return get().todos.filter(t => t.done).length
    }
    }), {
    name: 'zustand-storage', // key in localStorage
    // serialize/deserialize can be customized
}))
export default useStore