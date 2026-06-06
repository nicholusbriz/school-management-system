import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Avatar,
  AvatarGroup,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  People,
  Schedule,
} from '@mui/icons-material';

interface ClassRoom {
  id: number;
  name: string;
  subject: string;
  teacher: string;
  students: number;
  schedule: string;
  room: string;
  semester: string;
}

export default function Classes() {
  const [classes, setClasses] = useState<ClassRoom[]>([
    { id: 1, name: 'Math 101', subject: 'Mathematics', teacher: 'Dr. Sarah Miller', students: 32, schedule: 'Mon, Wed, Fri 9:00 AM', room: 'A-101', semester: 'Spring 2026' },
    { id: 2, name: 'Physics 201', subject: 'Physics', teacher: 'Prof. James Wilson', students: 28, schedule: 'Tue, Thu 10:30 AM', room: 'B-203', semester: 'Spring 2026' },
    { id: 3, name: 'English Literature', subject: 'English', teacher: 'Ms. Emily Chen', students: 30, schedule: 'Mon, Wed, Fri 2:00 PM', room: 'C-105', semester: 'Spring 2026' },
    { id: 4, name: 'World History', subject: 'History', teacher: 'Mr. Robert Taylor', students: 25, schedule: 'Tue, Thu 1:00 PM', room: 'A-202', semester: 'Spring 2026' },
    { id: 5, name: 'Chemistry Lab', subject: 'Chemistry', teacher: 'Dr. Lisa Anderson', students: 20, schedule: 'Wed 3:00 PM', room: 'Lab-1', semester: 'Spring 2026' },
    { id: 6, name: 'Advanced Calculus', subject: 'Mathematics', teacher: 'Dr. Sarah Miller', students: 18, schedule: 'Tue, Thu 9:00 AM', room: 'A-101', semester: 'Spring 2026' },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [currentClass, setCurrentClass] = useState<Partial<ClassRoom>>({});
  const [isEditing, setIsEditing] = useState(false);

  const handleAddClass = () => {
    setCurrentClass({});
    setIsEditing(false);
    setOpenDialog(true);
  };

  const handleEditClass = (classRoom: ClassRoom) => {
    setCurrentClass(classRoom);
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleSaveClass = () => {
    if (isEditing) {
      setClasses(classes.map(c => c.id === currentClass.id ? currentClass as ClassRoom : c));
    } else {
      const newClass = {
        ...currentClass,
        id: Math.max(...classes.map(c => c.id)) + 1,
        students: 0,
      } as ClassRoom;
      setClasses([...classes, newClass]);
    }
    setOpenDialog(false);
  };

  const handleDeleteClass = (id: number) => {
    setClasses(classes.filter(c => c.id !== id));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Classes</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddClass}
        >
          Add Class
        </Button>
      </Box>

      <Grid container spacing={3}>
        {classes.map((classRoom) => (
          <Grid item xs={12} sm={6} md={4} key={classRoom.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6">{classRoom.name}</Typography>
                  <Chip label={classRoom.subject} size="small" color="primary" />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Teacher: {classRoom.teacher}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <People sx={{ fontSize: 18, color: 'text.secondary' }} />
                    <Typography variant="body2">{classRoom.students} students</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Schedule sx={{ fontSize: 18, color: 'text.secondary' }} />
                    <Typography variant="body2">{classRoom.schedule}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Room: {classRoom.room}
                  </Typography>
                  <Chip label={classRoom.semester} size="small" sx={{ mt: 1 }} />
                </Box>

                <AvatarGroup max={4} sx={{ justifyContent: 'flex-start' }}>
                  {[1, 2, 3, 4].map((i) => (
                    <Avatar key={i} sx={{ width: 32, height: 32 }}>
                      {String.fromCharCode(65 + i)}
                    </Avatar>
                  ))}
                </AvatarGroup>
              </CardContent>
              <CardActions>
                <Button size="small" startIcon={<Edit />} onClick={() => handleEditClass(classRoom)}>
                  Edit
                </Button>
                <Button size="small" color="error" startIcon={<Delete />} onClick={() => handleDeleteClass(classRoom.id)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{isEditing ? 'Edit Class' : 'Add New Class'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Class Name"
                value={currentClass.name || ''}
                onChange={(e) => setCurrentClass({ ...currentClass, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Subject"
                value={currentClass.subject || ''}
                onChange={(e) => setCurrentClass({ ...currentClass, subject: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Teacher"
                value={currentClass.teacher || ''}
                onChange={(e) => setCurrentClass({ ...currentClass, teacher: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Room"
                value={currentClass.room || ''}
                onChange={(e) => setCurrentClass({ ...currentClass, room: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Schedule"
                value={currentClass.schedule || ''}
                onChange={(e) => setCurrentClass({ ...currentClass, schedule: e.target.value })}
                placeholder="Mon, Wed, Fri 9:00 AM"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Semester"
                value={currentClass.semester || ''}
                onChange={(e) => setCurrentClass({ ...currentClass, semester: e.target.value })}
              >
                <MenuItem value="Spring 2026">Spring 2026</MenuItem>
                <MenuItem value="Fall 2026">Fall 2026</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveClass}>
            {isEditing ? 'Save Changes' : 'Add Class'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
