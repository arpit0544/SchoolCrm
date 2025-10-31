import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Users, CheckCircle, XCircle, Clock, Download, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar as CalendarComponent } from './ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const attendanceData = [
  { id: 1, name: 'Aarav Sharma', rollNo: '15', class: '10-A', status: 'present', time: '08:45 AM' },
  { id: 2, name: 'Priya Patel', rollNo: '22', class: '10-A', status: 'present', time: '08:50 AM' },
  { id: 3, name: 'Rohan Kumar', rollNo: '08', class: '10-A', status: 'absent', time: '-' },
  { id: 4, name: 'Ananya Singh', rollNo: '19', class: '10-A', status: 'present', time: '08:42 AM' },
  { id: 5, name: 'Arjun Mehta', rollNo: '12', class: '10-A', status: 'late', time: '09:15 AM' },
  { id: 6, name: 'Diya Reddy', rollNo: '25', class: '10-A', status: 'present', time: '08:48 AM' },
  { id: 7, name: 'Kabir Joshi', rollNo: '14', class: '10-A', status: 'present', time: '08:52 AM' },
  { id: 8, name: 'Ishita Gupta', rollNo: '11', class: '10-A', status: 'present', time: '08:55 AM' },
];

const monthlyStats = [
  { month: 'May', rate: 94.5 },
  { month: 'Jun', rate: 95.2 },
  { month: 'Jul', rate: 93.8 },
  { month: 'Aug', rate: 96.1 },
  { month: 'Sep', rate: 94.7 },
  { month: 'Oct', rate: 95.3 },
];

export default function AttendanceSystem() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedClass, setSelectedClass] = useState('10-A');

  const presentCount = attendanceData.filter(s => s.status === 'present').length;
  const absentCount = attendanceData.filter(s => s.status === 'absent').length;
  const lateCount = attendanceData.filter(s => s.status === 'late').length;
  const totalStudents = attendanceData.length;
  const attendanceRate = ((presentCount + lateCount) / totalStudents) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-gray-800 mb-1">Attendance Management</h2>
          <p className="text-sm text-gray-500">Track and manage student attendance</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
          <Button className="gap-2 bg-[#1A73E8] hover:bg-[#0D47A1]">
            <CheckCircle className="w-4 h-4" />
            Mark Attendance
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-500 p-3 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-green-100 text-green-700">Today</Badge>
              </div>
              <h3 className="text-gray-800 mb-1">{presentCount}</h3>
              <p className="text-sm text-gray-500">Present</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-red-500 p-3 rounded-lg">
                  <XCircle className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-red-100 text-red-700">Alert</Badge>
              </div>
              <h3 className="text-gray-800 mb-1">{absentCount}</h3>
              <p className="text-sm text-gray-500">Absent</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-orange-500 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-orange-100 text-orange-700">Late</Badge>
              </div>
              <h3 className="text-gray-800 mb-1">{lateCount}</h3>
              <p className="text-sm text-gray-500">Late Arrival</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-500 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-blue-100 text-blue-700">Rate</Badge>
              </div>
              <h3 className="text-gray-800 mb-1">{attendanceRate.toFixed(1)}%</h3>
              <p className="text-sm text-gray-500">Attendance Rate</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Attendance Calendar</CardTitle>
              <CardDescription>Select date to view records</CardDescription>
            </CardHeader>
            <CardContent>
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                  <span className="text-sm">High Attendance</span>
                  <Badge className="bg-green-100 text-green-700">>90%</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg">
                  <span className="text-sm">Medium Attendance</span>
                  <Badge className="bg-yellow-100 text-yellow-700">75-90%</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                  <span className="text-sm">Low Attendance</span>
                  <Badge className="bg-red-100 text-red-700"><75%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Today's Attendance */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Today's Attendance - {selectedClass}</CardTitle>
                  <CardDescription>
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10-A">Class 10-A</SelectItem>
                      <SelectItem value="10-B">Class 10-B</SelectItem>
                      <SelectItem value="9-A">Class 9-A</SelectItem>
                      <SelectItem value="9-B">Class 9-B</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {attendanceData.map((student, index) => (
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#1A73E8] transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-[#1A73E8] text-white">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-gray-800">{student.name}</p>
                        <p className="text-xs text-gray-500">Roll No: {student.rollNo}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500">{student.time}</span>
                      <Badge
                        className={
                          student.status === 'present' ? 'bg-green-100 text-green-700' :
                          student.status === 'late' ? 'bg-orange-100 text-orange-700' :
                          'bg-red-100 text-red-700'
                        }
                      >
                        {student.status === 'present' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {student.status === 'absent' && <XCircle className="w-3 h-3 mr-1" />}
                        {student.status === 'late' && <Clock className="w-3 h-3 mr-1" />}
                        {student.status}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Attendance Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Attendance Analysis</CardTitle>
            <CardDescription>Monthly trends and insights</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="monthly" className="w-full">
              <TabsList>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="classwise">Class-wise</TabsTrigger>
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
              </TabsList>
              <TabsContent value="monthly" className="mt-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {monthlyStats.map((stat, index) => (
                    <motion.div
                      key={stat.month}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.05 }}
                      className="p-4 border border-gray-200 rounded-lg hover:border-[#1A73E8] transition-colors"
                    >
                      <p className="text-sm text-gray-500 mb-1">{stat.month}</p>
                      <h3 className="text-gray-800 mb-2">{stat.rate}%</h3>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            stat.rate >= 95 ? 'bg-green-500' :
                            stat.rate >= 90 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${stat.rate}%` }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="classwise">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {['10-A', '10-B', '9-A', '9-B'].map((cls, index) => (
                    <motion.div
                      key={cls}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-gray-800">Class {cls}</h4>
                        <Badge className="bg-green-100 text-green-700">
                          {(Math.random() * 10 + 88).toFixed(1)}%
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Total Students:</span>
                          <span className="text-gray-800">42</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Avg. Attendance:</span>
                          <span className="text-green-600">{(Math.random() * 10 + 88).toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Low Attendance:</span>
                          <span className="text-red-600">{Math.floor(Math.random() * 3 + 1)}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="alerts">
                <div className="space-y-3">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="bg-red-100 p-2 rounded-lg">
                        <XCircle className="w-5 h-5 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-gray-800 mb-1">Low Attendance Alert</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          12 students have attendance below 75% this month. Immediate action required.
                        </p>
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          Send Parent Notifications
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="bg-yellow-100 p-2 rounded-lg">
                        <Clock className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-gray-800 mb-1">Frequent Late Arrivals</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          5 students have been late 3+ times this week in Class 9-B.
                        </p>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-gray-800 mb-1">Perfect Attendance</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Class 10-A maintained 98% attendance this month. Excellent performance!
                        </p>
                        <Button size="sm" variant="outline">
                          Generate Certificate
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🤖</span> AI Attendance Insights
            </CardTitle>
            <CardDescription>Smart patterns and predictions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="text-gray-800 mb-2">📉 Pattern Detected</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Fridays show 5% lower attendance across all classes. Consider scheduling engaging activities.
                </p>
                <p className="text-xs text-gray-500">Based on 6-month data</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="text-gray-800 mb-2">⚠️ Dropout Risk</h4>
                <p className="text-sm text-gray-600 mb-2">
                  3 students identified at high risk based on declining attendance pattern. Intervention recommended.
                </p>
                <Button size="sm" variant="link" className="text-[#1A73E8] p-0 h-auto">
                  View List →
                </Button>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="text-gray-800 mb-2">🎯 Forecast</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Current trends suggest 94.8% average attendance for next month. Auto-alerts configured.
                </p>
                <p className="text-xs text-gray-500">Confidence: 87%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
