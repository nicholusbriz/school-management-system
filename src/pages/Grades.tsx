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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Chip,
  LinearProgress,
  Card,
  CardContent,
  alpha,
  Avatar,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Add,
  Edit,
  TrendingUp,
  Assessment,
  Download,
  StarBorder,
  Star,
  EmojiEvents,
} from '@mui/icons-material';

interface Grade {
  id: number;
  studentName: string;
  assignment: string;
  score: number;
  maxScore: number;
  grade: string;
  submittedDate: string;
}

export default function Grades() {
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentGrade, setCurrentGrade] = useState<Partial<Grade>>({});
  const [grades, setGrades] = useState<Grade[]>([
    { id: 1, studentName: 'Alice Johnson', assignment: 'Midterm Exam', score: 92, maxScore: 100, grade: 'A', submittedDate: '2026-05-10' },
    { id: 2, studentName: 'Bob Smith', assignment: 'Midterm Exam', score: 85, maxScore: 100, grade: 'B', submittedDate: '2026-05-10' },
    { id: 3, studentName: 'Carol Williams', assignment: 'Midterm Exam', score: 95, maxScore: 100, grade: 'A', submittedDate: '2026-05-10' },
    { id: 4, studentName: 'David Brown', assignment: 'Midterm Exam', score: 78, maxScore: 100, grade: 'C', submittedDate: '2026-05-10' },
    { id: 5, studentName: 'Emma Davis', assignment: 'Midterm Exam', score: 98, maxScore: 100, grade: 'A', submittedDate: '2026-05-10' },
    { id: 6, studentName: 'Frank Miller', assignment: 'Midterm Exam', score: 88, maxScore: 100, grade: 'B', submittedDate: '2026-05-10' },
  ]);

  const handleAddGrade = () => {
    setCurrentGrade({ maxScore: 100 });
    setOpenDialog(true);
  };

  const handleSaveGrade = () => {
    const score = currentGrade.score || 0;
    const maxScore = currentGrade.maxScore || 100;
    const percentage = (score / maxScore) * 100;
    let grade = 'F';
    if (percentage >= 90) grade = 'A';
    else if (percentage >= 80) grade = 'B';
    else if (percentage >= 70) grade = 'C';
    else if (percentage >= 60) grade = 'D';

    const newGrade = {
      ...currentGrade,
      id: Math.max(...grades.map(g => g.id)) + 1,
      grade,
      submittedDate: new Date().toISOString().split('T')[0],
    } as Grade;

    setGrades([...grades, newGrade]);
    setOpenDialog(false);
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return '#10b981';
      case 'B': return '#3b82f6';
      case 'C': return '#f59e0b';
      case 'D': return '#ef4444';
      default: return '#991b1b';
    }
  };

  const getGradeBgColor = (grade: string) => {
    return alpha(getGradeColor(grade), 0.1);
  };

  const averageScore = grades.reduce((sum, g) => sum + (g.score / g.maxScore) * 100, 0) / grades.length;
  const passRate = (grades.filter(g => g.grade !== 'F').length / grades.length) * 100;
  const topPerformers = grades.filter(g => g.grade === 'A').length;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Grades & Assessments
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Track and manage student academic performance
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Download />}
            sx={{ borderRadius: 2 }}
          >
            Export
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddGrade}
            sx={{
              borderRadius: 2,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            Add Grade
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              color: 'white',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.9, mb: 1, display: 'block' }}>
                    Class Average
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>
                    {averageScore.toFixed(1)}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={averageScore}
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
                  <Assessment sx={{ fontSize: 32 }} />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.9, mb: 1, display: 'block' }}>
                    Pass Rate
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>
                    {passRate.toFixed(1)}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={passRate}
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
                  <TrendingUp sx={{ fontSize: 32 }} />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: 'white',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.9, mb: 1, display: 'block' }}>
                    Top Performers (A)
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>
                    {topPerformers}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8, mt: 2 }}>
                    {((topPerformers / grades.length) * 100).toFixed(0)}% of class
                  </Typography>
                </Box>
                <Avatar sx={{ width: 64, height: 64, bgcolor: alpha('#ffffff', 0.25) }}>
                  <EmojiEvents sx={{ fontSize: 32 }} />
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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Class</InputLabel>
              <Select
                value={selectedClass}
                label="Class"
                onChange={(e) => setSelectedClass(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="10-A">Class 10-A</MenuItem>
                <MenuItem value="10-B">Class 10-B</MenuItem>
                <MenuItem value="11-A">Class 11-A</MenuItem>
                <MenuItem value="12-A">Class 12-A</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Subject</InputLabel>
              <Select
                value={selectedSubject}
                label="Subject"
                onChange={(e) => setSelectedSubject(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="Mathematics">Mathematics</MenuItem>
                <MenuItem value="Physics">Physics</MenuItem>
                <MenuItem value="Chemistry">Chemistry</MenuItem>
                <MenuItem value="English">English</MenuItem>
              </Select>
            </FormControl>
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
              <TableCell sx={{ fontWeight: 600 }}>Student</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Assignment</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Score</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Performance</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Grade</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Submitted</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {grades.map((grade) => {
              const percentage = (grade.score / grade.maxScore) * 100;
              return (
                <TableRow
                  key={grade.id}
                  sx={{
                    '&:hover': {
                      bgcolor: alpha('#667eea', 0.02),
                    },
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: `hsl(${grade.id * 45}, 70%, 60%)` }}>
                        {grade.studentName.charAt(0)}
                      </Avatar>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {grade.studentName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{grade.assignment}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {grade.score}/{grade.maxScore}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 200 }}>
                      <LinearProgress
                        variant="determinate"
                        value={percentage}
                        sx={{
                          flexGrow: 1,
                          height: 8,
                          borderRadius: 4,
                          bgcolor: getGradeBgColor(grade.grade),
                          '& .MuiLinearProgress-bar': {
                            bgcolor: getGradeColor(grade.grade),
                          },
                        }}
                      />
                      <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 40 }}>
                        {percentage.toFixed(0)}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={grade.grade}
                      sx={{
                        bgcolor: getGradeBgColor(grade.grade),
                        color: getGradeColor(grade.grade),
                        fontWeight: 700,
                        fontSize: '0.875rem',
                        minWidth: 40,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" color="text.secondary">
                      {grade.submittedDate}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Grade">
                      <IconButton size="small" sx={{ color: '#3b82f6' }}>
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={grade.grade === 'A' ? 'Top Performer' : 'Good Work'}>
                      <IconButton size="small" sx={{ color: '#f59e0b' }}>
                        {grade.grade === 'A' ? <Star fontSize="small" /> : <StarBorder fontSize="small" />}
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 },
        }}
      >
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Add New Grade
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Enter assignment details and score
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Student Name"
                value={currentGrade.studentName || ''}
                onChange={(e) => setCurrentGrade({ ...currentGrade, studentName: e.target.value })}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Assignment"
                value={currentGrade.assignment || ''}
                onChange={(e) => setCurrentGrade({ ...currentGrade, assignment: e.target.value })}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="number"
                label="Score"
                value={currentGrade.score || ''}
                onChange={(e) => setCurrentGrade({ ...currentGrade, score: parseFloat(e.target.value) })}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="number"
                label="Max Score"
                value={currentGrade.maxScore || 100}
                onChange={(e) => setCurrentGrade({ ...currentGrade, maxScore: parseFloat(e.target.value) })}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setOpenDialog(false)} sx={{ borderRadius: 2 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveGrade}
            sx={{
              borderRadius: 2,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            Add Grade
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
