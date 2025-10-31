import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, 
  TrendingUp, 
  Award, 
  Download, 
  FileText, 
  BarChart3,
  Filter,
  Search
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const toppers = [
  { rank: 1, name: 'Priya Patel', class: '10-A', percentage: 97.5, subjects: 6 },
  { rank: 2, name: 'Aarav Sharma', class: '10-A', percentage: 96.2, subjects: 6 },
  { rank: 3, name: 'Ananya Singh', class: '10-B', percentage: 95.8, subjects: 6 },
];

const subjectAnalysis = [
  { subject: 'Mathematics', average: 78, highest: 98, lowest: 45, passRate: 92 },
  { subject: 'Science', average: 82, highest: 97, lowest: 52, passRate: 95 },
  { subject: 'English', average: 75, highest: 95, lowest: 48, passRate: 88 },
  { subject: 'Social Studies', average: 80, highest: 96, lowest: 50, passRate: 90 },
  { subject: 'Hindi', average: 77, highest: 94, lowest: 46, passRate: 89 },
  { subject: 'Computer', average: 85, highest: 99, lowest: 58, passRate: 96 },
];

const studentPerformance = [
  {
    subject: 'Math',
    student: 92,
    classAvg: 78,
  },
  {
    subject: 'Science',
    student: 88,
    classAvg: 82,
  },
  {
    subject: 'English',
    student: 85,
    classAvg: 75,
  },
  {
    subject: 'Social',
    student: 90,
    classAvg: 80,
  },
  {
    subject: 'Hindi',
    student: 87,
    classAvg: 77,
  },
];

const classComparison = [
  { class: '10-A', average: 82.5, students: 42 },
  { class: '10-B', average: 79.8, students: 40 },
  { class: '9-A', average: 81.2, students: 45 },
  { class: '9-B', average: 78.5, students: 43 },
];

export default function ExamResults() {
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-gray-800 mb-1">Exam & Results Management</h2>
          <p className="text-sm text-gray-500">Manage exams, publish results, and generate report cards</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Results
          </Button>
          <Button className="gap-2 bg-[#1A73E8] hover:bg-[#0D47A1]">
            <FileText className="w-4 h-4" />
            Generate Report Cards
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-500 p-3 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-blue-100 text-blue-700">Overall</Badge>
              </div>
              <h3 className="text-gray-800 mb-1">80.5%</h3>
              <p className="text-sm text-gray-500">Average Score</p>
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
                <div className="bg-green-500 p-3 rounded-lg">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-green-100 text-green-700">Top Scorer</Badge>
              </div>
              <h3 className="text-gray-800 mb-1">97.5%</h3>
              <p className="text-sm text-gray-500">Highest Percentage</p>
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
                <div className="bg-purple-500 p-3 rounded-lg">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-purple-100 text-purple-700">Pass Rate</Badge>
              </div>
              <h3 className="text-gray-800 mb-1">91.8%</h3>
              <p className="text-sm text-gray-500">Overall Pass Rate</p>
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
                <div className="bg-orange-500 p-3 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-orange-100 text-orange-700">Improvement</Badge>
              </div>
              <h3 className="text-gray-800 mb-1">+5.3%</h3>
              <p className="text-sm text-gray-500">From Last Exam</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Top Performers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-600" />
              Top Performers - Mid Term Exam 2025
            </CardTitle>
            <CardDescription>Congratulations to our top achievers!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {toppers.map((topper, index) => (
                <motion.div
                  key={topper.rank}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={`relative p-6 bg-white rounded-lg border-2 ${
                    topper.rank === 1 ? 'border-yellow-400' :
                    topper.rank === 2 ? 'border-gray-300' :
                    'border-orange-300'
                  }`}
                >
                  <div className="absolute -top-4 -right-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${
                      topper.rank === 1 ? 'bg-yellow-500' :
                      topper.rank === 2 ? 'bg-gray-400' :
                      'bg-orange-500'
                    }`}>
                      {topper.rank === 1 && '🥇'}
                      {topper.rank === 2 && '🥈'}
                      {topper.rank === 3 && '🥉'}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-[#1A73E8] text-white">
                        {topper.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-gray-800">{topper.name}</h4>
                      <p className="text-sm text-gray-500">Class {topper.class}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Percentage</span>
                      <span className="text-green-600">{topper.percentage}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Subjects</span>
                      <span className="text-gray-800">{topper.subjects}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject-wise Analysis */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Subject-wise Performance</CardTitle>
              <CardDescription>Average scores across subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={subjectAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" angle={-45} textAnchor="end" height={80} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="average" fill="#1A73E8" name="Average Score" />
                  <Bar dataKey="highest" fill="#34A853" name="Highest Score" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Student vs Class Average */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Student Performance Comparison</CardTitle>
              <CardDescription>Individual vs class average</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={studentPerformance}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis domain={[0, 100]} />
                  <Radar name="Student" dataKey="student" stroke="#1A73E8" fill="#1A73E8" fillOpacity={0.6} />
                  <Radar name="Class Average" dataKey="classAvg" stroke="#EA4335" fill="#EA4335" fillOpacity={0.6} />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Detailed Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Subject Analysis</CardTitle>
                <CardDescription>Detailed breakdown of each subject</CardDescription>
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
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subjectAnalysis.map((subject, index) => (
                <motion.div
                  key={subject.subject}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.05 }}
                  className="p-4 border border-gray-200 rounded-lg hover:border-[#1A73E8] transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-gray-800">{subject.subject}</h4>
                    <Badge className="bg-blue-100 text-blue-700">
                      {subject.average}% Average
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Highest</p>
                      <p className="text-green-600">{subject.highest}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Lowest</p>
                      <p className="text-red-600">{subject.lowest}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Pass Rate</p>
                      <p className="text-gray-800">{subject.passRate}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <Badge className={subject.average >= 80 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                        {subject.average >= 80 ? 'Excellent' : 'Good'}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={subject.average} className="h-2" />
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Class Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Class-wise Comparison</CardTitle>
            <CardDescription>Performance across different classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {classComparison.map((cls, index) => (
                <motion.div
                  key={cls.class}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 + index * 0.1 }}
                  className="p-4 border border-gray-200 rounded-lg hover:border-[#1A73E8] transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-gray-800">Class {cls.class}</h4>
                    <Badge className="bg-blue-100 text-blue-700">
                      {cls.students} students
                    </Badge>
                  </div>
                  <div className="mb-2">
                    <p className="text-xs text-gray-500 mb-1">Average Score</p>
                    <h3 className="text-gray-800">{cls.average}%</h3>
                  </div>
                  <Progress value={cls.average} className="h-2" />
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
      >
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🤖</span> AI Result Analyzer
            </CardTitle>
            <CardDescription>Intelligent insights and predictions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="text-gray-800 mb-2">🎯 Topper Prediction</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Based on current performance trends, Priya Patel has 92% probability to top in final exams.
                </p>
                <Button size="sm" variant="link" className="text-[#1A73E8] p-0 h-auto">
                  View Analysis →
                </Button>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="text-gray-800 mb-2">⚠️ Weak Areas Detected</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Mathematics Chapter 5 shows lowest average (62%). Consider revision sessions for 18 students.
                </p>
                <Button size="sm" variant="link" className="text-[#1A73E8] p-0 h-auto">
                  Schedule Remedial →
                </Button>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="text-gray-800 mb-2">📈 Improvement Tracker</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Class 10-A improved by 8.5% from previous exam. Science and Computer subjects leading growth.
                </p>
                <Button size="sm" variant="link" className="text-[#1A73E8] p-0 h-auto">
                  Generate Report →
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
