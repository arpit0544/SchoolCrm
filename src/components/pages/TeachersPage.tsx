import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  MoreVertical,
  Edit,
  Trash,
  Eye,
  Mail,
  Phone,
  BookOpen,
  Users,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import { mockTeachers } from '../../utils/mockData';
import { Teacher } from '../../types';

export function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Form state for adding teacher
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    qualification: '',
  });

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.subjects.some((subject) =>
        subject.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const handleViewTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsViewDialogOpen(true);
  };

  const handleAddTeacher = () => {
    if (!newTeacher.name || !newTeacher.email || !newTeacher.phone || !newTeacher.subject) {
      toast.error('Please fill all required fields');
      return;
    }

    const teacher: Teacher = {
      id: `T${String(teachers.length + 1).padStart(3, '0')}`,
      employeeId: `EMP${String(teachers.length + 1).padStart(3, '0')}`,
      name: newTeacher.name,
      email: newTeacher.email,
      phone: newTeacher.phone,
      subjects: [newTeacher.subject],
      classes: [],
      dateOfJoining: new Date().toISOString().split('T')[0],
      qualification: newTeacher.qualification,
      status: 'active',
    };

    setTeachers([...teachers, teacher]);
    setIsAddDialogOpen(false);
    setNewTeacher({ name: '', email: '', phone: '', subject: '', qualification: '' });
    toast.success('Teacher added successfully');
  };

  const handleDeleteTeacher = () => {
    if (selectedTeacher) {
      setTeachers(teachers.filter((t) => t.id !== selectedTeacher.id));
      setIsDeleteDialogOpen(false);
      setSelectedTeacher(null);
      toast.success('Teacher removed successfully');
    }
  };

  const openDeleteDialog = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-gray-900">Teacher Management</h1>
          <p className="text-gray-600 mt-1">Manage all teacher records and information</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Upload className="w-4 h-4" />
            Import
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button
            className="bg-[#1A73E8] hover:bg-blue-600 gap-2"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Add Teacher
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-4">
            <p className="text-sm text-gray-600">Total Teachers</p>
            <h3 className="text-gray-900 mt-1">{teachers.length}</h3>
            <Badge className="mt-2 bg-green-100 text-green-700">Active</Badge>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4">
            <p className="text-sm text-gray-600">Active Teachers</p>
            <h3 className="text-gray-900 mt-1">
              {teachers.filter((t) => t.status === 'active').length}
            </h3>
            <p className="text-xs text-gray-500 mt-2">
              {(
                (teachers.filter((t) => t.status === 'active').length / teachers.length) *
                100
              ).toFixed(1)}
              %
            </p>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-4">
            <p className="text-sm text-gray-600">Departments</p>
            <h3 className="text-gray-900 mt-1">8</h3>
            <p className="text-xs text-gray-500 mt-2">Science, Arts, Commerce</p>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-4">
            <p className="text-sm text-gray-600">New Joinings</p>
            <h3 className="text-gray-900 mt-1">3</h3>
            <Badge className="mt-2 bg-blue-100 text-blue-700">This Month</Badge>
          </Card>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name, employee ID, subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Teachers Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Teacher Name</TableHead>
                  <TableHead>Subject(s)</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Classes</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>{teacher.employeeId}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#1A73E8] rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">
                            {teacher.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                              .toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-900">{teacher.name}</p>
                          <p className="text-xs text-gray-500">{teacher.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {teacher.subjects.map((subject, idx) => (
                          <Badge key={idx} className="bg-purple-100 text-purple-700">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-gray-700">{teacher.phone}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{teacher.classes.length} Classes</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          teacher.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }
                      >
                        {teacher.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewTeacher(teacher)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => openDeleteDialog(teacher)}
                          >
                            <Trash className="w-4 h-4 mr-2" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </motion.div>

      {/* View Teacher Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Teacher Details</DialogTitle>
            <DialogDescription>Complete information about the teacher</DialogDescription>
          </DialogHeader>
          {selectedTeacher && (
            <div className="space-y-6">
              {/* Teacher Header */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-20 h-20 bg-[#1A73E8] rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">
                    {selectedTeacher.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="text-gray-900">{selectedTeacher.name}</h3>
                  <p className="text-gray-600">{selectedTeacher.employeeId}</p>
                  <Badge className="mt-1 bg-purple-100 text-purple-700">
                    {selectedTeacher.subjects.join(', ')}
                  </Badge>
                </div>
              </div>

              {/* Teacher Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <p className="text-gray-900 text-sm">{selectedTeacher.email}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <p className="text-gray-900 text-sm">{selectedTeacher.phone}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Qualification</p>
                  <div className="flex items-center gap-2 mt-1">
                    <BookOpen className="w-4 h-4 text-gray-500" />
                    <p className="text-gray-900 text-sm">{selectedTeacher.qualification}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date of Joining</p>
                  <p className="text-gray-900 mt-1">{selectedTeacher.dateOfJoining}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <Badge
                    className={
                      selectedTeacher.status === 'active'
                        ? 'bg-green-100 text-green-700 mt-1'
                        : 'bg-red-100 text-red-700 mt-1'
                    }
                  >
                    {selectedTeacher.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Classes Assigned</p>
                  <p className="text-gray-900 mt-1">
                    {selectedTeacher.classes.length > 0
                      ? selectedTeacher.classes.join(', ')
                      : 'Not assigned'}
                  </p>
                </div>
              </div>

              {/* Subjects */}
              <div>
                <h4 className="text-gray-900 mb-3">Subjects</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTeacher.subjects.map((subject, idx) => (
                    <Badge key={idx} className="bg-purple-100 text-purple-700">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Teacher Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Teacher</DialogTitle>
            <DialogDescription>Add a new teacher to the school</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Enter teacher name"
                value={newTeacher.name}
                onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="teacher@school.com"
                value={newTeacher.email}
                onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                placeholder="+91 9876543210"
                value={newTeacher.phone}
                onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                placeholder="e.g., Mathematics"
                value={newTeacher.subject}
                onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="qualification">Qualification</Label>
              <Input
                id="qualification"
                placeholder="e.g., M.Sc, B.Ed"
                value={newTeacher.qualification}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, qualification: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-[#1A73E8] hover:bg-blue-600" onClick={handleAddTeacher}>
              Add Teacher
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this teacher? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedTeacher && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-900">{selectedTeacher.name}</p>
              <p className="text-sm text-gray-600">{selectedTeacher.employeeId}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDeleteTeacher}
            >
              Remove Teacher
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
