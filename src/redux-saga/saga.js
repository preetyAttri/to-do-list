import { call, put, takeLatest, all } from 'redux-saga/effects';
import {
  GET_TASK_LIST,
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  CHANGE_TASK_STATUS
} from './constant.js';
import {
} from './action';
import { 
    actionForSetLoading,
    actionForGetTaskListSuccess,
    actionForGetTaskListError,
    actionForGetTaskList,
    actionForCreateTaskSuccess,
    actionForCreateTaskError,
    actionForUpdateTaskSuccess,
    actionForUpdateTaskError,
    actionForDeleteTaskSuccess,
    actionForDeleteTaskError,
    actionForChangeTaskStatusSuccess,
    actionForChangeTaskStatusError 
} from './action.js';
import config from '../config';
import request from '../utils/request';

/*
    saga genrator function created for getting task list
*/
function* SagaForGetTaskList() {
  try {
    yield put(actionForSetLoading(true));
    const url = `${config.api_url}api/v1/users/94/tasks`;
    const result = yield call(request, url, { method: 'GET' })
    if (result) {
        const sortedList = result.sort((a, b) => {
            if(a.completed_at && b.completed_at) {
                return new Date(a.completed_at) - new Date(b.completed_at)
            } else if(a.completed_at) {
                return 1
            } else if(b.completed_at) {
                return -1
            } else {
                return new Date(b.created_at) - new Date(a.created_at)
            }
        })
        yield put(actionForGetTaskListSuccess(sortedList))
    } else {
        yield put(actionForGetTaskListError(result))
    }
  } catch (error) {
        yield put(actionForGetTaskListError(error))
  } finally {
        yield put(actionForSetLoading(false));
  }
}
/*
    saga genrator function created for creating task
*/
function* SagaForCreateTask({data}) {
    try {
      yield put(actionForSetLoading(true));
      const url = `${config.api_url}api/v1/users/94/tasks`;
      const body = {
        task: {
            description: data
        }
      };
      const result = yield call(request, url, { method: 'POST', body: body })
      if (result) {
        yield put(actionForCreateTaskSuccess(result))
        yield put(actionForGetTaskList())
      } else {
        yield put(actionForCreateTaskError(result))
      }
    } catch (error) {
      yield put(actionForCreateTaskError(error))
    } finally {
      yield put(actionForSetLoading(false));
    }
}
/*
    saga genrator function created for updating task
*/
function* SagaForUpdateTask({data}) {
    try {
        yield put(actionForSetLoading(true));
        const url = `${config.api_url}api/v1/users/94/tasks/${data.id}`;
        const body = {
            task: {
                description: data.value
            }
        };
        const result = yield call(request, url, { method: 'PUT', body: body })
        if (result) {
            yield put(actionForUpdateTaskSuccess(result))
            yield put(actionForGetTaskList())
        } else {
            yield put(actionForUpdateTaskError(result))
        }
    } catch (error) {
        yield put(actionForUpdateTaskError(error))
    } finally {
        yield put(actionForSetLoading(false));
    }
}
/*
    saga genrator function created for delete task
*/
function* SagaForDeleteTask({data}) {
    try {
        yield put(actionForSetLoading(true));
        const url = `${config.api_url}api/v1/users/94/tasks/${data.id}`;
        const result = yield call(request, url, { method: 'DELETE'})
        if (result) {
            yield put(actionForDeleteTaskSuccess(result))
            yield put(actionForGetTaskList())
        } else {
            yield put(actionForDeleteTaskError(result))
        }
    } catch (error) {
        yield put(actionForDeleteTaskError(error))
    } finally {
        yield put(actionForSetLoading(false));
    }
}
/*
    saga genrator function created for change task status
*/
function* SagaForChangeTaskStatus({data}) {
    try {
        yield put(actionForSetLoading(true));
        const url = `${config.api_url}api/v1/users/94/tasks/${data.id}/${data.status}`;
        const result = yield call(request, url, { method: 'PUT'})
        if (result) {
            yield put(actionForChangeTaskStatusSuccess(result))
            yield put(actionForGetTaskList())
        } else {
            yield put(actionForChangeTaskStatusError(result))
        }
    } catch (error) {
        yield put(actionForChangeTaskStatusError(error))
    } finally {
        yield put(actionForSetLoading(false));
    }
}

/*
 root generator funtion which take all possible action types
*/
export default function* rootSaga() {
  yield all([
    takeLatest(GET_TASK_LIST, SagaForGetTaskList),
    takeLatest(CREATE_TASK, SagaForCreateTask),
    takeLatest(UPDATE_TASK, SagaForUpdateTask),
    takeLatest(DELETE_TASK, SagaForDeleteTask),
    takeLatest(CHANGE_TASK_STATUS, SagaForChangeTaskStatus),
  ]);
}
