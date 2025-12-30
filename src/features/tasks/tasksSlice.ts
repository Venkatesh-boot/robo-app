import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: number;
  name: string;
  status: string;
  robot_id: number;
  priority: number;
}

const initialState: Task[] = [
  { id: 1, name: 'Clean Room', status: 'Pending', robot_id: 1, priority: 1 },
  { id: 2, name: 'Deliver Package', status: 'In Progress', robot_id: 2, priority: 2 },
  { id: 3, name: 'Assemble Parts', status: 'Completed', robot_id: 1, priority: 3 },
];

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, 'id'>>) => {
      const newId = Math.max(...state.map(t => t.id)) + 1;
      state.push({ ...action.payload, id: newId });
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      return state.filter(t => t.id !== action.payload);
    },
  },
});

export const { addTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;