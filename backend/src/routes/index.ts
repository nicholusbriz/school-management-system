import { Router } from 'express';
import dashboardRoutes from './dashboardRoutes';
import authRoutes from './authRoutes';
import studentsRoutes from './studentsRoutes';

const router = Router();

router.use('/dashboard', dashboardRoutes);
router.use('/auth', authRoutes);
router.use('/students', studentsRoutes);

export default router;
