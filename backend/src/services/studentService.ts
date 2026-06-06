import prisma from '../config/database';

class StudentService {
  async getAllStudents() {
    return await prisma.student.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
      },
    });
  }

  async getStudentById(id: string) {
    return await prisma.student.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
        enrollments: {
          include: {
            class: true,
          },
        },
        attendances: true,
      },
    });
  }

  async createStudent(data: { name: string; email: string; password: string; grade: string; section: string; studentId: string }) {
    const { name, email, password, grade, section, studentId } = data;

    // Create user first
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password, // Note: In production, this should be hashed
        role: 'STUDENT',
      },
    });

    // Create student
    return await prisma.student.create({
      data: {
        userId: user.id,
        studentId,
        grade,
        section,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
      },
    });
  }

  async updateStudent(id: string, data: { name?: string; email?: string; grade?: string; section?: string; studentId?: string }) {
    const { name, email, grade, section, studentId } = data;

    const updateData: any = {};
    if (studentId) updateData.studentId = studentId;
    if (grade) updateData.grade = grade;
    if (section) updateData.section = section;
    if (name || email) {
      updateData.user = {
        update: {},
      };
      if (name) updateData.user.update.name = name;
      if (email) updateData.user.update.email = email;
    }

    return await prisma.student.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
      },
    });
  }

  async deleteStudent(id: string) {
    await prisma.student.delete({
      where: { id },
    });
  }
}

export default new StudentService();
