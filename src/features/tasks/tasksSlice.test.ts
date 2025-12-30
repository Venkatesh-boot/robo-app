import tasksReducer, { addTask, updateTask, deleteTask } from './tasksSlice';

describe('tasks reducer', () => {
  const initialState = [
    { id: 1, name: 'Clean Room', status: 'Pending', robot_id: 1, priority: 1 },
    { id: 2, name: 'Deliver Package', status: 'In Progress', robot_id: 2, priority: 2 },
    { id: 3, name: 'Assemble Parts', status: 'Completed', robot_id: 1, priority: 3 },
  ];

  it('should return the initial state', () => {
    expect(tasksReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addTask', () => {
    const newTask = { name: 'New Task', status: 'Pending', robot_id: 1, priority: 4 };
    const action = addTask(newTask);
    const result = tasksReducer(initialState, action);
    expect(result).toHaveLength(3);
    expect(result[2]).toEqual({ id: 3, ...newTask });
  });

  it('should handle updateTask', () => {
    const updatedTask = { id: 1, name: 'Clean Room Updated', status: 'Completed', robot_id: 1, priority: 1 };
    const action = updateTask(updatedTask);
    const result = tasksReducer(initialState, action);
    expect(result[0]).toEqual(updatedTask);
  });

  it('should handle deleteTask', () => {
    const action = deleteTask(1);
    const result = tasksReducer(initialState, action);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });
});