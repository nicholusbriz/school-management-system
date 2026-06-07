import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
  MenuItem,
  InputAdornment,
  alpha,
  LinearProgress,
  Tooltip,
  Card,
  CardContent,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Search,
  Visibility,
  Download,
  FilterList,
  Email,
  Phone,
  School,
  TrendingUp,
} from '@mui/icons-material';
import api from '@/services/api';
import StudentsSkeleton from '@/skeletons/StudentsSkeleton';

interface Student {
  id: string;
  studentId: string;
  grade: string;
  section: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

interface DisplayStudent {
  id: string;
  name: string;
  email: string;
  grade: string;
  class: string;
  phone: string;
  status: 'active' | 'inactive';
  gpa: number;
  attendance: number;
}

export default function Students() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Partial<DisplayStudent>>({});
  const [isEditing, setIsEditing] = useState(false);

  const { data: studentsData, isLoading } = useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      const response = await api.get<{ success: boolean; data: Student[] }>('/students');
      return response.data.data.map((student: Student) => ({
        id: student.id,
        name: student.user.name,
        email: student.user.email,
        grade: student.grade,
        class: `${student.grade}-${student.section}`,
        phone: '555-0100',
        status: 'active' as const,
        gpa: 3.5,
        attendance: 90,
      }));
    },
  });

  const students = studentsData || [];

  const handleAddStudent = () => {
    setCurrentStudent({});
    setIsEditing(false);
    setOpenDialog(true);
  };

  const handleEditStudent = (student: DisplayStudent) => {
    setCurrentStudent(student);
    setIsEditing(true);
    setOpenDialog(true);
  };

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      return await api.post('/students', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      setOpenDialog(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      return await api.put(`/students/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      setOpenDialog(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await api.delete(`/students/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });

  const handleSaveStudent = () => {
    if (isEditing && currentStudent.id) {
      updateMutation.mutate({
        id: currentStudent.id,
        data: {
          name: currentStudent.name,
          email: currentStudent.email,
          grade: currentStudent.grade,
          section: currentStudent.class?.split('-')[1] || 'A',
          studentId: currentStudent.id,
        },
      });
    } else {
      createMutation.mutate({
        name: currentStudent.name,
        email: currentStudent.email,
        password: 'password123',
        grade: currentStudent.grade || '10',
        section: currentStudent.class?.split('-')[1] || 'A',
        studentId: `STU${Date.now()}`,
      });
    }
  };

  const handleDeleteStudent = (id: string) => {
    deleteMutation.mutate(id);
  };

  const filteredStudents = students.filter((student: DisplayStudent) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.class.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const avgGPA = students.length > 0 ? (students.reduce((sum: number, s: DisplayStudent) => sum + s.gpa, 0) / students.length).toFixed(2) : '0.00';
  const avgAttendance = students.length > 0 ? (students.reduce((sum: number, s: DisplayStudent) => sum + s.attendance, 0) / students.length).toFixed(1) : '0.0';

  if (isLoading) {
    return <StudentsSkeleton />;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Student Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage and track student information, performance, and attendance
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Download />}
          >
            Export
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddStudent}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5568d3 0%, #6a4291 100%)',
              },
            }}
          >
            Add Student
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3, mb: 3 }}>
        <Box>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: alpha('#3b82f6', 0.1), color: '#3b82f6', width: 48, height: 48 }}>
                  <School />
                </Avatar>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Total Students
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {students.length}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: alpha('#10b981', 0.1), color: '#10b981', width: 48, height: 48 }}>
                  <TrendingUp />
                </Avatar>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Average GPA
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {avgGPA}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: alpha('#f59e0b', 0.1), color: '#f59e0b', width: 48, height: 48 }}>
                  <TrendingUp />
                </Avatar>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Avg Attendance
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {avgAttendance}%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: alpha('#8b5cf6', 0.1), color: '#8b5cf6', width: 48, height: 48 }}>
                  <School />
                </Avatar>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Active Students
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {students.filter(s => s.status === 'active').length}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          mb: 3,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
        }}
      >
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <Box sx={{ flex: 1, minWidth: { md: '50%' } }}>
            <TextField
              fullWidth
              placeholder="Search students by name, email, or class..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', minWidth: { md: '50%' } }}>
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              sx={{ borderRadius: 2 }}
            >
              Filter
            </Button>
          </Box>
        </Box>
      </Paper>

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: alpha('#667eea', 0.05) }}>
              <TableCell sx={{ fontWeight: 600 }}>Student</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Contact</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Grade</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Class</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>GPA</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Attendance</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow
                key={student.id}
                sx={{
                  '&:hover': {
                    bgcolor: alpha('#667eea', 0.02),
                  },
                }}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: `hsl(${parseInt(student.id.slice(-4), 16) % 360}, 70%, 60%)`,
                        fontWeight: 600,
                      }}
                    >
                      {student.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {student.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ID: {student.id.toString().padStart(4, '0')}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Email sx={{ fontSize: 14, color: 'text.secondary' }} />
                      <Typography variant="caption">{student.email}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Phone sx={{ fontSize: 14, color: 'text.secondary' }} />
                      <Typography variant="caption">{student.phone}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip label={`Grade ${student.grade}`} size="small" variant="outlined" />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {student.class}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {student.gpa.toFixed(1)}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={(student.gpa / 4.0) * 100}
                      sx={{
                        height: 4,
                        borderRadius: 2,
                        bgcolor: alpha('#10b981', 0.1),
                        '& .MuiLinearProgress-bar': {
                          bgcolor: '#10b981',
                        },
                      }}
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {student.attendance}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={student.attendance}
                      sx={{
                        height: 4,
                        borderRadius: 2,
                        bgcolor: alpha('#3b82f6', 0.1),
                        '& .MuiLinearProgress-bar': {
                          bgcolor: student.attendance >= 90 ? '#10b981' : student.attendance >= 75 ? '#f59e0b' : '#ef4444',
                        },
                      }}
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={student.status}
                    color={student.status === 'active' ? 'success' : 'default'}
                    size="small"
                    sx={{ textTransform: 'capitalize', fontWeight: 600 }}
                  />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="View Details">
                    <IconButton size="small" sx={{ color: '#667eea' }}>
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton size="small" sx={{ color: '#3b82f6' }} onClick={() => handleEditStudent(student)}>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton size="small" sx={{ color: '#ef4444' }} onClick={() => handleDeleteStudent(student.id)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {isEditing ? 'Edit Student' : 'Add New Student'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {isEditing ? 'Update student information' : 'Enter student details to add to the system'}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 3 }}>
              <TextField
                fullWidth
                label="Full Name"
                value={currentStudent.name || ''}
                onChange={(e) => setCurrentStudent({ ...currentStudent, name: e.target.value })}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={currentStudent.email || ''}
                onChange={(e) => setCurrentStudent({ ...currentStudent, email: e.target.value })}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                label="Phone"
                value={currentStudent.phone || ''}
                onChange={(e) => setCurrentStudent({ ...currentStudent, phone: e.target.value })}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                select
                label="Grade"
                value={currentStudent.grade || ''}
                onChange={(e) => setCurrentStudent({ ...currentStudent, grade: e.target.value })}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              >
                {['9', '10', '11', '12'].map((grade) => (
                  <MenuItem key={grade} value={grade}>
                    Grade {grade}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box>
              <TextField
                fullWidth
                label="Class"
                value={currentStudent.class || ''}
                onChange={(e) => setCurrentStudent({ ...currentStudent, class: e.target.value })}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                select
                label="Status"
                value={currentStudent.status || 'active'}
                onChange={(e) => setCurrentStudent({ ...currentStudent, status: e.target.value as 'active' | 'inactive' })}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </TextField>
            </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setOpenDialog(false)} sx={{ borderRadius: 2 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveStudent}
            sx={{
              borderRadius: 2,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            {isEditing ? 'Save Changes' : 'Add Student'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
