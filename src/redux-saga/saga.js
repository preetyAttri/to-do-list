import { call, put, takeEvery, all } from 'redux-saga/effects';
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
const {api_url, userId} = config;
/*
    saga genrator function created for getting task list
*/
function* SagaForGetTaskList() {
  try {
    yield put(actionForSetLoading(true));
    const url = `${api_url}api/v1/users/${userId}/tasks`;
    const result = yield call(request, url, { method: 'GET' })
    if (result) {
        yield put(actionForGetTaskListSuccess(result))
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
      const url = `${api_url}api/v1/users/${userId}/tasks`;
      const body = {
        task: {
            description: data
        }
      };
      const result = yield call(request, url, { method: 'POST', body: body })
      if (result) {
        yield put(actionForCreateTaskSuccess(result))
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
        const url = `${api_url}api/v1/users/${userId}/tasks/${data.id}`;
        const body = {
            task: {
                description: data.value
            }
        };
        const result = yield call(request, url, { method: 'PUT', body: body })
        if (result) {
            yield put(actionForUpdateTaskSuccess(result))
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
        const url = `${api_url}api/v1/users/${userId}/tasks/${data.id}`;
        const result = yield call(request, url, { method: 'DELETE'})
        if (result) {
            yield put(actionForDeleteTaskSuccess(data.id))
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
        const url = `${api_url}api/v1/users/${userId}/tasks/${data.id}/${data.status}`;
        const result = yield call(request, url, { method: 'PUT'})
        if (result) {
            yield put(actionForChangeTaskStatusSuccess(result))
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
    takeEvery(GET_TASK_LIST, SagaForGetTaskList),
    takeEvery(CREATE_TASK, SagaForCreateTask),
    takeEvery(UPDATE_TASK, SagaForUpdateTask),
    takeEvery(DELETE_TASK, SagaForDeleteTask),
    takeEvery(CHANGE_TASK_STATUS, SagaForChangeTaskStatus),
  ]);
}
