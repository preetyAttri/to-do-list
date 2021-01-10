import { 
    GET_TASK_LIST,
    GET_TASK_LIST_SUCCESS,
    GET_TASK_LIST_ERROR,
    CREATE_TASK,
    CREATE_TASK_SUCCESS,
    CREATE_TASK_ERROR,
    UPDATE_TASK,
    UPDATE_TASK_SUCCESS,
    UPDATE_TASK_ERROR,
    DELETE_TASK,
    DELETE_TASK_SUCCESS,
    DELETE_TASK_ERROR,
    CHANGE_TASK_STATUS,
    CHANGE_TASK_STATUS_SUCCESS,
    CHANGE_TASK_STATUS_ERROR,
    SET_LOADER
} from './constant.js';

/*
    state intialization
*/
const initialState = {
    taskList: [],
    success: false,
    error: false,
    loading: false
}

const findindex = (array, id) => {
    return array.findIndex((ele) => ele.id === id);
}
const sortList = (array) => {
    return array.sort((a, b) => {
        if(a.completed_at && b.completed_at) {
            return new Date(b.updated_at) - new Date(a.updated_at)
        } else if(a.completed_at) {
            return 1
        } else if(b.completed_at) {
            return -1
        } else {
            return new Date(b.created_at) - new Date(a.created_at)
        }
    })
}

const manupulateArray = ({array, item, status}) => {
    const taskArray =  [...array];
    switch(status) {
        case "ADD": 
             taskArray.splice(0, 0, item);
            return taskArray;
        case "UPDATE": {
            const index = findindex(array, item?.id)
            taskArray.splice(index, 1, item)
            return sortList(taskArray);
        }
        case "DELETE": {
            const index = findindex(array, item)
            taskArray.splice(index, 1)
            return sortList(taskArray);
        }
        default: return sortList(taskArray);
    }
}
/*
    reducer function which works according to action dispatched
*/
function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_LOADER:
            return { ...state, loading: action.data };
        case GET_TASK_LIST:
            return state;
        case GET_TASK_LIST_SUCCESS:
            return { ...state, taskList: sortList(action.data) };
        case GET_TASK_LIST_ERROR:
            return { ...state, error: action.error };
        case CREATE_TASK:
            return state;
        case CREATE_TASK_SUCCESS: {
            return { 
                ...state, 
                taskList: manupulateArray({array: state.taskList, item: action.data, status: "ADD"}),
                success: true 
            };
        }
        case CREATE_TASK_ERROR:
            return { ...state, error: action.error };
        case UPDATE_TASK:
            return state;
        case UPDATE_TASK_SUCCESS: 
            return { 
                ...state, 
                success: true,
                taskList: manupulateArray({array: state.taskList, item: action.data, status: "UPDATE"}),
            };
        case UPDATE_TASK_ERROR:
            return { ...state, error: action.error };
        case DELETE_TASK:
            return state;
        case DELETE_TASK_SUCCESS: {
            const index = findindex(state.taskList, action.data)
            const taskArray =  [...state.taskList];
            taskArray.splice(index, 1)
            return { 
                ...state, 
                success: true,
                taskList: manupulateArray({array: state.taskList, item: action.data, status: "DELETE"}),
            };
        }
        case DELETE_TASK_ERROR: 
            return { ...state, error: action.error }
        case CHANGE_TASK_STATUS:
            return state;
        case CHANGE_TASK_STATUS_SUCCESS: {
            return { 
                ...state, 
                success: true,
                taskList: manupulateArray({array: state.taskList, item: action.data, status: "UPDATE"}),
            };
        };
        case CHANGE_TASK_STATUS_ERROR:
            return { ...state, error: action.error };
        default:
            return state;
    }
}
export default reducer;
