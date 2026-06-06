import { Router } from 'express';
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from '../controllers';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.get('/', authenticate, getAllStudents);
router.get('/:id', authenticate, getStudentById);
router.post('/', authenticate, createStudent);
router.put('/:id', authenticate, updateStudent);
router.delete('/:id', authenticate, deleteStudent);

export default router;
