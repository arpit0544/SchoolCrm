import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Download,
  FileText,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Filter,
  BarChart3,
  PieChart,
  FileSpreadsheet,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { toast } from 'sonner';
import { mockStudents, mockAttendance, mockFees, mockResults } from '../../utils/mockData';

type ReportType = 'attendance' | 'results' | 'fees' | 'comprehensive';

export function ReportsPage() {
  const [selectedReportType, setSelectedReportType] = useState<ReportType>('attendance');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('october');

  // Generate attendance report data
  const attendanceReportData = mockStudents.map((student) => {
    const studentAttendance = mockAttendance.filter((a) => a.studentId === student.id);
    const totalDays = 22;
    const presentDays = studentAttendance.filter((a) => a.status === 'present').length;
    const percentage = ((presentDays / totalDays) * 100).toFixed(1);

    return {
      id: student.id,
      name: student.name,
      class: `${student.class}-${student.section}`,
      admissionNumber: student.admissionNumber,
      totalDays,
      presentDays,
      absentDays: totalDays - presentDays,
      percentage: parseFloat(percentage),
    };
  });

  // Generate results report data
  const resultsReportData = mockStudents.map((student) => {
    const result = mockResults.find((r) => r.studentId === student.id);
    return {
      id: student.id,
      name: student.name,
      class: `${student.class}-${student.section}`,
      admissionNumber: student.admissionNumber,
      totalMarks: result?.totalMarks || 0,
      percentage: result?.percentage || 0,
      grade: result?.grade || 'N/A',
      rank: result?.rank || '-',
    };
  });

  // Generate fees report data
  const feesReportData = mockFees.map((fee) => ({
    id: fee.id,
    studentName: fee.studentName,
    class: `${fee.class}-${fee.section}`,
    totalAmount: fee.totalAmount,
    paidAmount: fee.paidAmount,
    pendingAmount: fee.pendingAmount,
    status: fee.status,
    dueDate: fee.dueDate,
  }));

  // Export to Excel simulation
  const handleExportToExcel = (reportType: ReportType) => {
    let data: any[] = [];
    let filename = '';

    switch (reportType) {
      case 'attendance':
        data = attendanceReportData;
        filename = `attendance_report_${selectedMonth}_${new Date().getTime()}.xlsx`;
        break;
      case 'results':
        data = resultsReportData;
        filename = `results_report_${new Date().getTime()}.xlsx`;
        break;
      case 'fees':
        data = feesReportData;
        filename = `fees_report_${new Date().getTime()}.xlsx`;
        break;
      case 'comprehensive':
        // Combine all data
        data = mockStudents.map((student) => {
          const attendance = attendanceReportData.find((a) => a.id === student.id);
          const result = resultsReportData.find((r) => r.id === student.id);
          const fee = mockFees.find((f) => f.studentId === student.id);

          return {
            name: student.name,
            admissionNumber: student.admissionNumber,
            class: `${student.class}-${student.section}`,
            attendance: attendance?.percentage || 0,
            percentage: result?.percentage || 0,
            grade: result?.grade || 'N/A',
            totalFees: fee?.totalAmount || 0,
            paidFees: fee?.paidAmount || 0,
            pendingFees: fee?.pendingAmount || 0,
          };
        });
        filename = `comprehensive_report_${new Date().getTime()}.xlsx`;
        break;
    }

    // Simulate Excel export
    console.log('Exporting data:', data);
    toast.success(`${filename} downloaded successfully`);
  };

  // Generate PDF simulation
  const handleGeneratePDF = (reportType: ReportType) => {
    const filename = `${reportType}_report_${new Date().getTime()}.pdf`;
    toast.success(`${filename} generated successfully`);
  };

  const filteredAttendanceData = attendanceReportData.filter(
    (item) => selectedClass === 'all' || item.class.startsWith(selectedClass)
  );

  const filteredResultsData = resultsReportData.filter(
    (item) => selectedClass === 'all' || item.class.startsWith(selectedClass)
  );

  const filteredFeesData = feesReportData.filter(
    (item) => selectedClass === 'all' || item.class.startsWith(selectedClass)
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">
            Generate and download comprehensive student reports
          </p>
        </div>
      </motion.div>

      {/* Report Type Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card
            className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
              selectedReportType === 'attendance' ? 'ring-2 ring-[#1A73E8]' : ''
            }`}
            onClick={() => setSelectedReportType('attendance')}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-[#1A73E8]" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Attendance</p>
                <p className="text-xs text-gray-500 mt-1">Daily records</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card
            className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
              selectedReportType === 'results' ? 'ring-2 ring-[#1A73E8]' : ''
            }`}
            onClick={() => setSelectedReportType('results')}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Results</p>
                <p className="text-xs text-gray-500 mt-1">Exam performance</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card
            className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
              selectedReportType === 'fees' ? 'ring-2 ring-[#1A73E8]' : ''
            }`}
            onClick={() => setSelectedReportType('fees')}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Fees</p>
                <p className="text-xs text-gray-500 mt-1">Payment status</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card
            className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
              selectedReportType === 'comprehensive' ? 'ring-2 ring-[#1A73E8]' : ''
            }`}
            onClick={() => setSelectedReportType('comprehensive')}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Comprehensive</p>
                <p className="text-xs text-gray-500 mt-1">All data</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Filters and Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap gap-3">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="9">Class 9</SelectItem>
                  <SelectItem value="10">Class 10</SelectItem>
                  <SelectItem value="11">Class 11</SelectItem>
                  <SelectItem value="12">Class 12</SelectItem>
                </SelectContent>
              </Select>

              {selectedReportType === 'attendance' && (
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="october">October 2025</SelectItem>
                    <SelectItem value="september">September 2025</SelectItem>
                    <SelectItem value="august">August 2025</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => handleGeneratePDF(selectedReportType)}
              >
                <FileText className="w-4 h-4" />
                Generate PDF
              </Button>
              <Button
                className="bg-[#1A73E8] hover:bg-blue-600 gap-2"
                onClick={() => handleExportToExcel(selectedReportType)}
              >
                <FileSpreadsheet className="w-4 h-4" />
                Export to Excel
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Report Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-6">
          <Tabs value={selectedReportType} onValueChange={(v) => setSelectedReportType(v as ReportType)}>
            <TabsList>
              <TabsTrigger value="attendance">Attendance Report</TabsTrigger>
              <TabsTrigger value="results">Results Report</TabsTrigger>
              <TabsTrigger value="fees">Fees Report</TabsTrigger>
              <TabsTrigger value="comprehensive">Comprehensive Report</TabsTrigger>
            </TabsList>

            {/* Attendance Report */}
            <TabsContent value="attendance" className="mt-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Admission No.</TableHead>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Total Days</TableHead>
                      <TableHead>Present</TableHead>
                      <TableHead>Absent</TableHead>
                      <TableHead>Percentage</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAttendanceData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="text-gray-700">{item.admissionNumber}</TableCell>
                        <TableCell className="text-gray-900">{item.name}</TableCell>
                        <TableCell>
                          <Badge className="bg-blue-100 text-blue-700">{item.class}</Badge>
                        </TableCell>
                        <TableCell className="text-gray-700">{item.totalDays}</TableCell>
                        <TableCell className="text-green-600">{item.presentDays}</TableCell>
                        <TableCell className="text-red-600">{item.absentDays}</TableCell>
                        <TableCell className="text-gray-900">{item.percentage}%</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              item.percentage >= 90
                                ? 'bg-green-100 text-green-700'
                                : item.percentage >= 75
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }
                          >
                            {item.percentage >= 90
                              ? 'Excellent'
                              : item.percentage >= 75
                              ? 'Good'
                              : 'Poor'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Results Report */}
            <TabsContent value="results" className="mt-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Admission No.</TableHead>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Total Marks</TableHead>
                      <TableHead>Percentage</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Rank</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredResultsData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="text-gray-700">{item.admissionNumber}</TableCell>
                        <TableCell className="text-gray-900">{item.name}</TableCell>
                        <TableCell>
                          <Badge className="bg-blue-100 text-blue-700">{item.class}</Badge>
                        </TableCell>
                        <TableCell className="text-gray-700">{item.totalMarks}/500</TableCell>
                        <TableCell className="text-gray-900">{item.percentage}%</TableCell>
                        <TableCell>
                          <Badge className="bg-purple-100 text-purple-700">{item.grade}</Badge>
                        </TableCell>
                        <TableCell className="text-gray-700">{item.rank}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              item.percentage >= 75
                                ? 'bg-green-100 text-green-700'
                                : item.percentage >= 35
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }
                          >
                            {item.percentage >= 75
                              ? 'Distinction'
                              : item.percentage >= 35
                              ? 'Pass'
                              : 'Fail'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Fees Report */}
            <TabsContent value="fees" className="mt-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Total Amount</TableHead>
                      <TableHead>Paid Amount</TableHead>
                      <TableHead>Pending Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFeesData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="text-gray-900">{item.studentName}</TableCell>
                        <TableCell>
                          <Badge className="bg-blue-100 text-blue-700">{item.class}</Badge>
                        </TableCell>
                        <TableCell className="text-gray-700">₹{item.totalAmount.toLocaleString()}</TableCell>
                        <TableCell className="text-green-600">₹{item.paidAmount.toLocaleString()}</TableCell>
                        <TableCell className="text-red-600">₹{item.pendingAmount.toLocaleString()}</TableCell>
                        <TableCell className="text-gray-700">{item.dueDate}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              item.status === 'paid'
                                ? 'bg-green-100 text-green-700'
                                : item.status === 'partial'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Comprehensive Report */}
            <TabsContent value="comprehensive" className="mt-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Admission No.</TableHead>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Attendance %</TableHead>
                      <TableHead>Result %</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Total Fees</TableHead>
                      <TableHead>Pending</TableHead>
                      <TableHead>Overall</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockStudents
                      .filter((s) => selectedClass === 'all' || s.class === selectedClass)
                      .map((student) => {
                        const attendance = attendanceReportData.find((a) => a.id === student.id);
                        const result = resultsReportData.find((r) => r.id === student.id);
                        const fee = mockFees.find((f) => f.studentId === student.id);

                        return (
                          <TableRow key={student.id}>
                            <TableCell className="text-gray-700">{student.admissionNumber}</TableCell>
                            <TableCell className="text-gray-900">{student.name}</TableCell>
                            <TableCell>
                              <Badge className="bg-blue-100 text-blue-700">
                                {student.class}-{student.section}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-gray-700">
                              {attendance?.percentage || 0}%
                            </TableCell>
                            <TableCell className="text-gray-700">
                              {result?.percentage || 0}%
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-purple-100 text-purple-700">
                                {result?.grade || 'N/A'}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-gray-700">
                              ₹{fee?.totalAmount.toLocaleString() || 0}
                            </TableCell>
                            <TableCell className="text-red-600">
                              ₹{fee?.pendingAmount.toLocaleString() || 0}
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  (attendance?.percentage || 0) >= 90 &&
                                  (result?.percentage || 0) >= 75 &&
                                  (fee?.pendingAmount || 0) === 0
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-yellow-100 text-yellow-700'
                                }
                              >
                                {(attendance?.percentage || 0) >= 90 &&
                                (result?.percentage || 0) >= 75 &&
                                (fee?.pendingAmount || 0) === 0
                                  ? 'Excellent'
                                  : 'Good'}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </motion.div>

      {/* Summary Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Attendance</p>
                <h3 className="text-gray-900 mt-1">
                  {(
                    attendanceReportData.reduce((acc, curr) => acc + curr.percentage, 0) /
                    attendanceReportData.length
                  ).toFixed(1)}
                  %
                </h3>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-[#1A73E8]" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Performance</p>
                <h3 className="text-gray-900 mt-1">
                  {(
                    resultsReportData.reduce((acc, curr) => acc + curr.percentage, 0) /
                    resultsReportData.length
                  ).toFixed(1)}
                  %
                </h3>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Pending Fees</p>
                <h3 className="text-gray-900 mt-1">
                  ₹
                  {feesReportData
                    .reduce((acc, curr) => acc + curr.pendingAmount, 0)
                    .toLocaleString()}
                </h3>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
