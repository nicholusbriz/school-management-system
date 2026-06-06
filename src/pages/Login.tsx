import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Container,
  alpha,
  Fade,
  CircularProgress,
  Alert,
} from '@mui/material';
import { School, ArrowForward, Home } from '@mui/icons-material';
import api from '@/services/api';
import { useAuthStore } from '@/stores/authStore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const loginMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await api.post<{ success: boolean; data: { token: string; role: string; name: string; email: string } }>('/auth/login', { email });
      return response.data.data;
    },
    onSuccess: (data) => {
      setAuth(
        { id: '', email: data.email, name: data.name, role: data.role as 'admin' | 'teacher' | 'student' },
        data.token
      );
      navigate('/dashboard');
    },
    onError: (err: Error) => {
      setError(err.message || 'Login failed');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    loginMutation.mutate(email);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                           radial-gradient(circle at 80% 80%, white 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <Container maxWidth="sm">
        <Fade in timeout={800}>
          <Box>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <School sx={{ fontSize: 72, color: 'white', mb: 2, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }} />
              <Typography variant="h3" sx={{ color: 'white', fontWeight: 700, mb: 1 }}>
                EduPro
              </Typography>
              <Typography variant="h6" sx={{ color: alpha('#ffffff', 0.9) }}>
                School Management System
              </Typography>
            </Box>

            <Card
              sx={{
                backdropFilter: 'blur(20px)',
                background: alpha('#ffffff', 0.95),
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              }}
            >
              <CardContent sx={{ p: 5 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                  Sign In
                </Typography>

                {error && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </Alert>
                )}

                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    endIcon={loginMutation.isPending ? <CircularProgress size={20} color="inherit" /> : <ArrowForward />}
                    disabled={loginMutation.isPending}
                    sx={{
                      mt: 3,
                      py: 1.5,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                      '&:hover': {
                        boxShadow: '0 12px 32px rgba(102, 126, 234, 0.5)',
                      },
                    }}
                  >
                    {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
                  </Button>

                  <Button
                    fullWidth
                    variant="text"
                    size="large"
                    onClick={handleGoHome}
                    startIcon={<Home />}
                    sx={{
                      mt: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      color: 'text.secondary',
                      '&:hover': {
                        bgcolor: (theme) => alpha(theme.palette.text.secondary, 0.04),
                      },
                    }}
                  >
                    Go to Home
                  </Button>

                  <Box
                    sx={{
                      mt: 3,
                      p: 2,
                      borderRadius: 2,
                      bgcolor: (theme) => alpha(theme.palette.info.main, 0.1),
                      border: '1px solid',
                      borderColor: (theme) => alpha(theme.palette.info.main, 0.2),
                    }}
                  >
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center' }}>
                      Enter your email to sign in. Your role will be determined automatically.
                    </Typography>
                  </Box>
                </form>
              </CardContent>
            </Card>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}
