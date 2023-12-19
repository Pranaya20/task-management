export const addTask = (data) =>{

   return{
    type:"ADD_TASK",
    payload:{
        id:new Date().getTime().toString(),
        data:data
    }
   }
}

export const deleteTask = () =>{
    return{
     type:"DELETE_TASK"
    }
 }

 export const editTask = () =>{
    return{
     type:"EDIT_TASK"
    }
 }