import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  alpha,
  Avatar,
  LinearProgress,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  Save,
  Today,
  CalendarMonth,
  Download,
  Print,
  Refresh,
} from '@mui/icons-material';
import { format } from 'date-fns';

interface AttendanceRecord {
  studentId: number;
  studentName: string;
  present: boolean;
}

export default function Attendance() {
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([
    { studentId: 1, studentName: 'Alice Johnson', present: true },
    { studentId: 2, studentName: 'Bob Smith', present: true },
    { studentId: 3, studentName: 'Carol Williams', present: false },
    { studentId: 4, studentName: 'David Brown', present: true },
    { studentId: 5, studentName: 'Emma Davis', present: true },
    { studentId: 6, studentName: 'Frank Miller', present: false },
    { studentId: 7, studentName: 'Grace Lee', present: true },
    { studentId: 8, studentName: 'Henry Zhang', present: true },
  ]);

  const handleToggleAttendance = (studentId: number) => {
    setAttendance(attendance.map(record =>
      record.studentId === studentId
        ? { ...record, present: !record.present }
        : record
    ));
  };

  const handleMarkAll = (present: boolean) => {
    setAttendance(attendance.map(record => ({ ...record, present })));
  };

  const presentCount = attendance.filter(r => r.present).length;
  const absentCount = attendance.length - presentCount;
  const attendanceRate = ((presentCount / attendance.length) * 100).toFixed(1);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Attendance Tracking
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Mark and manage daily student attendance
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Tooltip title="Export Report">
            <IconButton sx={{ bgcolor: alpha('#667eea', 0.1) }}>
              <Download />
            </IconButton>
          </Tooltip>
          <Tooltip title="Print">
            <IconButton sx={{ bgcolor: alpha('#667eea', 0.1) }}>
              <Print />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              borderRadius: 3,
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.9, mb: 1, display: 'block' }}>
                    Present Today
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>
                    {presentCount}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                    students
                  </Typography>
                </Box>
                <Avatar sx={{ width: 64, height: 64, bgcolor: alpha('#ffffff', 0.25) }}>
                  <CheckCircle sx={{ fontSize: 36 }} />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              color: 'white',
              borderRadius: 3,
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.9, mb: 1, display: 'block' }}>
                    Absent Today
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>
                    {absentCount}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                    students
                  </Typography>
                </Box>
                <Avatar sx={{ width: 64, height: 64, bgcolor: alpha('#ffffff', 0.25) }}>
                  <Cancel sx={{ fontSize: 36 }} />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: 3,
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.9, mb: 1, display: 'block' }}>
                    Attendance Rate
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>
                    {attendanceRate}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={parseFloat(attendanceRate)}
                    sx={{
                      mt: 2,
                      height: 6,
                      borderRadius: 3,
                      bgcolor: alpha('#ffffff', 0.25),
                      '& .MuiLinearProgress-bar': {
                        bgcolor: 'white',
                      },
                    }}
                  />
                </Box>
                <Avatar sx={{ width: 64, height: 64, bgcolor: alpha('#ffffff', 0.25) }}>
                  <Today sx={{ fontSize: 36 }} />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Class</InputLabel>
              <Select
                value={selectedClass}
                label="Class"
                onChange={(e) => setSelectedClass(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              >
                <MenuItem value="10-A">Class 10-A</MenuItem>
                <MenuItem value="10-B">Class 10-B</MenuItem>
                <MenuItem value="11-A">Class 11-A</MenuItem>
                <MenuItem value="12-A">Class 12-A</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                p: 2,
                borderRadius: 2,
                bgcolor: alpha('#667eea', 0.05),
                border: '1px solid',
                borderColor: alpha('#667eea', 0.2),
              }}
            >
              <CalendarMonth sx={{ color: '#667eea' }} />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Date
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {format(selectedDate, 'MMMM dd, yyyy')}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleMarkAll(true)}
              sx={{ borderRadius: 2 }}
            >
              Mark All Present
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="error"
              onClick={() => handleMarkAll(false)}
              sx={{ borderRadius: 2 }}
            >
              Mark All Absent
            </Button>
          </Grid>
        </Grid>
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
              <TableCell sx={{ fontWeight: 600 }}>Student ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Student Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Mark Attendance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendance.map((record) => (
              <TableRow
                key={record.studentId}
                sx={{
                  '&:hover': {
                    bgcolor: alpha('#667eea', 0.02),
                  },
                }}
              >
                <TableCell>
                  <Chip
                    label={record.studentId.toString().padStart(4, '0')}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: `hsl(${record.studentId * 45}, 70%, 60%)` }}>
                      {record.studentName.charAt(0)}
                    </Avatar>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {record.studentName}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={record.present ? 'Present' : 'Absent'}
                    color={record.present ? 'success' : 'error'}
                    size="small"
                    icon={record.present ? <CheckCircle /> : <Cancel />}
                    sx={{ fontWeight: 600 }}
                  />
                </TableCell>
                <TableCell align="right">
                  <Checkbox
                    checked={record.present}
                    onChange={() => handleToggleAttendance(record.studentId)}
                    color="success"
                    sx={{
                      '&.Mui-checked': {
                        color: '#10b981',
                      },
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          sx={{ borderRadius: 2 }}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          startIcon={<Save />}
          size="large"
          sx={{
            borderRadius: 2,
            px: 4,
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
            },
          }}
        >
          Save Attendance
        </Button>
      </Box>
    </Box>
  );
}
