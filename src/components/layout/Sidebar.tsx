import { motion } from 'motion/react';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  UserCheck,
  DollarSign,
  ClipboardList,
  Calendar,
  Bus,
  BookOpen,
  FileText,
  Bell,
  Settings,
  School,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { UserRole } from '../../types';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  userRole: UserRole;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({ currentPage, onNavigate, userRole, isCollapsed, onToggleCollapse }: SidebarProps) {
  const adminMenu = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Students', icon: GraduationCap },
    { id: 'teachers', label: 'Teachers', icon: Users },
    { id: 'attendance', label: 'Attendance', icon: UserCheck },
    { id: 'fees', label: 'Fee Management', icon: DollarSign },
    { id: 'exams', label: 'Exams & Results', icon: ClipboardList },
    { id: 'timetable', label: 'Timetable', icon: Calendar },
    { id: 'transport', label: 'Transport', icon: Bus },
    { id: 'library', label: 'Library', icon: BookOpen },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const teacherMenu = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'my-classes', label: 'My Classes', icon: GraduationCap },
    { id: 'attendance', label: 'Attendance', icon: UserCheck },
    { id: 'marks-entry', label: 'Marks Entry', icon: ClipboardList },
    { id: 'timetable', label: 'My Timetable', icon: Calendar },
    { id: 'homework', label: 'Homework', icon: FileText },
    { id: 'announcements', label: 'Announcements', icon: Bell },
  ];

  const studentMenu = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'my-profile', label: 'My Profile', icon: GraduationCap },
    { id: 'attendance', label: 'My Attendance', icon: UserCheck },
    { id: 'results', label: 'My Results', icon: ClipboardList },
    { id: 'timetable', label: 'Timetable', icon: Calendar },
    { id: 'homework', label: 'Homework', icon: FileText },
    { id: 'library', label: 'Library', icon: BookOpen },
    { id: 'announcements', label: 'Announcements', icon: Bell },
  ];

  const parentMenu = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'children', label: 'My Children', icon: GraduationCap },
    { id: 'attendance', label: 'Attendance', icon: UserCheck },
    { id: 'fees', label: 'Fee Payment', icon: DollarSign },
    { id: 'results', label: 'Results', icon: ClipboardList },
    { id: 'timetable', label: 'Timetable', icon: Calendar },
    { id: 'transport', label: 'Transport', icon: Bus },
    { id: 'announcements', label: 'Announcements', icon: Bell },
  ];

  const getMenuItems = () => {
    switch (userRole) {
      case 'admin':
        return adminMenu;
      case 'teacher':
        return teacherMenu;
      case 'student':
        return studentMenu;
      case 'parent':
        return parentMenu;
      default:
        return adminMenu;
    }
  };

  const menuItems = getMenuItems();

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#1A73E8] rounded-xl flex items-center justify-center">
              <School className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-gray-900">SkillLogic</h2>
              <p className="text-xs text-gray-500">School CRM</p>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="w-10 h-10 bg-[#1A73E8] rounded-xl flex items-center justify-center mx-auto">
            <School className="w-6 h-6 text-white" />
          </div>
        )}
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={onToggleCollapse}
        className="absolute -right-3 top-20 bg-white border border-gray-200 rounded-full p-1 hover:bg-gray-50 transition-colors"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        )}
      </button>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-[#1A73E8] text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                } ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        {!isCollapsed && (
          <div className="text-xs text-center text-gray-500">
            <p>© 2025 SkillLogic Technologies</p>
            <p className="mt-1">v1.0.0</p>
          </div>
        )}
      </div>
    </motion.aside>
  );
}
