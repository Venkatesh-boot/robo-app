import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addRobot, updateRobot, deleteRobot, selectAllRobots, Robot } from '../features/robots/robotsSlice';
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
  IconButton,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { useToast } from './Toast';

type RobotFormData = Omit<Robot, 'id'>;

const RobotManager = () => {
  const robots = useSelector(selectAllRobots) as Robot[];
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const [editingRobot, setEditingRobot] = useState<Robot | null>(null);
  const [formData, setFormData] = useState<RobotFormData>({
    name: '',
    description: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RobotFormData, string>>>({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof RobotFormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOpen = (robot: Robot | null = null) => {
    if (robot) {
      setEditingRobot(robot);
      setFormData({
        name: robot.name,
        description: robot.description,
      });
    } else {
      setEditingRobot(null);
      setFormData({
        name: '',
        description: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingRobot(null);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      if (editingRobot) {
        dispatch(updateRobot({ ...formData, id: editingRobot.id }));
        showToast('Robot updated successfully!', 'success');
      } else {
        dispatch(addRobot(formData));
        showToast('Robot added successfully!', 'success');
      }
      handleClose();
    } else {
      showToast('Please fix the form errors before submitting.', 'error');
    }
  };

  const handleDelete = (id: number) => {
    dispatch(deleteRobot(id));
    showToast('Robot deleted successfully!', 'success');
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleOpen()}
        sx={{ mb: 2 }}
      >
        Add Robot
      </Button>
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ bgcolor: 'secondary.main' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Description</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {robots.map((robot, index) => (
              <TableRow
                key={robot.id}
                sx={{
                  bgcolor: index % 2 === 0 ? 'grey.50' : 'white',
                  '&:hover': { bgcolor: 'grey.100' },
                }}
              >
                <TableCell sx={{ fontWeight: 'bold' }}>{robot.id}</TableCell>
                <TableCell sx={{ fontWeight: 'medium', color: 'primary.main' }}>
                  {robot.name}
                </TableCell>
                <TableCell sx={{ color: 'text.secondary' }}>{robot.description}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleOpen(robot)}
                    sx={{
                      color: 'primary.main',
                      '&:hover': { bgcolor: 'primary.light', color: 'white' },
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(robot.id)}
                    sx={{
                      color: 'error.main',
                      '&:hover': { bgcolor: 'error.light', color: 'white' },
                    }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingRobot ? 'Edit Robot' : 'Add Robot'}</DialogTitle>
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
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            variant="standard"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            error={!!errors.description}
            helperText={errors.description}
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

export default RobotManager;