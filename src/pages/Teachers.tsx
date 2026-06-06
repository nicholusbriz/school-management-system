import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Search,
  Email,
  Phone,
} from '@mui/icons-material';

interface Teacher {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  department: string;
  experience: number;
  status: 'active' | 'leave';
}

export default function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([
    { id: 1, name: 'Dr. Sarah Miller', email: 'sarah.m@school.edu', phone: '555-1001', subject: 'Mathematics', department: 'Science', experience: 12, status: 'active' },
    { id: 2, name: 'Prof. James Wilson', email: 'james.w@school.edu', phone: '555-1002', subject: 'Physics', department: 'Science', experience: 15, status: 'active' },
    { id: 3, name: 'Ms. Emily Chen', email: 'emily.c@school.edu', phone: '555-1003', subject: 'English', department: 'Languages', experience: 8, status: 'active' },
    { id: 4, name: 'Mr. Robert Taylor', email: 'robert.t@school.edu', phone: '555-1004', subject: 'History', department: 'Social Studies', experience: 10, status: 'active' },
    { id: 5, name: 'Dr. Lisa Anderson', email: 'lisa.a@school.edu', phone: '555-1005', subject: 'Chemistry', department: 'Science', experience: 18, status: 'leave' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState<Partial<Teacher>>({});
  const [isEditing, setIsEditing] = useState(false);

  const handleAddTeacher = () => {
    setCurrentTeacher({});
    setIsEditing(false);
    setOpenDialog(true);
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setCurrentTeacher(teacher);
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleSaveTeacher = () => {
    if (isEditing) {
      setTeachers(teachers.map(t => t.id === currentTeacher.id ? currentTeacher as Teacher : t));
    } else {
      const newTeacher = {
        ...currentTeacher,
        id: Math.max(...teachers.map(t => t.id)) + 1,
        status: 'active',
        experience: 0,
      } as Teacher;
      setTeachers([...teachers, newTeacher]);
    }
    setOpenDialog(false);
  };

  const handleDeleteTeacher = (id: number) => {
    setTeachers(teachers.filter(t => t.id !== id));
  };

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Teachers</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddTeacher}
        >
          Add Teacher
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search teachers by name, subject, or department..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Teacher</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Experience</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTeachers.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar>{teacher.name.charAt(0)}</Avatar>
                    <Typography variant="body2">{teacher.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Email sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="caption">{teacher.email}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Phone sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="caption">{teacher.phone}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{teacher.subject}</TableCell>
                <TableCell>{teacher.department}</TableCell>
                <TableCell>{teacher.experience} years</TableCell>
                <TableCell>
                  <Chip
                    label={teacher.status}
                    color={teacher.status === 'active' ? 'success' : 'warning'}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton size="small" color="primary" onClick={() => handleEditTeacher(teacher)}>
                    <Edit />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDeleteTeacher(teacher.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{isEditing ? 'Edit Teacher' : 'Add New Teacher'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                value={currentTeacher.name || ''}
                onChange={(e) => setCurrentTeacher({ ...currentTeacher, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={currentTeacher.email || ''}
                onChange={(e) => setCurrentTeacher({ ...currentTeacher, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                value={currentTeacher.phone || ''}
                onChange={(e) => setCurrentTeacher({ ...currentTeacher, phone: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Subject"
                value={currentTeacher.subject || ''}
                onChange={(e) => setCurrentTeacher({ ...currentTeacher, subject: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Department"
                value={currentTeacher.department || ''}
                onChange={(e) => setCurrentTeacher({ ...currentTeacher, department: e.target.value })}
              >
                {['Science', 'Languages', 'Social Studies', 'Arts', 'Physical Education'].map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Years of Experience"
                value={currentTeacher.experience || 0}
                onChange={(e) => setCurrentTeacher({ ...currentTeacher, experience: parseInt(e.target.value) })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Status"
                value={currentTeacher.status || 'active'}
                onChange={(e) => setCurrentTeacher({ ...currentTeacher, status: e.target.value as 'active' | 'leave' })}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="leave">On Leave</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveTeacher}>
            {isEditing ? 'Save Changes' : 'Add Teacher'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
