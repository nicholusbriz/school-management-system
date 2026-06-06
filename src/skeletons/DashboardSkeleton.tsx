import { Box, Card, CardContent, Skeleton } from '@mui/material';

export default function DashboardSkeleton() {
  return (
    <Box>
      {/* Stats Cards Skeleton */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
        {[1, 2, 3, 4].map((item) => (
          <Card key={item}>
            <CardContent>
              <Skeleton variant="circular" width={40} height={40} sx={{ mb: 2 }} />
              <Skeleton variant="text" width="60%" height={24} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="40%" height={32} />
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Charts Skeleton */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
        <Card>
          <CardContent>
            <Skeleton variant="text" width="30%" height={28} sx={{ mb: 3 }} />
            <Skeleton variant="rectangular" width="100%" height={300} />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Skeleton variant="text" width="40%" height={28} sx={{ mb: 3 }} />
            <Skeleton variant="rectangular" width="100%" height={300} />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
