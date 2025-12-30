import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, updateTask, deleteTask, Task } from '../features/tasks/tasksSlice';
import { selectAllRobots } from '../features/robots/robotsSlice';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Typography,
  InputAdornment,
  Chip,
} from '@mui/material';
import { Edit, Delete, Add, Search, FilterList } from '@mui/icons-material';
import { useToast } from './Toast';

type TaskFormData = {
  name: string;
  status: string;
  robot_id: string;
  priority: number;
};

const TaskManager = () => {
  const tasks = useSelector((state: { tasks: Task[] }) => state.tasks);
  const robots = useSelector(selectAllRobots);
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState<TaskFormData>({
    name: '',
    status: 'Pending',
    robot_id: '',
    priority: 1,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof TaskFormData, string>>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');

  // Filter tasks based on search and filters
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.id.toString().includes(searchTerm);
    const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' ||
                           (priorityFilter === 'High' && task.priority >= 4) ||
                           (priorityFilter === 'Medium' && task.priority >= 2 && task.priority < 4) ||
                           (priorityFilter === 'Low' && task.priority < 2);

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const validateForm = () => {
    const newErrors: Partial<Record<keyof TaskFormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.robot_id) newErrors.robot_id = 'Robot selection is required';
    if (!formData.priority || formData.priority < 1) newErrors.priority = 'Priority must be a positive number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOpen = (task: Task | null = null) => {
    if (task) {
      setEditingTask(task);
      setFormData({
        name: task.name,
        status: task.status,
        robot_id: task.robot_id.toString(),
        priority: task.priority,
      });
    } else {
      setEditingTask(null);
      setFormData({
        name: '',
        status: 'Pending',
        robot_id: '',
        priority: 1,
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingTask(null);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTask(id));
    showToast('Task deleted successfully!', 'success');
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const taskData = { ...formData, robot_id: parseInt(formData.robot_id) };
      if (editingTask) {
        dispatch(updateTask({ ...taskData, id: editingTask.id }));
        showToast('Task updated successfully!', 'success');
      } else {
        dispatch(addTask(taskData));
        showToast('Task added successfully!', 'success');
      }
      handleClose();
    } else {
      showToast('Please fix the form errors before submitting.', 'error');
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          Task Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpen()}
        >
          Add Task
        </Button>
      </Box>

      {/* Search and Filter Controls */}
      <Paper sx={{ p: 2, mb: 3, boxShadow: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 250 }}
          />

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
              startAdornment={<FilterList sx={{ mr: 1, color: 'action.active' }} />}
            >
              <MenuItem value="All">All Status</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Priority</InputLabel>
            <Select
              value={priorityFilter}
              label="Priority"
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <MenuItem value="All">All Priority</MenuItem>
              <MenuItem value="High">High (4-5)</MenuItem>
              <MenuItem value="Medium">Medium (2-3)</MenuItem>
              <MenuItem value="Low">Low (1)</MenuItem>
            </Select>
          </FormControl>

          {(searchTerm || statusFilter !== 'All' || priorityFilter !== 'All') && (
            <Chip
              label={`${filteredTasks.length} of ${tasks.length} tasks`}
              color="primary"
              variant="outlined"
            />
          )}
        </Box>
      </Paper>
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ bgcolor: 'primary.main' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Robot ID</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Priority</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks.map((task, index) => {
              const getStatusColor = (status: string) => {
                switch (status) {
                  case 'Completed':
                    return { bgcolor: '#e8f5e8', color: '#2e7d32' };
                  case 'In Progress':
                    return { bgcolor: '#fff3e0', color: '#ef6c00' };
                  case 'Pending':
                    return { bgcolor: '#ffebee', color: '#c62828' };
                  default:
                    return { bgcolor: 'inherit', color: 'inherit' };
                }
              };

              const getPriorityColor = (priority: number) => {
                if (priority >= 4) return '#ff5722'; // High priority - red
                if (priority >= 3) return '#ff9800'; // Medium-high - orange
                if (priority >= 2) return '#ffc107'; // Medium - yellow
                return '#4caf50'; // Low - green
              };

              return (
                <TableRow
                  key={task.id}
                  sx={{
                    bgcolor: index % 2 === 0 ? 'grey.50' : 'white',
                    '&:hover': { bgcolor: 'grey.100' },
                  }}
                >
                  <TableCell sx={{ fontWeight: 'bold' }}>{task.id}</TableCell>
                  <TableCell sx={{ fontWeight: 'medium' }}>{task.name}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        ...getStatusColor(task.status),
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        display: 'inline-block',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        minWidth: 80,
                      }}
                    >
                      {task.status}
                    </Box>
                  </TableCell>
                  <TableCell>{task.robot_id}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        color: getPriorityColor(task.priority),
                        fontWeight: 'bold',
                        fontSize: '1.1em',
                      }}
                    >
                      {task.priority}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleOpen(task)}
                      sx={{
                        color: 'primary.main',
                        '&:hover': { bgcolor: 'primary.light', color: 'white' },
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(task.id)}
                      sx={{
                        color: 'error.main',
                        '&:hover': { bgcolor: 'error.light', color: 'white' },
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingTask ? 'Edit Task' : 'Add Task'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            variant="standard"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={!!errors.name}
            helperText={errors.name}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              label="Status"
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense" error={!!errors.robot_id}>
            <InputLabel>Robot</InputLabel>
            <Select
              value={formData.robot_id}
              label="Robot"
              onChange={(e) => setFormData({ ...formData, robot_id: e.target.value })}
            >
              {robots.map((robot) => (
                <MenuItem key={robot.id} value={robot.id}>
                  {robot.name}
                </MenuItem>
              ))}
            </Select>
            {errors.robot_id && <Typography variant="caption" color="error">{errors.robot_id}</Typography>}
          </FormControl>
          <TextField
            margin="dense"
            label="Priority"
            type="number"
            fullWidth
            variant="standard"
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 1 })}
            error={!!errors.priority}
            helperText={errors.priority}
            inputProps={{ min: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskManager;