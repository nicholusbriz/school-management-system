import { useQuery } from '@tanstack/react-query';
import {
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  alpha,
  Avatar,
  Divider,
  IconButton,
} from '@mui/material';
import {
  People,
  School,
  Class,
  TrendingUp,
  ArrowUpward,
  ArrowDownward,
  MoreVert,
  PersonAdd,
  AssignmentTurnedIn,
  Event,
  CheckCircle,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import api from '@/services/api';
import DashboardSkeleton from '@/skeletons/DashboardSkeleton';

interface DashboardProps {
  userRole: 'admin' | 'teacher' | 'student';
}

export default function Dashboard({ userRole }: DashboardProps) {
  const statsQuery = useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: async () => {
      const response = await api.get('/dashboard/stats');
      return response.data.data;
    },
  });

  const attendanceQuery = useQuery({
    queryKey: ['dashboard', 'attendance'],
    queryFn: async () => {
      const response = await api.get('/dashboard/attendance');
      return response.data.data;
    },
  });

  const gradesQuery = useQuery({
    queryKey: ['dashboard', 'grades'],
    queryFn: async () => {
      const response = await api.get('/dashboard/grades');
      return response.data.data;
    },
  });

  const performanceQuery = useQuery({
    queryKey: ['dashboard', 'performance'],
    queryFn: async () => {
      const response = await api.get('/dashboard/performance');
      return response.data.data;
    },
  });

  const loading = statsQuery.isLoading || attendanceQuery.isLoading || gradesQuery.isLoading || performanceQuery.isLoading;
  const stats = statsQuery.data;
  const attendanceData = attendanceQuery.data || [];
  const gradeDistribution = gradesQuery.data || [];
  const performanceData = performanceQuery.data || [];

  const statsArray = stats ? [
    { title: 'Total Students', value: stats.totalStudents.toLocaleString(), icon: People, color: '#3b82f6', change: '+12%', trend: 'up', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { title: 'Total Teachers', value: stats.totalTeachers.toLocaleString(), icon: School, color: '#8b5cf6', change: '+5%', trend: 'up', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { title: 'Total Classes', value: stats.totalClasses.toLocaleString(), icon: Class, color: '#10b981', change: '+3%', trend: 'up', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { title: 'Attendance Rate', value: `${stats.attendanceRate}%`, icon: TrendingUp, color: '#f59e0b', change: '+2.1%', trend: 'up', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  ] : [];

  if (loading) {
    return <DashboardSkeleton />;
  }

  const recentActivities = [
    { text: 'New student enrolled: John Smith', time: '2 hours ago', type: 'success', icon: PersonAdd },
    { text: 'Grade submitted for Math 101', time: '3 hours ago', type: 'info', icon: AssignmentTurnedIn },
    { text: 'Parent-teacher meeting scheduled', time: '5 hours ago', type: 'warning', icon: Event },
    { text: 'Attendance report generated', time: '1 day ago', type: 'default', icon: CheckCircle },
    { text: 'New assignment posted: Physics Lab', time: '1 day ago', type: 'info', icon: AssignmentTurnedIn },
  ];

  const upcomingEvents = [
    { title: 'Math Midterm Exam', date: 'May 25, 2026', class: '10-A', color: '#3b82f6' },
    { title: 'Science Fair', date: 'May 28, 2026', class: 'All Classes', color: '#10b981' },
    { title: 'Parent Meeting', date: 'May 30, 2026', class: '11-B', color: '#f59e0b' },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          {userRole === 'admin' ? 'Admin Dashboard' : userRole === 'teacher' ? 'Teacher Dashboard' : 'Student Dashboard'}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back! Here's what's happening in your school today.
        </Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 3, mb: 3 }}>
        {statsArray.map((stat) => {
          const Icon = stat.icon;
          return (
            <Box key={stat.title}>
              <Card
                sx={{
                  position: 'relative',
                  overflow: 'visible',
                  background: stat.gradient,
                  color: 'white',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.3s ease',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                    <Box>
                      <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                        {stat.title}
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {stat.value}
                      </Typography>
                    </Box>
                    <Avatar
                      sx={{
                        bgcolor: alpha('#ffffff', 0.25),
                        width: 56,
                        height: 56,
                      }}
                    >
                      <Icon sx={{ fontSize: 28 }} />
                    </Avatar>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {stat.trend === 'up' ? (
                      <ArrowUpward sx={{ fontSize: 16 }} />
                    ) : (
                      <ArrowDownward sx={{ fontSize: 16 }} />
                    )}
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {stat.change}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8, ml: 0.5 }}>
                      from last month
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          );
        })}

      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3, mb: 3 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              height: '100%',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Weekly Attendance Overview
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Track student attendance patterns
                </Typography>
              </Box>
              <IconButton size="small">
                <MoreVert />
              </IconButton>
            </Box>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={attendanceData}>
                <defs>
                  <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorAbsent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={alpha('#000', 0.1)} />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: 8,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="present"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorPresent)"
                  name="Present"
                />
                <Area
                  type="monotone"
                  dataKey="absent"
                  stroke="#ef4444"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorAbsent)"
                  name="Absent"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              height: '100%',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Grade Distribution
            </Typography>
            <Box sx={{ mb: 3 }}>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={gradeDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {gradeDistribution.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {gradeDistribution.map((grade: any) => (
                <Box key={grade.name} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: grade.color,
                      flexShrink: 0,
                    }}
                  />
                  <Typography variant="body2" sx={{ flex: 1 }}>
                    Grade {grade.name}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {grade.value}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    ({grade.percentage}%)
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>

      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 3, mb: 3 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Performance Trends
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke={alpha('#000', 0.1)} />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: 8,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#667eea"
                  strokeWidth={3}
                  dot={{ r: 6, fill: '#667eea' }}
                  activeDot={{ r: 8 }}
                  name="Actual Score"
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Target"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              height: '100%',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Upcoming Events
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {upcomingEvents.map((event, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    '&:hover': {
                      bgcolor: alpha(event.color, 0.05),
                      borderColor: alpha(event.color, 0.3),
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 4,
                      height: 40,
                      borderRadius: 2,
                      bgcolor: event.color,
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {event.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {event.class}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {event.date}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>

      </Box>

      <Box>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Recent Activities
            </Typography>
            <List sx={{ p: 0 }}>
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <Box key={index}>
                    <ListItem sx={{ px: 0, py: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor:
                            activity.type === 'success'
                              ? alpha('#10b981', 0.1)
                              : activity.type === 'warning'
                              ? alpha('#f59e0b', 0.1)
                              : alpha('#3b82f6', 0.1),
                          color:
                            activity.type === 'success'
                              ? '#10b981'
                              : activity.type === 'warning'
                              ? '#f59e0b'
                              : '#3b82f6',
                          mr: 2,
                        }}
                      >
                        <Icon />
                      </Avatar>
                      <ListItemText
                        primary={activity.text}
                        secondary={activity.time}
                        primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                        secondaryTypographyProps={{ variant: 'caption' }}
                      />
                    </ListItem>
                    {index < recentActivities.length - 1 && <Divider />}
                  </Box>
                );
              })}
            </List>
          </Paper>
        </Box>
    </Box>
  );
}
