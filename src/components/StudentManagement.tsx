import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  MoreVertical, 
  Eye, 
  Edit, 
  Trash,
  UserPlus,
  Upload
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const students = [
  {
    id: 'ST001',
    name: 'Aarav Sharma',
    class: '10-A',
    rollNo: '15',
    attendance: 94,
    feeStatus: 'paid',
    contact: '9876543210',
    guardian: 'Rajesh Sharma',
    joinDate: '2023-04-15',
  },
  {
    id: 'ST002',
    name: 'Priya Patel',
    class: '10-A',
    rollNo: '22',
    attendance: 97,
    feeStatus: 'paid',
    contact: '9876543211',
    guardian: 'Amit Patel',
    joinDate: '2023-04-16',
  },
  {
    id: 'ST003',
    name: 'Rohan Kumar',
    class: '9-B',
    rollNo: '08',
    attendance: 88,
    feeStatus: 'pending',
    contact: '9876543212',
    guardian: 'Suresh Kumar',
    joinDate: '2023-04-18',
  },
  {
    id: 'ST004',
    name: 'Ananya Singh',
    class: '10-B',
    rollNo: '19',
    attendance: 92,
    feeStatus: 'paid',
    contact: '9876543213',
    guardian: 'Vikram Singh',
    joinDate: '2023-04-20',
  },
  {
    id: 'ST005',
    name: 'Arjun Mehta',
    class: '9-A',
    rollNo: '12',
    attendance: 85,
    feeStatus: 'overdue',
    contact: '9876543214',
    guardian: 'Sandeep Mehta',
    joinDate: '2023-04-22',
  },
  {
    id: 'ST006',
    name: 'Diya Reddy',
    class: '10-A',
    rollNo: '25',
    attendance: 96,
    feeStatus: 'paid',
    contact: '9876543215',
    guardian: 'Ramesh Reddy',
    joinDate: '2023-04-25',
  },
  {
    id: 'ST007',
    name: 'Kabir Joshi',
    class: '9-B',
    rollNo: '14',
    attendance: 90,
    feeStatus: 'paid',
    contact: '9876543216',
    guardian: 'Anil Joshi',
    joinDate: '2023-05-01',
  },
  {
    id: 'ST008',
    name: 'Ishita Gupta',
    class: '10-B',
    rollNo: '11',
    attendance: 93,
    feeStatus: 'pending',
    contact: '9876543217',
    guardian: 'Manoj Gupta',
    joinDate: '2023-05-03',
  },
];

export default function StudentManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(students[0]);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.class.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-gray-800 mb-1">Student Management</h2>
          <p className="text-sm text-gray-500">Manage student records, admissions, and profiles</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2">
            <Upload className="w-4 h-4" />
            Import
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-[#1A73E8] hover:bg-[#0D47A1]">
                <Plus className="w-4 h-4" />
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogDescription>
                  Fill in the student details to create a new admission record
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="academic">Academic</TabsTrigger>
                  <TabsTrigger value="guardian">Guardian</TabsTrigger>
                </TabsList>
                <TabsContent value="personal" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      <Input placeholder="Enter first name" />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      <Input placeholder="Enter last name" />
                    </div>
                    <div className="space-y-2">
                      <Label>Date of Birth</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>Gender</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 col-span-2">
                      <Label>Address</Label>
                      <Input placeholder="Enter address" />
                    </div>
                    <div className="space-y-2">
                      <Label>City</Label>
                      <Input placeholder="Enter city" />
                    </div>
                    <div className="space-y-2">
                      <Label>Pin Code</Label>
                      <Input placeholder="Enter pin code" />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="academic" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Admission Number</Label>
                      <Input placeholder="Auto-generated" disabled />
                    </div>
                    <div className="space-y-2">
                      <Label>Admission Date</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>Class</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map(cls => (
                            <SelectItem key={cls} value={cls}>Class {cls}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Section</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select section" />
                        </SelectTrigger>
                        <SelectContent>
                          {['A', 'B', 'C', 'D'].map(sec => (
                            <SelectItem key={sec} value={sec}>Section {sec}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Roll Number</Label>
                      <Input placeholder="Enter roll number" />
                    </div>
                    <div className="space-y-2">
                      <Label>Previous School</Label>
                      <Input placeholder="Enter previous school (optional)" />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="guardian" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Guardian Name</Label>
                      <Input placeholder="Enter guardian name" />
                    </div>
                    <div className="space-y-2">
                      <Label>Relationship</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="father">Father</SelectItem>
                          <SelectItem value="mother">Mother</SelectItem>
                          <SelectItem value="guardian">Guardian</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Contact Number</Label>
                      <Input placeholder="Enter contact number" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input type="email" placeholder="Enter email" />
                    </div>
                    <div className="space-y-2">
                      <Label>Occupation</Label>
                      <Input placeholder="Enter occupation" />
                    </div>
                    <div className="space-y-2">
                      <Label>Annual Income</Label>
                      <Input placeholder="Enter annual income" />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-[#1A73E8] hover:bg-[#0D47A1]">Save Student</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Students</p>
                <h3 className="text-gray-800">1,247</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <UserPlus className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">New This Month</p>
                <h3 className="text-gray-800">23</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Plus className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg. Attendance</p>
                <h3 className="text-gray-800">94.2%</h3>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <UserPlus className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Fee Pending</p>
                <h3 className="text-gray-800">45</h3>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <UserPlus className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Student Records</CardTitle>
              <CardDescription>View and manage all student information</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by name, ID, or class..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Roll No</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Fee Status</TableHead>
                  <TableHead>Guardian</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student, index) => (
                  <motion.tr
                    key={student.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-[#1A73E8] text-white">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-gray-800">{student.name}</p>
                          <p className="text-xs text-gray-500">{student.contact}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{student.class}</Badge>
                    </TableCell>
                    <TableCell>{student.rollNo}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              student.attendance >= 90 ? 'bg-green-500' :
                              student.attendance >= 75 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${student.attendance}%` }}
                          />
                        </div>
                        <span className="text-sm">{student.attendance}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          student.feeStatus === 'paid' ? 'default' :
                          student.feeStatus === 'pending' ? 'secondary' :
                          'destructive'
                        }
                        className={
                          student.feeStatus === 'paid' ? 'bg-green-100 text-green-700' :
                          student.feeStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }
                      >
                        {student.feeStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>{student.guardian}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedStudent(student);
                              setViewDialogOpen(true);
                            }}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Student Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Student Profile</DialogTitle>
            <DialogDescription>Complete information about the student</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src="" />
                <AvatarFallback className="bg-[#1A73E8] text-white text-xl">
                  {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-gray-800 mb-1">{selectedStudent.name}</h3>
                <p className="text-sm text-gray-500 mb-2">Student ID: {selectedStudent.id}</p>
                <div className="flex gap-2">
                  <Badge>{selectedStudent.class}</Badge>
                  <Badge variant="outline">Roll No: {selectedStudent.rollNo}</Badge>
                  <Badge
                    className={
                      selectedStudent.feeStatus === 'paid' ? 'bg-green-100 text-green-700' :
                      selectedStudent.feeStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }
                  >
                    Fee: {selectedStudent.feeStatus}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Guardian Name</p>
                <p className="text-gray-800">{selectedStudent.guardian}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Contact Number</p>
                <p className="text-gray-800">{selectedStudent.contact}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Attendance Rate</p>
                <p className="text-gray-800">{selectedStudent.attendance}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Join Date</p>
                <p className="text-gray-800">{new Date(selectedStudent.joinDate).toLocaleDateString()}</p>
              </div>
            </div>

            <Tabs defaultValue="academic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="academic">Academic</TabsTrigger>
                <TabsTrigger value="attendance">Attendance</TabsTrigger>
                <TabsTrigger value="fees">Fees</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
              <TabsContent value="academic" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Recent Exam Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-sm">Mathematics</span>
                        <Badge>85%</Badge>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-sm">Science</span>
                        <Badge>92%</Badge>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-sm">English</span>
                        <Badge>78%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Social Studies</span>
                        <Badge>88%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="attendance">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-gray-600">Attendance tracking details will be shown here</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="fees">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-gray-600">Fee payment history and pending amounts will be shown here</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="documents">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-gray-600">Student documents and certificates will be shown here</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
