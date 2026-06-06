import { Router } from 'express';
import {
  getStats,
  getAttendanceData,
  getGradeDistribution,
  getPerformanceData,
} from '../controllers/dashboardController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/stats', authenticate, getStats);
router.get('/attendance', authenticate, getAttendanceData);
router.get('/grades', authenticate, getGradeDistribution);
router.get('/performance', authenticate, getPerformanceData);

export default router;
