import { useNavigate } from 'react-router';
import {
  Box,
  Button,
  Container,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Card,
  CardContent,
  alpha,
  Divider,
  Link as MuiLink,
  Grid,
} from '@mui/material';
import {
  School,
  ArrowForward,
  Dashboard as DashboardIcon,
  People,
  Assignment,
  TrendingUp,
  Security,
  Speed,
  Support,
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
} from '@mui/icons-material';
import { useAuthStore } from '@/stores/authStore';

export default function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      {/* Header/Navigation */}
      <AppBar
        position="fixed"
        sx={{
          bgcolor: 'white',
          boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
          py: 1,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <School sx={{ fontSize: 24, color: 'white' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                EduPro
              </Typography>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4, alignItems: 'center' }}>
              <MuiLink
                component="button"
                onClick={() => scrollToSection('features')}
                sx={{ color: 'text.secondary', textDecoration: 'none', fontWeight: 500, '&:hover': { color: 'primary.main' } }}
              >
                Features
              </MuiLink>
              <MuiLink
                component="button"
                onClick={() => scrollToSection('about')}
                sx={{ color: 'text.secondary', textDecoration: 'none', fontWeight: 500, '&:hover': { color: 'primary.main' } }}
              >
                About
              </MuiLink>
              <MuiLink
                component="button"
                onClick={() => scrollToSection('testimonials')}
                sx={{ color: 'text.secondary', textDecoration: 'none', fontWeight: 500, '&:hover': { color: 'primary.main' } }}
              >
                Testimonials
              </MuiLink>
              <MuiLink
                component="button"
                onClick={() => scrollToSection('contact')}
                sx={{ color: 'text.secondary', textDecoration: 'none', fontWeight: 500, '&:hover': { color: 'primary.main' } }}
              >
                Contact
              </MuiLink>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {isAuthenticated ? (
                <Button
                  variant="contained"
                  onClick={handleGoToDashboard}
                  endIcon={<DashboardIcon />}
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 3,
                    borderRadius: 2,
                  }}
                >
                  Dashboard
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleLogin}
                  endIcon={<ArrowForward />}
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 3,
                    borderRadius: 2,
                  }}
                >
                  Login
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Box
        id="hero"
        sx={{
          pt: 20,
          pb: 15,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: alpha('#ffffff', 0.05),
            top: '-200px',
            right: '-200px',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: alpha('#ffffff', 0.03),
            bottom: '-100px',
            left: '-100px',
          }}
        />

        <Container maxWidth="xl">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
            <Box>
              <Typography
                variant="h2"
                sx={{
                  color: 'white',
                  fontWeight: 800,
                  mb: 3,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                }}
              >
                Transform Your School Management
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: alpha('#ffffff', 0.9),
                  mb: 4,
                  fontWeight: 400,
                  lineHeight: 1.8,
                }}
              >
                Streamline your educational institution with our comprehensive, user-friendly platform. 
                Manage students, teachers, classes, attendance, and grades all in one place.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {isAuthenticated ? (
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleGoToDashboard}
                    endIcon={<DashboardIcon />}
                    sx={{
                      px: 4,
                      py: 2,
                      borderRadius: 2,
                      background: 'white',
                      color: '#667eea',
                      fontWeight: 700,
                      textTransform: 'none',
                      fontSize: '1.1rem',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                      '&:hover': {
                        background: alpha('#ffffff', 0.9),
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Go to Dashboard
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleLogin}
                    endIcon={<ArrowForward />}
                    sx={{
                      px: 4,
                      py: 2,
                      borderRadius: 2,
                      background: 'white',
                      color: '#667eea',
                      fontWeight: 700,
                      textTransform: 'none',
                      fontSize: '1.1rem',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                      '&:hover': {
                        background: alpha('#ffffff', 0.9),
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Get Started Free
                  </Button>
                )}
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => scrollToSection('features')}
                  sx={{
                    px: 4,
                    py: 2,
                    borderRadius: 2,
                    borderColor: 'white',
                    color: 'white',
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    '&:hover': {
                      background: alpha('#ffffff', 0.1),
                      borderColor: 'white',
                    },
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box
                sx={{
                  position: 'relative',
                  height: 400,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Card
                  sx={{
                    width: '100%',
                    maxWidth: 500,
                    height: 350,
                    borderRadius: 4,
                    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                    background: alpha('#ffffff', 0.1),
                    backdropFilter: 'blur(20px)',
                    border: '1px solid',
                    borderColor: alpha('#ffffff', 0.2),
                  }}
                >
                  <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                      <Box sx={{ width: 60, height: 60, borderRadius: 2, bgcolor: alpha('#ffffff', 0.2) }} />
                      <Box sx={{ width: 60, height: 60, borderRadius: 2, bgcolor: alpha('#ffffff', 0.2) }} />
                    </Box>
                    <Box sx={{ height: 20, width: '70%', bgcolor: alpha('#ffffff', 0.2), borderRadius: 1, mb: 2 }} />
                    <Box sx={{ height: 20, width: '50%', bgcolor: alpha('#ffffff', 0.2), borderRadius: 1, mb: 3 }} />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Box sx={{ flex: 1, height: 80, bgcolor: alpha('#ffffff', 0.2), borderRadius: 2 }} />
                      <Box sx={{ flex: 1, height: 80, bgcolor: alpha('#ffffff', 0.2), borderRadius: 2 }} />
                      <Box sx={{ flex: 1, height: 80, bgcolor: alpha('#ffffff', 0.2), borderRadius: 2 }} />
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box id="features" sx={{ py: 15, bgcolor: 'background.paper' }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 3, color: 'text.primary' }}>
              Powerful Features
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
              Everything you need to manage your educational institution efficiently
            </Typography>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
            {[
              {
                icon: <People sx={{ fontSize: 40 }} />,
                title: 'Student Management',
                description: 'Comprehensive student profiles, enrollment tracking, and academic records management.',
              },
              {
                icon: <Assignment sx={{ fontSize: 40 }} />,
                title: 'Grade Tracking',
                description: 'Easy grade entry, automatic GPA calculation, and detailed performance analytics.',
              },
              {
                icon: <TrendingUp sx={{ fontSize: 40 }} />,
                title: 'Attendance System',
                description: 'Digital attendance tracking with automated reports and parent notifications.',
              },
              {
                icon: <Security sx={{ fontSize: 40 }} />,
                title: 'Secure Platform',
                description: 'Enterprise-grade security with role-based access control and data encryption.',
              },
              {
                icon: <Speed sx={{ fontSize: 40 }} />,
                title: 'Fast Performance',
                description: 'Lightning-fast response times with optimized database queries and caching.',
              },
              {
                icon: <Support sx={{ fontSize: 40 }} />,
                title: '24/7 Support',
                description: 'Round-the-clock technical support and comprehensive documentation.',
              },
            ].map((feature, index) => (
              <Box key={index}>
                <Card
                  sx={{
                    height: '100%',
                    p: 4,
                    borderRadius: 3,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                      }}
                    >
                      <Box sx={{ color: 'white' }}>{feature.icon}</Box>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* About Section */}
      <Box id="about" sx={{ py: 15, bgcolor: 'background.default' }}>
        <Container maxWidth="xl">
          <Grid container spacing={8} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 4, color: 'text.primary' }}>
                Why Choose EduPro?
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 4 }}>
                EduPro is designed by educators, for educators. We understand the challenges of managing 
                a modern educational institution and have built a solution that addresses every aspect 
                of school administration.
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {[
                  'Trusted by 500+ educational institutions worldwide',
                  '99.9% uptime guarantee',
                  'Comprehensive training and onboarding',
                  'Regular updates and new features',
                ].map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      }}
                    />
                    <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 3,
                }}
              >
                {[
                  { label: 'Students', value: '50K+' },
                  { label: 'Teachers', value: '5K+' },
                  { label: 'Schools', value: '500+' },
                  { label: 'Countries', value: '40+' },
                ].map((stat, index) => (
                  <Card
                    key={index}
                    sx={{
                      p: 4,
                      borderRadius: 3,
                      textAlign: 'center',
                      background: 'white',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                    }}
                  >
                    <Typography variant="h3" sx={{ fontWeight: 800, color: '#667eea', mb: 1 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                      {stat.label}
                    </Typography>
                  </Card>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box id="testimonials" sx={{ py: 15, bgcolor: 'background.paper' }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 3, color: 'text.primary' }}>
              What Our Users Say
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
              Join thousands of satisfied educators who trust EduPro
            </Typography>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
            {[
              {
                name: 'Dr. Sarah Johnson',
                role: 'Principal, Lincoln High School',
                text: 'EduPro has transformed how we manage our school. The intuitive interface and powerful features have saved us countless hours every week.',
              },
              {
                name: 'Michael Chen',
                role: 'IT Director, Academy of Excellence',
                text: 'The security and reliability of EduPro is unmatched. Our data has never been safer, and the platform performance is exceptional.',
              },
              {
                name: 'Emily Rodriguez',
                role: 'Teacher, Valley View Academy',
                text: 'I love how easy it is to track student progress and communicate with parents. EduPro has made my job so much more efficient.',
              },
            ].map((testimonial, index) => (
              <Box key={index}>
                <Card
                  sx={{
                    height: '100%',
                    p: 4,
                    borderRadius: 3,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                    background: 'white',
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="body1"
                      sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 4, fontStyle: 'italic' }}
                    >
                      "{testimonial.text}"
                    </Typography>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: 15,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: alpha('#ffffff', 0.05),
            top: '-200px',
            right: '-200px',
          }}
        />
        <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative' }}>
          <Typography
            variant="h3"
            sx={{
              color: 'white',
              fontWeight: 800,
              mb: 3,
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            Ready to Transform Your School?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: alpha('#ffffff', 0.9),
              mb: 5,
              fontWeight: 400,
              lineHeight: 1.8,
            }}
          >
            Join thousands of educational institutions already using EduPro to streamline their operations.
          </Typography>
          {isAuthenticated ? (
            <Button
              variant="contained"
              size="large"
              onClick={handleGoToDashboard}
              endIcon={<DashboardIcon />}
              sx={{
                px: 6,
                py: 2.5,
                borderRadius: 2,
                background: 'white',
                color: '#667eea',
                fontWeight: 700,
                textTransform: 'none',
                fontSize: '1.2rem',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                '&:hover': {
                  background: alpha('#ffffff', 0.9),
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Go to Dashboard
            </Button>
          ) : (
            <Button
              variant="contained"
              size="large"
              onClick={handleLogin}
              endIcon={<ArrowForward />}
              sx={{
                px: 6,
                py: 2.5,
                borderRadius: 2,
                background: 'white',
                color: '#667eea',
                fontWeight: 700,
                textTransform: 'none',
                fontSize: '1.2rem',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                '&:hover': {
                  background: alpha('#ffffff', 0.9),
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Get Started Now
            </Button>
          )}
        </Container>
      </Box>

      {/* Contact Section */}
      <Box id="contact" sx={{ py: 15, bgcolor: 'background.default' }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 3, color: 'text.primary' }}>
              Get In Touch
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
              Have questions? We'd love to hear from you.
            </Typography>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4, justifyContent: 'center' }}>
            <Box>
              <Card sx={{ p: 4, textAlign: 'center', borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                <CardContent>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                    }}
                  >
                    <School sx={{ fontSize: 32, color: 'white' }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
                    Email Us
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    support@edupro.com
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            <Box>
              <Card sx={{ p: 4, textAlign: 'center', borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                <CardContent>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                    }}
                  >
                    <Support sx={{ fontSize: 32, color: 'white' }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
                    Call Us
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    +1 (555) 123-4567
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            <Box>
              <Card sx={{ p: 4, textAlign: 'center', borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                <CardContent>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                    }}
                  >
                    <TrendingUp sx={{ fontSize: 32, color: 'white' }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
                    Visit Us
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    123 Education Street, Learning City
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#1a1a2e', py: 8 }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 4, mb: 6 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <School sx={{ fontSize: 24, color: 'white' }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'white' }}>
                  EduPro
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, mb: 3 }}>
                Empowering educational institutions with modern, efficient management solutions.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <IconButton sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: '#667eea' } }}>
                  <Facebook />
                </IconButton>
                <IconButton sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: '#667eea' } }}>
                  <Twitter />
                </IconButton>
                <IconButton sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: '#667eea' } }}>
                  <LinkedIn />
                </IconButton>
                <IconButton sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: '#667eea' } }}>
                  <Instagram />
                </IconButton>
              </Box>
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'white', mb: 3 }}>
                Product
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {['Features', 'Pricing', 'Security', 'Integrations'].map((item) => (
                  <MuiLink
                    key={item}
                    component="button"
                    sx={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', '&:hover': { color: '#667eea' } }}
                  >
                    {item}
                  </MuiLink>
                ))}
              </Box>
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'white', mb: 3 }}>
                Company
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                  <MuiLink
                    key={item}
                    component="button"
                    sx={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', '&:hover': { color: '#667eea' } }}
                  >
                    {item}
                  </MuiLink>
                ))}
              </Box>
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'white', mb: 3 }}>
                Resources
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {['Documentation', 'Help Center', 'API', 'Status'].map((item) => (
                  <MuiLink
                    key={item}
                    component="button"
                    sx={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', '&:hover': { color: '#667eea' } }}
                  >
                    {item}
                  </MuiLink>
                ))}
              </Box>
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'white', mb: 3 }}>
                Legal
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {['Privacy', 'Terms', 'Cookies', 'Licenses'].map((item) => (
                  <MuiLink
                    key={item}
                    component="button"
                    sx={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', '&:hover': { color: '#667eea' } }}
                  >
                    {item}
                  </MuiLink>
                ))}
              </Box>
            </Box>
          </Box>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 4 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              © 2026 EduPro. All rights reserved.
            </Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <MuiLink
                component="button"
                sx={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#667eea' } }}
              >
                Privacy Policy
              </MuiLink>
              <MuiLink
                component="button"
                sx={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#667eea' } }}
              >
                Terms of Service
              </MuiLink>
              <MuiLink
                component="button"
                sx={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: '#667eea' } }}
              >
                Cookie Policy
              </MuiLink>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}