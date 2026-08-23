'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();

    // 1. Seed 10 Courses
    await queryInterface.bulkInsert('courses', [
      {
        id: 1,
        title: 'Data Structures',
        code: 'CS301',
        department: 'Computer Science',
        semester: 3,
        batch: '2024-2028',
        modules_count: 8,
        color: '#7b35d4',
        bg: '#f0e7fb',
        created_at: now,
        updated_at: now
      },
      {
        id: 2,
        title: 'Algorithms',
        code: 'CS401',
        department: 'Computer Science',
        semester: 4,
        batch: '2024-2028',
        modules_count: 7,
        color: '#1267c5',
        bg: '#eaf4fb',
        created_at: now,
        updated_at: now
      },
      {
        id: 3,
        title: 'Database Management Systems',
        code: 'CS302',
        department: 'Computer Science',
        semester: 5,
        batch: '2024-2028',
        modules_count: 6,
        color: '#27965b',
        bg: '#edf5ea',
        created_at: now,
        updated_at: now
      },
      {
        id: 4,
        title: 'Operating Systems',
        code: 'CS402',
        department: 'Computer Science',
        semester: 6,
        batch: '2023-2027',
        modules_count: 7,
        color: '#f15a16',
        bg: '#fff0e8',
        created_at: now,
        updated_at: now
      },
      {
        id: 5,
        title: 'Computer Networks',
        code: 'CS501',
        department: 'Computer Science',
        semester: 5,
        batch: '2023-2027',
        modules_count: 6,
        color: '#0957c4',
        bg: '#e8f0fe',
        created_at: now,
        updated_at: now
      },
      {
        id: 6,
        title: 'Machine Learning',
        code: 'CS601',
        department: 'Computer Science',
        semester: 6,
        batch: '2023-2027',
        modules_count: 8,
        color: '#8b35d8',
        bg: '#f4ebfa',
        created_at: now,
        updated_at: now
      },
      {
        id: 7,
        title: 'Artificial Intelligence',
        code: 'CS602',
        department: 'Computer Science',
        semester: 7,
        batch: '2022-2026',
        modules_count: 7,
        color: '#4aa7df',
        bg: '#eef8fc',
        created_at: now,
        updated_at: now
      },
      {
        id: 8,
        title: 'Software Engineering',
        code: 'CS502',
        department: 'Computer Science',
        semester: 5,
        batch: '2023-2027',
        modules_count: 5,
        color: '#2f9b5c',
        bg: '#eaf6ef',
        created_at: now,
        updated_at: now
      },
      {
        id: 9,
        title: 'Compiler Design',
        code: 'CS701',
        department: 'Computer Science',
        semester: 7,
        batch: '2022-2026',
        modules_count: 6,
        color: '#d97706',
        bg: '#fef3c7',
        created_at: now,
        updated_at: now
      },
      {
        id: 10,
        title: 'Web Technologies',
        code: 'CS303',
        department: 'Computer Science',
        semester: 3,
        batch: '2024-2028',
        modules_count: 6,
        color: '#2563eb',
        bg: '#dbeafe',
        created_at: now,
        updated_at: now
      }
    ], { ignoreDuplicates: true });

    // 2. Seed Modules for Course 1 (Data Structures) and Course 3 (DBMS)
    await queryInterface.bulkInsert('modules', [
      {
        course_id: 1,
        title: 'Introduction to Data Structures',
        description: 'Overview of data structures and their types.',
        status: 'Published',
        order: 1,
        created_at: now,
        updated_at: now
      },
      {
        course_id: 1,
        title: 'Arrays & Strings',
        description: 'Concept of arrays, operations and memory allocation.',
        status: 'Published',
        order: 2,
        created_at: now,
        updated_at: now
      },
      {
        course_id: 1,
        title: 'Linked Lists',
        description: 'Singly, doubly and circular linked lists.',
        status: 'Published',
        order: 3,
        created_at: now,
        updated_at: now
      },
      {
        course_id: 1,
        title: 'Stacks & Queues',
        description: 'Stack and Queue operations and applications.',
        status: 'Published',
        order: 4,
        created_at: now,
        updated_at: now
      },
      {
        course_id: 3,
        title: 'Introduction to Relational Databases',
        description: 'Database models, architecture and concepts.',
        status: 'Published',
        order: 1,
        created_at: now,
        updated_at: now
      },
      {
        course_id: 3,
        title: 'SQL Fundamentals',
        description: 'DDL, DML, DCL commands and queries.',
        status: 'Published',
        order: 2,
        created_at: now,
        updated_at: now
      }
    ], { ignoreDuplicates: true });

    // 3. Seed Resources
    await queryInterface.bulkInsert('resources', [
      {
        course_id: 1,
        file_name: 'DSA Previous Year Questions (2023).pdf',
        type: 'PYQ',
        file_type: 'pdf',
        upload_date: '12 May 2024',
        uploaded_by: 'Dr. John Doe',
        file_path: '/uploads/resources/dsa_pyq_2023.pdf',
        created_at: now,
        updated_at: now
      },
      {
        course_id: 1,
        file_name: 'Data Structures - Study Notes.pdf',
        type: 'Notes',
        file_type: 'pdf',
        upload_date: '05 May 2024',
        uploaded_by: 'Dr. John Doe',
        file_path: '/uploads/resources/dsa_notes.pdf',
        created_at: now,
        updated_at: now
      },
      {
        course_id: 3,
        file_name: 'DBMS - Normalization Guide.pdf',
        type: 'Notes',
        file_type: 'pdf',
        upload_date: '18 Apr 2024',
        uploaded_by: 'Dr. Jane Smith',
        file_path: '/uploads/resources/dbms_normalization.pdf',
        created_at: now,
        updated_at: now
      }
    ], { ignoreDuplicates: true });

    // 4. Seed ProfessorCourse Assignments (assigning professor user IDs 1 & 2 to courses)
    await queryInterface.bulkInsert('professor_courses', [
      { professor_id: 1, course_id: 1, created_at: now, updated_at: now },
      { professor_id: 1, course_id: 2, created_at: now, updated_at: now },
      { professor_id: 2, course_id: 3, created_at: now, updated_at: now },
      { professor_id: 2, course_id: 4, created_at: now, updated_at: now }
    ], { ignoreDuplicates: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('professor_courses', null, {});
    await queryInterface.bulkDelete('resources', null, {});
    await queryInterface.bulkDelete('modules', null, {});
    await queryInterface.bulkDelete('courses', null, {});
  }
};
