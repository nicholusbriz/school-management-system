import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  alpha,
  Badge,
  InputBase,
  Chip,
  Button,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  People,
  School as SchoolIcon,
  Class,
  CalendarToday,
  Assignment,
  Person,
  Logout,
  Settings,
  Notifications,
  Search,
  School,
  Home,
} from '@mui/icons-material';

const drawerWidth = 280;

interface LayoutProps {
  userRole: 'admin' | 'teacher' | 'student';
  onLogout: () => void;
}

export default function Layout({ userRole, onLogout }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };  // ✅ REMOVED extra closing brace here

  const menuItems = [
    { text: 'Dashboard', icon: Dashboard, path: '/dashboard', roles: ['admin', 'teacher', 'student'], color: '#667eea' },
    { text: 'Students', icon: People, path: '/dashboard/students', roles: ['admin', 'teacher'], color: '#3b82f6' },
    { text: 'Teachers', icon: SchoolIcon, path: '/dashboard/teachers', roles: ['admin'], color: '#8b5cf6' },
    { text: 'Classes', icon: Class, path: '/dashboard/classes', roles: ['admin', 'teacher'], color: '#10b981' },
    { text: 'Attendance', icon: CalendarToday, path: '/dashboard/attendance', roles: ['admin', 'teacher'], color: '#f59e0b' },
    { text: 'Grades', icon: Assignment, path: '/dashboard/grades', roles: ['admin', 'teacher', 'student'], color: '#ef4444' },
  ].filter(item => item.roles.includes(userRole));

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          p: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Avatar
            sx={{
              width: 48,
              height: 48,
              bgcolor: alpha('#ffffff', 0.2),
            }}
          >
            <School />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              EduPro
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              Management System
            </Typography>
          </Box>
        </Box>
        <Chip
          label={userRole.toUpperCase()}
          size="small"
          sx={{
            bgcolor: alpha('#ffffff', 0.25),
            color: 'white',
            fontWeight: 600,
            fontSize: '0.7rem',
          }}
        />
      </Box>

      <List sx={{ flexGrow: 1, px: 2, py: 3 }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isSelected = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={isSelected}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  '&.Mui-selected': {
                    bgcolor: alpha(item.color, 0.12),
                    color: item.color,
                    '&:hover': {
                      bgcolor: alpha(item.color, 0.18),
                    },
                    '& .MuiListItemIcon-root': {
                      color: item.color,
                    },
                  },
                  '&:hover': {
                    bgcolor: alpha(item.color, 0.08),
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Icon />
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: isSelected ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider />
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
            border: '1px solid',
            borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Academic Year
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            2025 - 2026
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: 'background.paper',
          color: 'text.primary',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar sx={{ gap: 2 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              bgcolor: (theme) => alpha(theme.palette.text.primary, 0.04),
              borderRadius: 2,
              px: 2,
              py: 0.5,
              maxWidth: 400,
            }}
          >
            <Search sx={{ color: 'text.secondary', mr: 1 }} />
            <InputBase
              placeholder="Search..."
              sx={{ flex: 1 }}
            />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'block', md: 'none' } }} />

          <Button
            component={Link}
            to="/"
            startIcon={<Home />}
            sx={{
              mr: 2,
              textTransform: 'none',
              fontWeight: 600,
              color: 'text.primary',
              '&:hover': {
                bgcolor: (theme: any) => alpha(theme.palette.text.primary, 0.04),
              },
            }}
          >
            Home
          </Button>

          <IconButton
            color="inherit"
            sx={{
              bgcolor: (theme) => alpha(theme.palette.text.primary, 0.04),
              '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.text.primary, 0.08),
              },
            }}
          >
            <Badge badgeContent={4} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            sx={{
              p: 0.5,
              bgcolor: (theme) => alpha(theme.palette.text.primary, 0.04),
              '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.text.primary, 0.08),
              },
            }}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                fontWeight: 600,
              }}
            >
              {userRole.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{
              mt: 1,
              '& .MuiPaper-root': {
                borderRadius: 2,
                minWidth: 200,
              },
            }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {userRole}@edupro.edu
              </Typography>
            </Box>
            <Divider />
            <MenuItem onClick={handleClose} sx={{ py: 1.5 }}>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={handleClose} sx={{ py: 1.5 }}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={onLogout} sx={{ py: 1.5, color: 'error.main' }}>
              <ListItemIcon>
                <Logout fontSize="small" color="error" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              border: 'none',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              border: 'none',
              borderRight: '1px solid',
              borderColor: 'divider',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 4 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
          overflow: 'auto',
          bgcolor: (theme) =>
            theme.palette.mode === 'light'
              ? alpha('#f8f9fa', 0.5)
              : 'background.default',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}