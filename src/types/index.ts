export type UserRole = 'admin' | 'teacher' | 'student' | 'parent';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  schoolId?: string;
  schoolName?: string;
}

export interface Student {
  id: string;
  admissionNumber: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  class: string;
  section: string;
  rollNumber: string;
  parentId: string;
  parentName: string;
  address: string;
  admissionDate: string;
  bloodGroup?: string;
  avatar?: string;
  status: 'active' | 'inactive';
}

export interface Teacher {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  subjects: string[];
  classes: string[];
  dateOfJoining: string;
  qualification: string;
  avatar?: string;
  status: 'active' | 'inactive';
}

export interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  occupation?: string;
  address: string;
  students: string[];
}

export interface Class {
  id: string;
  name: string;
  sections: string[];
  classTeacher: string;
  students: number;
}

export interface Attendance {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'half-day';
  class: string;
  section: string;
  remarks?: string;
}

export interface Fee {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  section: string;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue' | 'partial';
  feeType: 'tuition' | 'transport' | 'hostel' | 'exam' | 'library' | 'other';
  lastPaymentDate?: string;
}

export interface Exam {
  id: string;
  name: string;
  class: string;
  term: string;
  startDate: string;
  endDate: string;
  subjects: {
    name: string;
    date: string;
    maxMarks: number;
    passingMarks: number;
  }[];
}

export interface Result {
  id: string;
  studentId: string;
  examId: string;
  subjects: {
    name: string;
    marksObtained: number;
    maxMarks: number;
    grade: string;
  }[];
  totalMarks: number;
  totalMaxMarks: number;
  percentage: number;
  grade: string;
  rank?: number;
}

export interface Transport {
  id: string;
  busNumber: string;
  routeName: string;
  driverName: string;
  driverPhone: string;
  capacity: number;
  students: number;
  stops: string[];
  timing: string;
}

export interface LibraryBook {
  id: string;
  isbn: string;
  title: string;
  author: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
  issuedCopies: number;
}

export interface BookIssue {
  id: string;
  bookId: string;
  bookTitle: string;
  studentId: string;
  studentName: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  fine?: number;
  status: 'issued' | 'returned' | 'overdue';
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  priority: 'low' | 'medium' | 'high';
  targetAudience: UserRole[];
  isRead?: boolean;
}

export interface Staff {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  dateOfJoining: string;
  salary: number;
  status: 'active' | 'inactive';
}

export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalStaff: number;
  totalRevenue: number;
  pendingFees: number;
  attendanceToday: number;
  activeTransport: number;
  libraryBooks: number;
}

export interface TimetableEntry {
  id: string;
  subject: string;
  time: string;
  class: string;
  section: string;
  teacher: string;
  day: string;
  room?: string;
}
