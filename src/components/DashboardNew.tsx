import React from 'react';
import { useSelector } from 'react-redux';
import { Task } from '../features/tasks/tasksSlice';
import { selectAllRobots } from '../features/robots/robotsSlice';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material';
import { CheckCircle, Pending, PlayArrow, Android } from '@mui/icons-material';

const Dashboard: React.FC = () => {
  const tasks = useSelector((state: { tasks: Task[] }) => state.tasks);
  const robots = useSelector(selectAllRobots);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'Completed').length;
  const inProgressTasks = tasks.filter(task => task.status === 'In Progress').length;
  const pendingTasks = tasks.filter(task => task.status === 'Pending').length;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const totalRobots = robots.length;
  const avgTasksPerRobot = totalRobots > 0 ? (totalTasks / totalRobots).toFixed(1) : '0';

  const highPriorityTasks = tasks.filter(task => task.priority >= 4).length;
  const mediumPriorityTasks = tasks.filter(task => task.priority >= 2 && task.priority < 4).length;
  const lowPriorityTasks = tasks.filter(task => task.priority < 2).length;

  const stats = [
    {
      title: 'Total Tasks',
      value: totalTasks,
      icon: <Android sx={{ fontSize: 40, color: 'primary.main' }} />,
      color: 'primary.main',
    },
    {
      title: 'Completed Tasks',
      value: completedTasks,
      icon: <CheckCircle sx={{ fontSize: 40, color: 'success.main' }} />,
      color: 'success.main',
    },
    {
      title: 'In Progress',
      value: inProgressTasks,
      icon: <PlayArrow sx={{ fontSize: 40, color: 'warning.main' }} />,
      color: 'warning.main',
    },
    {
      title: 'Pending Tasks',
      value: pendingTasks,
      icon: <Pending sx={{ fontSize: 40, color: 'error.main' }} />,
      color: 'error.main',
    },
  ];

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, color: 'primary.main' }}>
        Dashboard Overview
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3 }}>
        {stats.map((stat, index) => (
          <Card key={index} sx={{ height: '100%', boxShadow: 3 }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              {stat.icon}
              <Typography variant="h3" sx={{ mt: 1, color: stat.color, fontWeight: 'bold' }}>
                {stat.value}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {stat.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 3, mt: 2 }}>
        <Paper sx={{ p: 3, boxShadow: 3 }}>
          <Typography variant="h6" gutterBottom>
            Task Completion Progress
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box sx={{ width: '100%', mr: 1 }}>
              <LinearProgress
                variant="determinate"
                value={completionRate}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  bgcolor: 'grey.300',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: 'success.main',
                  },
                }}
              />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography variant="body2" color="text.secondary">
                {`${Math.round(completionRate)}%`}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {completedTasks} of {totalTasks} tasks completed
          </Typography>
        </Paper>

        <Paper sx={{ p: 3, boxShadow: 3 }}>
          <Typography variant="h6" gutterBottom>
            Priority Distribution
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">High Priority (4-5)</Typography>
              <Typography variant="body2" sx={{ color: 'error.main', fontWeight: 'bold' }}>
                {highPriorityTasks}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={totalTasks > 0 ? (highPriorityTasks / totalTasks) * 100 : 0}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: 'grey.300',
                '& .MuiLinearProgress-bar': { bgcolor: 'error.main' },
              }}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Medium Priority (2-3)</Typography>
              <Typography variant="body2" sx={{ color: 'warning.main', fontWeight: 'bold' }}>
                {mediumPriorityTasks}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={totalTasks > 0 ? (mediumPriorityTasks / totalTasks) * 100 : 0}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: 'grey.300',
                '& .MuiLinearProgress-bar': { bgcolor: 'warning.main' },
              }}
            />
          </Box>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Low Priority (1)</Typography>
              <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 'bold' }}>
                {lowPriorityTasks}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={totalTasks > 0 ? (lowPriorityTasks / totalTasks) * 100 : 0}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: 'grey.300',
                '& .MuiLinearProgress-bar': { bgcolor: 'success.main' },
              }}
            />
          </Box>
        </Paper>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 3, mt: 2 }}>
        <Paper sx={{ p: 3, boxShadow: 3 }}>
          <Typography variant="h6" gutterBottom>
            Robot Statistics
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Android sx={{ fontSize: 30, color: 'secondary.main', mr: 2 }} />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {totalRobots}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Robots
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Average tasks per robot: {avgTasksPerRobot}
          </Typography>
        </Paper>

        <Paper sx={{ p: 3, boxShadow: 3 }}>
          <Typography variant="h6" gutterBottom>
            Recent Activity
          </Typography>
          <Box sx={{ maxHeight: 200, overflowY: 'auto' }}>
            {tasks.slice(-5).reverse().map((task: Task) => (
              <Box key={task.id} sx={{ mb: 1, p: 1, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Task #{task.id}: {task.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Status: {task.status} | Priority: {task.priority}
                </Typography>
              </Box>
            ))}
            {tasks.length === 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                No tasks yet. Add some tasks to see activity!
              </Typography>
            )}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;