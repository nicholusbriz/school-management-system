import { Request, Response } from 'express';
import { asyncHandler, successResponse } from '../utils';
import prisma from '../config/database';

export const getStats = asyncHandler(async (req: Request, res: Response) => {
  const totalStudents = await prisma.student.count();
  const totalTeachers = await prisma.teacher.count();
  const totalClasses = await prisma.class.count();
  
  // Calculate attendance rate
  const totalAttendance = await prisma.attendance.count();
  const presentAttendance = await prisma.attendance.count({
    where: { status: 'PRESENT' }
  });
  const attendanceRate = totalAttendance > 0 
    ? Math.round((presentAttendance / totalAttendance) * 100) 
    : 0;

  const stats = {
    totalStudents,
    totalTeachers,
    totalClasses,
    attendanceRate,
  };
  successResponse(res, stats, 'Dashboard stats retrieved successfully');
});

export const getAttendanceData = asyncHandler(async (req: Request, res: Response) => {
  const data: any[] = [];
  successResponse(res, data, 'Attendance data retrieved successfully');
});

export const getGradeDistribution = asyncHandler(async (req: Request, res: Response) => {
  const data: any[] = [];
  successResponse(res, data, 'Grade distribution retrieved successfully');
});

export const getPerformanceData = asyncHandler(async (req: Request, res: Response) => {
  const data: any[] = [];
  successResponse(res, data, 'Performance data retrieved successfully');
});
