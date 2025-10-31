import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Search, Filter, Download, Edit, Trash, Clock, Users, BookOpen } from 'lucide-react';
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
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { toast } from 'sonner';

interface TimetableEntry {
  id: string;
  subject: string;
  time: string;
  class: string;
  section: string;
  teacher: string;
  day: string;
  room?: string;
}

const mockTimetable: TimetableEntry[] = [
  {
    id: '1',
    subject: 'Mathematics',
    time: '8:00 AM - 9:00 AM',
    class: '10',
    section: 'A',
    teacher: 'Dr. Sanjay Mehta',
    day: 'Monday',
    room: 'Room 101',
  },
  {
    id: '2',
    subject: 'English',
    time: '9:00 AM - 10:00 AM',
    class: '10',
    section: 'A',
    teacher: 'Mrs. Kavita Singh',
    day: 'Monday',
    room: 'Room 102',
  },
  {
    id: '3',
    subject: 'Physics',
    time: '10:00 AM - 11:00 AM',
    class: '10',
    section: 'A',
    teacher: 'Dr. Sanjay Mehta',
    day: 'Monday',
    room: 'Lab 1',
  },
  {
    id: '4',
    subject: 'Chemistry',
    time: '11:30 AM - 12:30 PM',
    class: '10',
    section: 'A',
    teacher: 'Mr. Ramesh Patel',
    day: 'Monday',
    room: 'Lab 2',
  },
  {
    id: '5',
    subject: 'Physical Education',
    time: '2:00 PM - 3:00 PM',
    class: '10',
    section: 'A',
    teacher: 'Mr. Suresh Kumar',
    day: 'Monday',
    room: 'Sports Ground',
  },
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const timeSlots = [
  '8:00 AM - 9:00 AM',
  '9:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:30 AM - 12:30 PM',
  '12:30 PM - 1:30 PM',
  '2:00 PM - 3:00 PM',
  '3:00 PM - 4:00 PM',
];

export function TimetablePage() {
  const [timetable, setTimetable] = useState<TimetableEntry[]>(mockTimetable);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('10');
  const [selectedSection, setSelectedSection] = useState('A');
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [newEntry, setNewEntry] = useState({
    subject: '',
    time: '',
    teacher: '',
    day: 'Monday',
    room: '',
  });

  const filteredTimetable = timetable.filter(
    (entry) =>
      entry.class === selectedClass &&
      entry.section === selectedSection &&
      entry.day === selectedDay &&
      (entry.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.teacher.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddEntry = () => {
    if (!newEntry.subject || !newEntry.time || !newEntry.teacher) {
      toast.error('Please fill all required fields');
      return;
    }

    const entry: TimetableEntry = {
      id: `${timetable.length + 1}`,
      subject: newEntry.subject,
      time: newEntry.time,
      class: selectedClass,
      section: selectedSection,
      teacher: newEntry.teacher,
      day: newEntry.day,
      room: newEntry.room,
    };

    setTimetable([...timetable, entry]);
    setIsAddDialogOpen(false);
    setNewEntry({ subject: '', time: '', teacher: '', day: 'Monday', room: '' });
    toast.success('Timetable entry added successfully');
  };

  const handleDeleteEntry = (id: string) => {
    setTimetable(timetable.filter((entry) => entry.id !== id));
    toast.success('Entry deleted successfully');
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
          <h1 className="text-gray-900">Timetable Management</h1>
          <p className="text-gray-600 mt-1">Manage class schedules and time slots</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button
            className="bg-[#1A73E8] hover:bg-blue-600 gap-2"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Add Time Slot
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
                <p className="text-sm text-gray-600">Total Subjects</p>
                <h3 className="text-gray-900">12</h3>
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
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Time Slots</p>
                <h3 className="text-gray-900">7</h3>
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
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Classes</p>
                <h3 className="text-gray-900">8</h3>
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
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Teachers</p>
                <h3 className="text-gray-900">28</h3>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Filters */}
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
                placeholder="Search by subject or teacher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9">Class 9</SelectItem>
                  <SelectItem value="10">Class 10</SelectItem>
                  <SelectItem value="11">Class 11</SelectItem>
                  <SelectItem value="12">Class 12</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedSection} onValueChange={setSelectedSection}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">Section A</SelectItem>
                  <SelectItem value="B">Section B</SelectItem>
                  <SelectItem value="C">Section C</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedDay} onValueChange={setSelectedDay}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Day" />
                </SelectTrigger>
                <SelectContent>
                  {days.map((day) => (
                    <SelectItem key={day} value={day}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Current Selection Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-2 text-gray-700">
          <span>Showing timetable for:</span>
          <Badge className="bg-blue-100 text-blue-700">
            Class {selectedClass}-{selectedSection}
          </Badge>
          <Badge className="bg-purple-100 text-purple-700">{selectedDay}</Badge>
        </div>
      </motion.div>

      {/* Timetable Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTimetable.length > 0 ? (
                  filteredTimetable.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-[#1A73E8]" />
                          <span className="text-gray-900">{entry.subject}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{entry.time}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-blue-100 text-blue-700">
                          {entry.class}-{entry.section}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-gray-700">{entry.teacher}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-gray-600">{entry.room || 'Not assigned'}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteEntry(entry.id)}
                          >
                            <Trash className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <p className="text-gray-500">No timetable entries for this selection</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </motion.div>

      {/* Add Entry Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Time Slot</DialogTitle>
            <DialogDescription>
              Add a new subject to the timetable for Class {selectedClass}-{selectedSection}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                placeholder="e.g., Mathematics"
                value={newEntry.subject}
                onChange={(e) => setNewEntry({ ...newEntry, subject: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="time">Time Slot *</Label>
              <Select value={newEntry.time} onValueChange={(value) => setNewEntry({ ...newEntry, time: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="teacher">Teacher *</Label>
              <Input
                id="teacher"
                placeholder="e.g., Dr. Sanjay Mehta"
                value={newEntry.teacher}
                onChange={(e) => setNewEntry({ ...newEntry, teacher: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="day">Day *</Label>
              <Select value={newEntry.day} onValueChange={(value) => setNewEntry({ ...newEntry, day: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {days.map((day) => (
                    <SelectItem key={day} value={day}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="room">Room</Label>
              <Input
                id="room"
                placeholder="e.g., Room 101"
                value={newEntry.room}
                onChange={(e) => setNewEntry({ ...newEntry, room: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-[#1A73E8] hover:bg-blue-600" onClick={handleAddEntry}>
              Add to Timetable
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
