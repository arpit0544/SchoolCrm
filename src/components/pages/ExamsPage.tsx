import { motion } from 'motion/react';
import { ClipboardList, Plus, Calendar, Award, TrendingUp, Download } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Progress } from '../ui/progress';
import { mockExams, mockResults, mockStudents } from '../../utils/mockData';

export function ExamsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-gray-900">Exams & Results</h1>
          <p className="text-gray-600 mt-1">Manage examinations and student results</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Generate Report Cards
          </Button>
          <Button className="bg-[#1A73E8] hover:bg-blue-600 gap-2">
            <Plus className="w-4 h-4" />
            Create Exam
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-6 card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Exams</p>
                <h3 className="text-gray-900 mt-2">{mockExams.length}</h3>
                <Badge className="mt-2 bg-blue-100 text-blue-700">This Term</Badge>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <ClipboardList className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Upcoming Exams</p>
                <h3 className="text-gray-900 mt-2">5</h3>
                <p className="text-xs text-gray-500 mt-2">Next: Nov 15</p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Class Average</p>
                <h3 className="text-gray-900 mt-2">87.4%</h3>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+3.2%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pass Percentage</p>
                <h3 className="text-gray-900 mt-2">95.2%</h3>
                <Progress value={95.2} className="mt-2 h-2" />
              </div>
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scheduled Exams */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Scheduled Exams</h3>
            <div className="space-y-4">
              {mockExams.map((exam) => (
                <div key={exam.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-gray-900">{exam.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Class {exam.class} • {exam.term}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {exam.startDate} to {exam.endDate}
                        </span>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700">{exam.subjects.length} Subjects</Badge>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Subjects:</p>
                    <div className="flex flex-wrap gap-2">
                      {exam.subjects.slice(0, 3).map((subject) => (
                        <Badge key={subject.name} variant="outline">
                          {subject.name}
                        </Badge>
                      ))}
                      {exam.subjects.length > 3 && (
                        <Badge variant="outline">+{exam.subjects.length - 3} more</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Recent Results */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Top Performers</h3>
            <div className="space-y-3">
              {mockResults.map((result, index) => {
                const student = mockStudents.find((s) => s.id === result.studentId);
                return (
                  <div key={result.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-[#1A73E8] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{student?.name}</p>
                      <p className="text-xs text-gray-500">
                        {student?.class}-{student?.section}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-900">{result.percentage}%</p>
                      <Badge className="bg-green-100 text-green-700 text-xs">
                        Grade {result.grade}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Results
            </Button>
          </Card>
        </motion.div>
      </div>

      {/* Subject-wise Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="p-6">
          <h3 className="text-gray-900 mb-4">Subject-wise Performance</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Total Students</TableHead>
                  <TableHead>Average Marks</TableHead>
                  <TableHead>Highest</TableHead>
                  <TableHead>Pass %</TableHead>
                  <TableHead>Performance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockExams[0].subjects.map((subject) => {
                  const avgMarks = Math.floor(Math.random() * 30) + 60;
                  const passPercentage = Math.floor(Math.random() * 10) + 85;

                  return (
                    <TableRow key={subject.name}>
                      <TableCell>{subject.name}</TableCell>
                      <TableCell>60</TableCell>
                      <TableCell>{avgMarks}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-700">
                          {subject.maxMarks}
                        </Badge>
                      </TableCell>
                      <TableCell>{passPercentage}%</TableCell>
                      <TableCell>
                        <Progress value={passPercentage} className="h-2" />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
