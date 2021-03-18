import {call, put, takeEvery} from 'redux-saga/effects';
import {
    categoriesError,
    categoriesFetched,
    categoriesLoading,
    habitEditHide,
    habitsError,
    habitsFetched,
    habitsLoading
} from '../redux/actions';
import HabitsService from '../services/HabitsService';
import {
    CATEGORIES_REQUESTED,
    FETCH_CATEGORIES,
    HABIT_CREATE,
    HABIT_REMOVE,
    HABIT_UPDATE,
    HABITS_REQUESTED
} from "../redux/actions/types";

const habitsService = new HabitsService();


export function* sagaWatcher() {
    yield takeEvery(HABITS_REQUESTED, fetchHabitsSaga);
    yield takeEvery(HABIT_REMOVE, removeHabitSaga);
    yield takeEvery(HABIT_CREATE, createHabitSaga);
    yield takeEvery(HABIT_UPDATE, updateHabitSaga);
    yield takeEvery(CATEGORIES_REQUESTED, fetchCategoriesSaga);
}

function* fetchHabitsSaga() {
    try {
        yield put(habitsLoading());
        const payload = yield call(habitsService.getHabits);
        yield put(habitsFetched(payload));
    } catch (error) {
        yield put(habitsError(error))
    }
}

function* fetchCategoriesSaga() {
    try {

        yield put(categoriesLoading());
        const payload = yield call(habitsService.getCategories);
        yield put(categoriesFetched(payload));
    } catch (error) {
        yield put(categoriesError(error))
    }
}

function* removeHabitSaga(action) {
    try {
        yield put(habitsLoading());
        const payload = yield call(() => habitsService.removeHabit(action.payload));
        yield put(habitsFetched(payload))
    } catch (error) {
        yield put(habitsError(error))
    }
}

function* createHabitSaga(action) {
    try {
        yield put(habitsLoading());
        const payload = yield call(() => habitsService.createHabit(action.payload));
        yield put(habitEditHide());
        yield put(habitsFetched(payload))
    } catch (error) {
        yield put(habitsError(error))
    }
}

function* updateHabitSaga(action) {
    try {
        yield put(habitsLoading());
        const payload = yield call(() => habitsService.updateHabit(action.payload));
        yield put(habitEditHide());
        yield put(habitsFetched(payload))
    } catch (error) {
        yield put(habitsError(error))
    }
}
