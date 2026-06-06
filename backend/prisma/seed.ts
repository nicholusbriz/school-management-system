import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Create users with plain text passwords
  const plainPassword = 'password123';

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@school.com' },
    update: {},
    create: {
      email: 'admin@school.com',
      name: 'Admin User',
      password: plainPassword,
      role: 'ADMIN',
    },
  });

  const teacher1 = await prisma.user.upsert({
    where: { email: 'teacher1@school.com' },
    update: {},
    create: {
      email: 'teacher1@school.com',
      name: 'John Smith',
      password: plainPassword,
      role: 'TEACHER',
    },
  });

  const teacher2 = await prisma.user.upsert({
    where: { email: 'teacher2@school.com' },
    update: {},
    create: {
      email: 'teacher2@school.com',
      name: 'Jane Doe',
      password: plainPassword,
      role: 'TEACHER',
    },
  });

  // Create teachers
  const mathTeacher = await prisma.teacher.upsert({
    where: { userId: teacher1.id },
    update: {},
    create: {
      userId: teacher1.id,
      subject: 'Mathematics',
    },
  });

  const scienceTeacher = await prisma.teacher.upsert({
    where: { userId: teacher2.id },
    update: {},
    create: {
      userId: teacher2.id,
      subject: 'Science',
    },
  });

  // Create students
  const students = [];
  for (let i = 1; i <= 50; i++) {
    const user = await prisma.user.upsert({
      where: { email: `student${i}@school.com` },
      update: {},
      create: {
        email: `student${i}@school.com`,
        name: `Student ${i}`,
        password: plainPassword,
        role: 'STUDENT',
      },
    });

    const grade = ['10', '11', '12'][Math.floor(Math.random() * 3)];
    const section = ['A', 'B', 'C'][Math.floor(Math.random() * 3)];

    const student = await prisma.student.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        studentId: `STU${String(i).padStart(4, '0')}`,
        grade,
        section,
      },
    });

    students.push(student);
  }

  // Create classes
  const mathClass = await prisma.class.upsert({
    where: { id: 'math-class-1' },
    update: {},
    create: {
      id: 'math-class-1',
      name: 'Mathematics 101',
      grade: '10',
      section: 'A',
      subject: 'Mathematics',
      teacherId: mathTeacher.id,
      schedule: 'Mon, Wed, Fri 9:00-10:00',
      room: 'Room 101',
    },
  });

  const scienceClass = await prisma.class.upsert({
    where: { id: 'science-class-1' },
    update: {},
    create: {
      id: 'science-class-1',
      name: 'Physics 101',
      grade: '10',
      section: 'A',
      subject: 'Science',
      teacherId: scienceTeacher.id,
      schedule: 'Tue, Thu 10:00-11:00',
      room: 'Room 102',
    },
  });

  // Enroll students in classes
  for (const student of students.slice(0, 30)) {
    await prisma.enrollment.upsert({
      where: {
        studentId_classId: {
          studentId: student.id,
          classId: mathClass.id,
        },
      },
      update: {},
      create: {
        studentId: student.id,
        classId: mathClass.id,
      },
    });
  }

  for (const student of students.slice(20, 50)) {
    await prisma.enrollment.upsert({
      where: {
        studentId_classId: {
          studentId: student.id,
          classId: scienceClass.id,
        },
      },
      update: {},
      create: {
        studentId: student.id,
        classId: scienceClass.id,
      },
    });
  }

  // Create assignments
  const mathAssignment = await prisma.assignment.create({
    data: {
      title: 'Math Homework 1',
      description: 'Complete exercises 1-20 from Chapter 1',
      classId: mathClass.id,
      dueDate: new Date('2026-06-15'),
      maxPoints: 100,
    },
  });

  const scienceAssignment = await prisma.assignment.create({
    data: {
      title: 'Physics Lab Report',
      description: 'Write a lab report on the pendulum experiment',
      classId: scienceClass.id,
      dueDate: new Date('2026-06-20'),
      maxPoints: 100,
    },
  });

  // Create grades
  const grades = ['A', 'B', 'C', 'D', 'F'];
  for (let i = 0; i < 30; i++) {
    const score = Math.floor(Math.random() * 40) + 60; // 60-100
    await prisma.grade.create({
      data: {
        studentId: students[i].id,
        assignmentId: mathAssignment.id,
        score,
        submittedAt: new Date('2026-06-10'),
        gradedAt: new Date('2026-06-12'),
        feedback: 'Good work!',
      },
    });
  }

  // Create attendance records
  const statuses = ['PRESENT', 'ABSENT', 'LATE', 'EXCUSED'];
  const today = new Date();
  for (let day = 0; day < 5; day++) {
    const date = new Date(today);
    date.setDate(date.getDate() - day);

    for (const student of students) {
      const status = statuses[Math.floor(Math.random() * 4)];
      await prisma.attendance.upsert({
        where: {
          studentId_date: {
            studentId: student.id,
            date,
          },
        },
        update: {},
        create: {
          studentId: student.id,
          date,
          status: status as any,
        },
      });
    }
  }

  console.log('Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
