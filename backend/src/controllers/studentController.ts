import { Request, Response } from 'express';
import { asyncHandler, successResponse } from '../utils';
import studentService from '../services/studentService';

export const getAllStudents = asyncHandler(async (req: Request, res: Response) => {
  const students = await studentService.getAllStudents();
  successResponse(res, students, 'Students retrieved successfully');
});

export const getStudentById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const student = await studentService.getStudentById(id);
  successResponse(res, student, 'Student retrieved successfully');
});

export const createStudent = asyncHandler(async (req: Request, res: Response) => {
  const student = await studentService.createStudent(req.body);
  successResponse(res, student, 'Student created successfully', 201);
});

export const updateStudent = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const student = await studentService.updateStudent(id, req.body);
  successResponse(res, student, 'Student updated successfully');
});

export const deleteStudent = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await studentService.deleteStudent(id);
  successResponse(res, null, 'Student deleted successfully');
});
