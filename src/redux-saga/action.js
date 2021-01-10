import { 
    SET_LOADER,
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
    CHANGE_TASK_STATUS_ERROR
} from './constant.js';

/*
    action to set the loader
*/
export const actionForSetLoading = (data) => {
    return {
        type: SET_LOADER,
        data
    }
}

/*
    action used when we want to get task list
*/
export const actionForGetTaskList = (data) => {
    return {
        type: GET_TASK_LIST,
        data
    }
}
/*
    action used when we get task list successfully
*/
export const actionForGetTaskListSuccess = (data) => {
    return {
        type: GET_TASK_LIST_SUCCESS,
        data
    }
}
/*
    action used when we getting task list and error is thrown
*/
export const actionForGetTaskListError = (error) => {
    return {
        type: GET_TASK_LIST_ERROR,
        error
    }
}
/*
    action used when we want to create task
*/
export const actionForCreateTask = (data) => {
    return {
        type: CREATE_TASK,
        data
    }
}
/*
    action used when task created successfully
*/
export const actionForCreateTaskSuccess = (data) => {
    return {
        type: CREATE_TASK_SUCCESS,
        data
    }
}
/*
    action used when we creating task and error is thrown
*/
export const actionForCreateTaskError = (error) => {
    return {
        type: CREATE_TASK_ERROR,
        error
    }
}
/*
    action used when we want to delete task
*/
export const actionForDeleteTask = (data) => {
    return {
        type: DELETE_TASK,
        data
    }
}
/*
    action used when task deleted successfully
*/
export const actionForDeleteTaskSuccess = (data) => {
    return {
        type: DELETE_TASK_SUCCESS,
        data
    }
}
/*
    action used when we delete task and error is thrown
*/
export const actionForDeleteTaskError = (error) => {
    return {
        type: DELETE_TASK_ERROR,
        error
    }
}
/*
    action used when we want to update task
*/
export const actionForUpdateTask = (data) => {
    return {
        type: UPDATE_TASK,
        data
    }
}
/*
    action used when task updated succesfully
*/
export const actionForUpdateTaskSuccess = (data) => {
    return {
        type: UPDATE_TASK_SUCCESS,
        data
    }
}
/*
    action used when we update task list and error is thrown
*/
export const actionForUpdateTaskError = (error) => {
    return {
        type: UPDATE_TASK_ERROR,
        error
    }
}
/*
    action used when we want to change task status to completed or uncompleted
*/
export const actionForChangeTaskStatus = (data) => {
    return {
        type: CHANGE_TASK_STATUS,
        data
    }
}
/*
    action used when we successfully change task status
*/
export const actionForChangeTaskStatusSuccess = (data) => {
    return {
        type: CHANGE_TASK_STATUS_SUCCESS,
        data
    }
}
/*
    action used when we change task status and error is thrown
*/
export const actionForChangeTaskStatusError = (error) => {
    return {
        type: CHANGE_TASK_STATUS_ERROR,
        error
    }
}