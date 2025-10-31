import { useState } from 'react';
import { LoginPage } from './components/auth/LoginPage';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { AdminDashboard } from './components/pages/AdminDashboard';
import { StudentsPage } from './components/pages/StudentsPage';
import { TeachersPage } from './components/pages/TeachersPage';
import { FeesPage } from './components/pages/FeesPage';
import { AttendancePage } from './components/pages/AttendancePage';
import { ExamsPage } from './components/pages/ExamsPage';
import { TimetablePage } from './components/pages/TimetablePage';
import { TransportPage } from './components/pages/TransportPage';
import { LibraryPage } from './components/pages/LibraryPage';
import { ReportsPage } from './components/pages/ReportsPage';
import { AnnouncementsPage } from './components/pages/AnnouncementsPage';
import { SettingsPage } from './components/pages/SettingsPage';
import { User, UserRole } from './types';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogin = (email: string, password: string, role: UserRole) => {
    // In a real app, this would authenticate with the backend
    const user: User = {
      id: '1',
      email,
      name: getDemoUserName(role),
      role,
      schoolName: 'Demo High School',
      schoolId: 'DEMO001',
    };
    setCurrentUser(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setCurrentPage('dashboard');
  };

  const getDemoUserName = (role: UserRole): string => {
    switch (role) {
      case 'admin':
        return 'Admin User';
      case 'teacher':
        return 'Dr. Sanjay Mehta';
      case 'student':
        return 'Arjun Kumar';
      case 'parent':
        return 'Rajesh Kumar';
      default:
        return 'User';
    }
  };

  const renderPage = () => {
    if (!currentUser) return null;

    // Admin pages
    if (currentUser.role === 'admin') {
      switch (currentPage) {
        case 'dashboard':
          return <AdminDashboard />;
        case 'students':
          return <StudentsPage />;
        case 'teachers':
          return <TeachersPage />;
        case 'attendance':
          return <AttendancePage />;
        case 'fees':
          return <FeesPage />;
        case 'exams':
          return <ExamsPage />;
        case 'timetable':
          return <TimetablePage />;
        case 'transport':
          return <TransportPage />;
        case 'library':
          return <LibraryPage />;
        case 'reports':
          return <ReportsPage />;
        case 'announcements':
          return <AnnouncementsPage />;
        case 'settings':
          return <SettingsPage />;
        default:
          return <AdminDashboard />;
      }
    }

    // Teacher pages
    if (currentUser.role === 'teacher') {
      switch (currentPage) {
        case 'dashboard':
          return <TeacherDashboard />;
        case 'my-classes':
          return <ComingSoonPage title="My Classes" />;
        case 'attendance':
          return <AttendancePage />;
        case 'marks-entry':
          return <ComingSoonPage title="Marks Entry" />;
        case 'timetable':
          return <TimetablePage />;
        case 'homework':
          return <ComingSoonPage title="Homework" />;
        case 'announcements':
          return <AnnouncementsPage />;
        default:
          return <TeacherDashboard />;
      }
    }

    // Student pages
    if (currentUser.role === 'student') {
      switch (currentPage) {
        case 'dashboard':
          return <StudentDashboard />;
        case 'my-profile':
          return <ComingSoonPage title="My Profile" />;
        case 'attendance':
          return <ComingSoonPage title="My Attendance" />;
        case 'results':
          return <ComingSoonPage title="My Results" />;
        case 'timetable':
          return <TimetablePage />;
        case 'homework':
          return <ComingSoonPage title="Homework" />;
        case 'library':
          return <LibraryPage />;
        case 'announcements':
          return <AnnouncementsPage />;
        default:
          return <StudentDashboard />;
      }
    }

    // Parent pages
    if (currentUser.role === 'parent') {
      switch (currentPage) {
        case 'dashboard':
          return <ParentDashboard />;
        case 'children':
          return <ComingSoonPage title="My Children" />;
        case 'attendance':
          return <ComingSoonPage title="Attendance" />;
        case 'fees':
          return <FeesPage />;
        case 'results':
          return <ComingSoonPage title="Results" />;
        case 'timetable':
          return <TimetablePage />;
        case 'transport':
          return <TransportPage />;
        case 'announcements':
          return <AnnouncementsPage />;
        default:
          return <ParentDashboard />;
      }
    }

    return <AdminDashboard />;
  };

  if (!isLoggedIn || !currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <DashboardLayout
      user={currentUser}
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      onLogout={handleLogout}
    >
      {renderPage()}
    </DashboardLayout>
  );
}

// Placeholder components for different user dashboards
function TeacherDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-gray-900">Teacher Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-gray-900 mb-2">My Classes</h3>
          <p className="text-gray-600">3 Classes assigned</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-gray-900 mb-2">Students</h3>
          <p className="text-gray-600">120 Total students</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-gray-900 mb-2">Pending Tasks</h3>
          <p className="text-gray-600">5 Tasks pending</p>
        </div>
      </div>
    </div>
  );
}

function StudentDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-gray-900">Student Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-gray-900 mb-2">Attendance</h3>
          <p className="text-gray-600">92.5% This month</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-gray-900 mb-2">My Rank</h3>
          <p className="text-gray-600">2nd in class</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-gray-900 mb-2">Homework</h3>
          <p className="text-gray-600">3 Pending</p>
        </div>
      </div>
    </div>
  );
}

function ParentDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-gray-900">Parent Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-gray-900 mb-2">Children</h3>
          <p className="text-gray-600">1 Child enrolled</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-gray-900 mb-2">Fee Status</h3>
          <p className="text-gray-600">Paid for this term</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-gray-900 mb-2">Notifications</h3>
          <p className="text-gray-600">3 New messages</p>
        </div>
      </div>
    </div>
  );
}

function ComingSoonPage({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="w-24 h-24 bg-[#1A73E8] rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="text-white text-4xl">🚀</span>
        </div>
        <h2 className="text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          This module is under development and will be available soon with all the features you need.
        </p>
      </div>
    </div>
  );
}

export default App;
