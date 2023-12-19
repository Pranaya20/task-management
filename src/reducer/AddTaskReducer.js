const initialData = {
    list:[]
}

const AddTaskReducer = (state=initialData, action) =>{
   switch(action.type){
    case "addTask":
        const {id,data} = action.payload;

        return {
            ...state,
            list:[
                ...state.list,
                {
                    id:id,
                    data:data
                }
            ]
        }
        default: return state;
   }
}

export default AddTaskReducer