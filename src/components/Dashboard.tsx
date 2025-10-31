import { motion } from 'motion/react';
import { 
  Users, 
  GraduationCap, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const statsCards = [
  {
    title: 'Total Students',
    value: '1,247',
    change: '+12.5%',
    trend: 'up',
    icon: GraduationCap,
    color: 'bg-blue-500',
  },
  {
    title: 'Total Teachers',
    value: '86',
    change: '+3.2%',
    trend: 'up',
    icon: Users,
    color: 'bg-green-500',
  },
  {
    title: 'Fee Collection',
    value: '₹12.4L',
    change: '+8.7%',
    trend: 'up',
    icon: DollarSign,
    color: 'bg-purple-500',
  },
  {
    title: 'Attendance Today',
    value: '94.2%',
    change: '-2.1%',
    trend: 'down',
    icon: Calendar,
    color: 'bg-orange-500',
  },
];

const feeData = [
  { month: 'Jan', collected: 145000, pending: 25000 },
  { month: 'Feb', collected: 158000, pending: 18000 },
  { month: 'Mar', collected: 142000, pending: 32000 },
  { month: 'Apr', collected: 165000, pending: 15000 },
  { month: 'May', collected: 172000, pending: 12000 },
  { month: 'Jun', collected: 168000, pending: 14000 },
];

const attendanceData = [
  { day: 'Mon', rate: 92 },
  { day: 'Tue', rate: 95 },
  { day: 'Wed', rate: 88 },
  { day: 'Thu', rate: 94 },
  { day: 'Fri', rate: 91 },
  { day: 'Sat', rate: 86 },
];

const classDistribution = [
  { name: 'Class 1-5', value: 456, color: '#1A73E8' },
  { name: 'Class 6-8', value: 389, color: '#34A853' },
  { name: 'Class 9-10', value: 248, color: '#FBBC04' },
  { name: 'Class 11-12', value: 154, color: '#EA4335' },
];

const recentActivities = [
  { id: 1, type: 'success', message: 'New admission: Rahul Kumar - Class 5', time: '10 mins ago' },
  { id: 2, type: 'warning', message: 'Fee overdue: 45 students pending', time: '1 hour ago' },
  { id: 3, type: 'success', message: 'Exam results published: Class 10', time: '2 hours ago' },
  { id: 4, type: 'info', message: 'Bus #5 delayed by 15 minutes', time: '3 hours ago' },
  { id: 5, type: 'success', message: 'Library: 23 new books added', time: '5 hours ago' },
];

const upcomingEvents = [
  { id: 1, title: 'Parent-Teacher Meeting', date: 'Nov 5, 2025', type: 'Meeting' },
  { id: 2, title: 'Annual Sports Day', date: 'Nov 12, 2025', type: 'Event' },
  { id: 3, title: 'Mid-Term Exams Begin', date: 'Nov 18, 2025', type: 'Exam' },
  { id: 4, title: 'Winter Break Starts', date: 'Dec 20, 2025', type: 'Holiday' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#1A73E8] to-[#0D47A1] rounded-xl p-6 text-white"
      >
        <h1 className="text-white mb-2">Welcome back, Admin! 👋</h1>
        <p className="text-blue-100">Here's what's happening at Demo School today</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant={stat.trend === 'up' ? 'default' : 'secondary'} className={stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                    {stat.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {stat.change}
                  </Badge>
                </div>
                <h3 className="text-gray-800 mb-1">{stat.value}</h3>
                <p className="text-sm text-gray-500">{stat.title}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fee Collection Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Fee Collection Overview</CardTitle>
              <CardDescription>Monthly collected vs pending fees</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={feeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="collected" fill="#1A73E8" name="Collected" />
                  <Bar dataKey="pending" fill="#EA4335" name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Attendance Trend */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Weekly Attendance Trend</CardTitle>
              <CardDescription>Student attendance percentage</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="rate" stroke="#34A853" strokeWidth={2} name="Attendance %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Class Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Student Distribution</CardTitle>
              <CardDescription>By class groups</CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest updates and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                    <div className={`p-2 rounded-lg ${
                      activity.type === 'success' ? 'bg-green-100' :
                      activity.type === 'warning' ? 'bg-yellow-100' :
                      'bg-blue-100'
                    }`}>
                      {activity.type === 'success' ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <AlertCircle className={`w-4 h-4 ${activity.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'}`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Upcoming Events */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Important dates and schedules</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="p-4 border border-gray-200 rounded-lg hover:border-[#1A73E8] transition-colors">
                  <Badge className="mb-2">{event.type}</Badge>
                  <h4 className="text-gray-800 mb-1">{event.title}</h4>
                  <p className="text-sm text-gray-500">{event.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🤖</span> AI-Powered Insights
            </CardTitle>
            <CardDescription>Smart recommendations based on your data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="text-gray-800 mb-2">📊 Performance Alert</h4>
                <p className="text-sm text-gray-600 mb-2">Class 8-B shows declining average scores. Consider intervention.</p>
                <Progress value={65} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">65% class average (down from 78%)</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="text-gray-800 mb-2">💰 Fee Collection</h4>
                <p className="text-sm text-gray-600 mb-2">23 students at risk of fee default. Send reminders recommended.</p>
                <Progress value={88} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">88% collection rate this month</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="text-gray-800 mb-2">📅 Attendance Pattern</h4>
                <p className="text-sm text-gray-600 mb-2">Fridays show 5% lower attendance. Consider activity scheduling.</p>
                <Progress value={91} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">91% Friday average (vs 96% weekly)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
