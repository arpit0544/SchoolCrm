import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Plus,
  Search,
  BookOpen,
  Users,
  AlertCircle,
  CheckCircle,
  Calendar,
  Filter,
  Download,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { toast } from 'sonner';
import { mockStudents, mockBookIssues, mockLibraryBooks } from '../../utils/mockData';
import { BookIssue, LibraryBook } from '../../types';

export function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [bookIssues, setBookIssues] = useState<BookIssue[]>(mockBookIssues);
  const [books] = useState<LibraryBook[]>(mockLibraryBooks);
  const [isIssueDialogOpen, setIsIssueDialogOpen] = useState(false);
  const [isReturnDialogOpen, setIsReturnDialogOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<BookIssue | null>(null);

  const [issueForm, setIssueForm] = useState({
    studentId: '',
    bookId: '',
  });

  // Filter students by class and search
  const filteredStudents = mockStudents.filter((student) => {
    const matchesClass = selectedClass === 'all' || student.class === selectedClass;
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.admissionNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClass && matchesSearch;
  });

  // Get student's issued books
  const getStudentBooks = (studentId: string) => {
    return bookIssues.filter((issue) => issue.studentId === studentId);
  };

  // Calculate overdue days
  const getOverdueDays = (dueDate: string): number => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = today.getTime() - due.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const handleIssueBook = () => {
    if (!issueForm.studentId || !issueForm.bookId) {
      toast.error('Please select both student and book');
      return;
    }

    const student = mockStudents.find((s) => s.id === issueForm.studentId);
    const book = books.find((b) => b.id === issueForm.bookId);

    if (!student || !book) {
      toast.error('Invalid student or book');
      return;
    }

    const newIssue: BookIssue = {
      id: `${bookIssues.length + 1}`,
      bookId: book.id,
      bookTitle: book.title,
      studentId: student.id,
      studentName: student.name,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'issued',
    };

    setBookIssues([...bookIssues, newIssue]);
    setIsIssueDialogOpen(false);
    setIssueForm({ studentId: '', bookId: '' });
    toast.success('Book issued successfully');
  };

  const handleReturnBook = () => {
    if (!selectedIssue) return;

    const overdueDays = getOverdueDays(selectedIssue.dueDate);
    const fine = overdueDays > 0 ? overdueDays * 5 : 0;

    setBookIssues(
      bookIssues.map((issue) =>
        issue.id === selectedIssue.id
          ? {
              ...issue,
              status: 'returned',
              returnDate: new Date().toISOString().split('T')[0],
              fine: fine,
            }
          : issue
      )
    );

    setIsReturnDialogOpen(false);
    setSelectedIssue(null);
    toast.success(
      fine > 0
        ? `Book returned with fine of ₹${fine}`
        : 'Book returned successfully'
    );
  };

  const openReturnDialog = (issue: BookIssue) => {
    setSelectedIssue(issue);
    setIsReturnDialogOpen(true);
  };

  // Stats
  const totalIssued = bookIssues.filter((i) => i.status === 'issued').length;
  const totalOverdue = bookIssues.filter((i) => i.status === 'overdue').length;
  const totalReturned = bookIssues.filter((i) => i.status === 'returned').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-gray-900">Library Management</h1>
          <p className="text-gray-600 mt-1">Manage book issues and returns</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button
            className="bg-[#1A73E8] hover:bg-blue-600 gap-2"
            onClick={() => setIsIssueDialogOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Issue Book
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-[#1A73E8]" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Books</p>
                <h3 className="text-gray-900">2,450</h3>
              </div>
            </div>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Issued</p>
                <h3 className="text-gray-900">{totalIssued}</h3>
              </div>
            </div>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Overdue</p>
                <h3 className="text-gray-900">{totalOverdue}</h3>
              </div>
            </div>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Returned</p>
                <h3 className="text-gray-900">{totalReturned}</h3>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6">
          <Tabs defaultValue="students">
            <TabsList className="mb-6">
              <TabsTrigger value="students">Students & Books</TabsTrigger>
              <TabsTrigger value="issues">All Issues</TabsTrigger>
              <TabsTrigger value="inventory">Book Inventory</TabsTrigger>
            </TabsList>

            {/* Students & Books Tab */}
            <TabsContent value="students" className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search by student name or admission number..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
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
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Issued Books</TableHead>
                      <TableHead>Return Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => {
                      const studentBooks = getStudentBooks(student.id);
                      const activeBooks = studentBooks.filter(
                        (b) => b.status === 'issued' || b.status === 'overdue'
                      );

                      return (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-[#1A73E8] rounded-full flex items-center justify-center">
                                <span className="text-white text-sm">
                                  {student.name
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')
                                    .toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <p className="text-sm text-gray-900">{student.name}</p>
                                <p className="text-xs text-gray-500">{student.admissionNumber}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-blue-100 text-blue-700">
                              {student.class}-{student.section}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {activeBooks.length > 0 ? (
                              <div className="space-y-1">
                                {activeBooks.map((book) => (
                                  <p key={book.id} className="text-sm text-gray-700">
                                    {book.bookTitle}
                                  </p>
                                ))}
                              </div>
                            ) : (
                              <span className="text-sm text-gray-500">No books issued</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {activeBooks.length > 0 ? (
                              <div className="space-y-1">
                                {activeBooks.map((book) => (
                                  <div key={book.id} className="flex items-center gap-1 text-sm">
                                    <Calendar className="w-3 h-3 text-gray-500" />
                                    <span className="text-gray-700">{book.dueDate}</span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <span className="text-sm text-gray-500">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {activeBooks.length > 0 ? (
                              <div className="space-y-1">
                                {activeBooks.map((book) => {
                                  const overdue = getOverdueDays(book.dueDate) > 0;
                                  return (
                                    <Badge
                                      key={book.id}
                                      className={
                                        overdue
                                          ? 'bg-red-100 text-red-700'
                                          : 'bg-green-100 text-green-700'
                                      }
                                    >
                                      {overdue ? 'Overdue' : 'Active'}
                                    </Badge>
                                  );
                                })}
                              </div>
                            ) : (
                              <Badge className="bg-gray-100 text-gray-700">No Issues</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {activeBooks.length > 0 && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => openReturnDialog(activeBooks[0])}
                              >
                                Collect Book
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* All Issues Tab */}
            <TabsContent value="issues">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Book</TableHead>
                      <TableHead>Issue Date</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Return Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Fine</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookIssues.map((issue) => {
                      const overdue = issue.status === 'issued' && getOverdueDays(issue.dueDate) > 0;
                      return (
                        <TableRow key={issue.id}>
                          <TableCell className="text-gray-900">{issue.studentName}</TableCell>
                          <TableCell className="text-gray-700">{issue.bookTitle}</TableCell>
                          <TableCell className="text-gray-600">{issue.issueDate}</TableCell>
                          <TableCell className="text-gray-600">{issue.dueDate}</TableCell>
                          <TableCell className="text-gray-600">
                            {issue.returnDate || '-'}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                overdue
                                  ? 'bg-red-100 text-red-700'
                                  : issue.status === 'returned'
                                  ? 'bg-gray-100 text-gray-700'
                                  : 'bg-green-100 text-green-700'
                              }
                            >
                              {overdue ? 'Overdue' : issue.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-700">
                            {issue.fine ? `₹${issue.fine}` : '-'}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Book Inventory Tab */}
            <TabsContent value="inventory">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ISBN</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Total Copies</TableHead>
                      <TableHead>Available</TableHead>
                      <TableHead>Issued</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {books.map((book) => (
                      <TableRow key={book.id}>
                        <TableCell className="text-gray-600">{book.isbn}</TableCell>
                        <TableCell className="text-gray-900">{book.title}</TableCell>
                        <TableCell className="text-gray-700">{book.author}</TableCell>
                        <TableCell>
                          <Badge className="bg-purple-100 text-purple-700">
                            {book.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-700">{book.totalCopies}</TableCell>
                        <TableCell>
                          <span className="text-green-600">{book.availableCopies}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-blue-600">{book.issuedCopies}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </motion.div>

      {/* Issue Book Dialog */}
      <Dialog open={isIssueDialogOpen} onOpenChange={setIsIssueDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Issue Book</DialogTitle>
            <DialogDescription>Select a student and book to issue</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="student">Student *</Label>
              <Select
                value={issueForm.studentId}
                onValueChange={(value) => setIssueForm({ ...issueForm, studentId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select student" />
                </SelectTrigger>
                <SelectContent>
                  {mockStudents.map((student) => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.name} - {student.class}-{student.section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="book">Book *</Label>
              <Select
                value={issueForm.bookId}
                onValueChange={(value) => setIssueForm({ ...issueForm, bookId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select book" />
                </SelectTrigger>
                <SelectContent>
                  {books
                    .filter((book) => book.availableCopies > 0)
                    .map((book) => (
                      <SelectItem key={book.id} value={book.id}>
                        {book.title} - {book.author}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Note:</strong> Books must be returned within 14 days. Late returns will
                incur a fine of ₹5 per day.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsIssueDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-[#1A73E8] hover:bg-blue-600" onClick={handleIssueBook}>
              Issue Book
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Return Book Dialog */}
      <Dialog open={isReturnDialogOpen} onOpenChange={setIsReturnDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Return Book</DialogTitle>
            <DialogDescription>Collect the book from student</DialogDescription>
          </DialogHeader>
          {selectedIssue && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Student</p>
                <p className="text-gray-900">{selectedIssue.studentName}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Book</p>
                <p className="text-gray-900">{selectedIssue.bookTitle}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Issue Date</p>
                  <p className="text-gray-900">{selectedIssue.issueDate}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Due Date</p>
                  <p className="text-gray-900">{selectedIssue.dueDate}</p>
                </div>
              </div>
              {getOverdueDays(selectedIssue.dueDate) > 0 && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-900">
                    <strong>Overdue:</strong> {getOverdueDays(selectedIssue.dueDate)} days
                  </p>
                  <p className="text-sm text-red-900 mt-1">
                    <strong>Fine:</strong> ₹{getOverdueDays(selectedIssue.dueDate) * 5}
                  </p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReturnDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-[#1A73E8] hover:bg-blue-600" onClick={handleReturnBook}>
              Mark as Returned
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
