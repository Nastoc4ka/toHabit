import {
    HABIT_CREATE_ERROR,
    HABIT_CREATE_LOADING,
    HABIT_CREATED,
    HABIT_REMOVE_ERROR,
    HABIT_REMOVE_LOADING,
    HABIT_REMOVED,
    HABIT_UPDATE_ERROR,
    HABIT_UPDATE_LOADING,
    HABIT_UPDATED,
    HABITS_ERROR,
    HABITS_FETCHED,
    HABITS_LOADING
} from "../actions/types";

const initialState = {

    loadingAllHabits: true,
    habits: [],
    error: null,

    loading: false,
    errorEditHabit: null,

    loadingRemoveHabit: false,
    errorRemoveHabit: null,

    loadingCreateHabit: false,
    errorCreateHabit: null,
};

const habitsReducer = (state = initialState, action) => {
    switch (action.type) {
        case HABITS_LOADING:
            return {
                ...state,
                habits: [],
                loadingAllHabits: true,
                error: null
            };
        case HABITS_FETCHED:
            return {
                ...state,
                habits: action.payload,
                loadingAllHabits: false,
                error: null
            };
        case HABITS_ERROR:
            return {
                ...state,
                habits: [],
                loadingAllHabits: false,
                error: action.payload
            };
        case HABIT_UPDATE_LOADING:
            return {
                ...state,
                loading: true,
                errorEditHabit: null
            };
        case HABIT_UPDATED:
            const habit = action.payload;
            const idx = state.habits.findIndex((h) => h.id === action.payload.id);
            return {
                ...state,
                habits: [...state.habits.slice(0, idx), habit, ...state.habits.slice(idx + 1)],
                loading: false,
                errorEditHabit: null,
            };
        case HABIT_UPDATE_ERROR:
            return {
                ...state,
                loading: false,
                errorEditHabit: action.payload,
            };
        case HABIT_CREATE_LOADING:
            return {
                ...state,
                loadingCreateHabit: true,
                errorCreateHabit: null,
            };
        case HABIT_CREATED:
            return {
                ...state,
                habits: [...state.habits, action.payload],
                loading: false,
                loadingCreateHabit: false,
                errorEditHabit: null,
            };
        case HABIT_CREATE_ERROR:
            return {
                ...state,
                loadingCreateHabit: false,
                errorCreateHabit: action.payload,
            };
        case HABIT_REMOVE_LOADING:
            return {
                ...state,
                loadingRemoveHabit: true,
                errorRemoveHabit: null
            };
        case HABIT_REMOVED:
            const idHabit = action.payload;
            const updatedHabitList = state.habits.filter((h) => h.id !== idHabit);
            return {
                ...state,
                habits: updatedHabitList,
                loadingRemoveHabit: false,
                errorRemoveHabit: null,
            };
        case HABIT_REMOVE_ERROR:
            return {
                ...state,
                loadingRemoveHabit: false,
                errorRemoveHabit: action.payload,
            };

        default:
            return state
    }
};

export default habitsReducer