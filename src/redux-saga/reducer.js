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
            return { ...state, taskList: action.data };
        case GET_TASK_LIST_ERROR:
            return { ...state, error: action.error };
        case CREATE_TASK:
            return state;
        case CREATE_TASK_SUCCESS:
            return { ...state, success: true };
        case CREATE_TASK_ERROR:
            return { ...state, error: action.error };
        case UPDATE_TASK:
            return state;
        case UPDATE_TASK_SUCCESS:
            return { ...state, success: true };
        case UPDATE_TASK_ERROR:
            return { ...state, error: action.error };
        case DELETE_TASK:
            return state;
        case DELETE_TASK_SUCCESS:
            return { ...state, success: true };
        case DELETE_TASK_ERROR:
            return { ...state, error: action.error };
        case CHANGE_TASK_STATUS:
            return state;
        case CHANGE_TASK_STATUS_SUCCESS:
            return { ...state, success: true };
        case CHANGE_TASK_STATUS_ERROR:
            return { ...state, error: action.error };
        default:
            return state;
    }
}
export default reducer;
