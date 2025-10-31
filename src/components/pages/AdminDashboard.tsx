import { motion } from 'motion/react';
import {
  Users,
  GraduationCap,
  DollarSign,
  TrendingUp,
  UserCheck,
  Bus,
  BookOpen,
  AlertCircle,
} from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { mockDashboardStats, mockAnnouncements, mockFees } from '../../utils/mockData';

export function AdminDashboard() {
  const stats = [
    {
      title: 'Total Students',
      value: mockDashboardStats.totalStudents,
      icon: GraduationCap,
      color: 'bg-blue-500',
      trend: '+5.2%',
    },
    {
      title: 'Total Teachers',
      value: mockDashboardStats.totalTeachers,
      icon: Users,
      color: 'bg-green-500',
      trend: '+2.1%',
    },
    {
      title: 'Total Revenue',
      value: `₹${(mockDashboardStats.totalRevenue / 100000).toFixed(1)}L`,
      icon: DollarSign,
      color: 'bg-purple-500',
      trend: '+12.5%',
    },
    {
      title: 'Attendance Today',
      value: `${mockDashboardStats.attendanceToday}%`,
      icon: UserCheck,
      color: 'bg-orange-500',
      trend: '-1.2%',
    },
  ];

  const revenueData = [
    { month: 'Apr', revenue: 65000, expenses: 42000 },
    { month: 'May', revenue: 72000, expenses: 45000 },
    { month: 'Jun', revenue: 68000, expenses: 43000 },
    { month: 'Jul', revenue: 85000, expenses: 48000 },
    { month: 'Aug', revenue: 90000, expenses: 52000 },
    { month: 'Sep', revenue: 88000, expenses: 51000 },
    { month: 'Oct', revenue: 95000, expenses: 54000 },
  ];

  const attendanceData = [
    { day: 'Mon', present: 220, absent: 15 },
    { day: 'Tue', present: 228, absent: 7 },
    { day: 'Wed', present: 225, absent: 10 },
    { day: 'Thu', present: 232, absent: 3 },
    { day: 'Fri', present: 218, absent: 17 },
  ];

  const classDistribution = [
    { name: 'Class 9', value: 90, color: '#1A73E8' },
    { name: 'Class 10', value: 60, color: '#10b981' },
    { name: 'Class 11', value: 55, color: '#f59e0b' },
    { name: 'Class 12', value: 30, color: '#8b5cf6' },
  ];

  const pendingFees = mockFees.filter(
    (fee) => fee.status === 'pending' || fee.status === 'overdue'
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <Button className="bg-[#1A73E8] hover:bg-blue-600">
          Generate Report
        </Button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 card-hover">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">{stat.title}</p>
                    <h3 className="text-gray-900 mt-2">{stat.value}</h3>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">{stat.trend}</span>
                    </div>
                  </div>
                  <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Revenue vs Expenses</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#1A73E8" radius={[8, 8, 0, 0]} />
                <Bar dataKey="expenses" fill="#f59e0b" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Attendance Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Weekly Attendance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="present"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="absent"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Class Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Class Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={classDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {classDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Pending Fees */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Pending Fees</h3>
              <Badge variant="destructive">{pendingFees.length} Students</Badge>
            </div>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {pendingFees.slice(0, 5).map((fee) => (
                <div key={fee.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-900">{fee.studentName}</p>
                      <p className="text-xs text-gray-500">
                        {fee.class}-{fee.section}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-red-600">₹{fee.pendingAmount.toLocaleString()}</p>
                      <Badge
                        variant={fee.status === 'overdue' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {fee.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Pending Fees
            </Button>
          </Card>
        </motion.div>

        {/* Recent Announcements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Recent Announcements</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {mockAnnouncements.slice(0, 3).map((announcement) => (
                <div key={announcement.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{announcement.title}</p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {announcement.content}
                      </p>
                    </div>
                    {announcement.priority === 'high' && (
                      <AlertCircle className="w-4 h-4 text-red-500 ml-2 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-2">{announcement.date}</p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Announcements
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
