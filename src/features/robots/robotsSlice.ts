import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

export interface Robot {
  id: number;
  name: string;
  description: string;
}

const initialState: Robot[] = [
  { id: 1, name: 'Robot A', description: 'Cleaning robot' },
  { id: 2, name: 'Robot B', description: 'Delivery robot' },
];

const robotsSlice = createSlice({
  name: 'robots',
  initialState,
  reducers: {
    addRobot: (state, action: PayloadAction<Omit<Robot, 'id'>>) => {
      const newId = Math.max(...state.map(r => r.id)) + 1;
      state.push({ ...action.payload, id: newId });
    },
    updateRobot: (state, action: PayloadAction<Robot>) => {
      const index = state.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteRobot: (state, action: PayloadAction<number>) => {
      return state.filter(r => r.id !== action.payload);
    },
  },
});

export const { addRobot, updateRobot, deleteRobot } = robotsSlice.actions;
export const selectAllRobots = (state: RootState): Robot[] => state.robots;
export default robotsSlice.reducer;