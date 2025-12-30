import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasks/tasksSlice';
import robotsReducer from '../features/robots/robotsSlice';

// Load state from localStorage
const loadState = () => {
  try {
    const serializedTasks = localStorage.getItem('tasks');
    const serializedRobots = localStorage.getItem('robots');

    return {
      tasks: serializedTasks ? JSON.parse(serializedTasks) : undefined,
      robots: serializedRobots ? JSON.parse(serializedRobots) : undefined,
    };
  } catch (err) {
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state: RootState) => {
  try {
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
    localStorage.setItem('robots', JSON.stringify(state.robots));
  } catch (err) {
    // Ignore write errors
  }
};

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    robots: robotsReducer,
  },
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  saveState(store.getState());
});