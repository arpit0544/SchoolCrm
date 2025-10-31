import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Send, 
  CreditCard,
  AlertCircle,
  CheckCircle,
  Clock,
  Filter,
  Search
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const feeRecords = [
  {
    id: 'FEE001',
    studentName: 'Aarav Sharma',
    class: '10-A',
    amount: 15000,
    paid: 15000,
    pending: 0,
    status: 'paid',
    dueDate: '2025-10-05',
    paidDate: '2025-10-03',
  },
  {
    id: 'FEE002',
    studentName: 'Priya Patel',
    class: '10-A',
    amount: 15000,
    paid: 15000,
    pending: 0,
    status: 'paid',
    dueDate: '2025-10-05',
    paidDate: '2025-10-04',
  },
  {
    id: 'FEE003',
    studentName: 'Rohan Kumar',
    class: '9-B',
    amount: 14000,
    paid: 7000,
    pending: 7000,
    status: 'partial',
    dueDate: '2025-10-05',
    paidDate: null,
  },
  {
    id: 'FEE004',
    studentName: 'Ananya Singh',
    class: '10-B',
    amount: 15000,
    paid: 15000,
    pending: 0,
    status: 'paid',
    dueDate: '2025-10-05',
    paidDate: '2025-10-02',
  },
  {
    id: 'FEE005',
    studentName: 'Arjun Mehta',
    class: '9-A',
    amount: 14000,
    paid: 0,
    pending: 14000,
    status: 'overdue',
    dueDate: '2025-09-05',
    paidDate: null,
  },
  {
    id: 'FEE006',
    studentName: 'Diya Reddy',
    class: '10-A',
    amount: 15000,
    paid: 15000,
    pending: 0,
    status: 'paid',
    dueDate: '2025-10-05',
    paidDate: '2025-10-01',
  },
];

const monthlyCollection = [
  { month: 'May', target: 500000, collected: 485000 },
  { month: 'Jun', target: 500000, collected: 492000 },
  { month: 'Jul', target: 500000, collected: 478000 },
  { month: 'Aug', target: 500000, collected: 495000 },
  { month: 'Sep', target: 500000, collected: 488000 },
  { month: 'Oct', target: 500000, collected: 412000 },
];

export default function FeeManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

  const totalAmount = feeRecords.reduce((sum, record) => sum + record.amount, 0);
  const totalCollected = feeRecords.reduce((sum, record) => sum + record.paid, 0);
  const totalPending = feeRecords.reduce((sum, record) => sum + record.pending, 0);
  const overdueCount = feeRecords.filter(r => r.status === 'overdue').length;

  const filteredRecords = feeRecords.filter(record =>
    record.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.class.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-gray-800 mb-1">Fee Management</h2>
          <p className="text-sm text-gray-500">Track fee collection, payments, and generate receipts</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2">
            <Send className="w-4 h-4" />
            Send Reminders
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
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
                <div className="bg-blue-500 p-3 rounded-lg">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-blue-100 text-blue-700">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +8.2%
                </Badge>
              </div>
              <h3 className="text-gray-800 mb-1">₹{(totalCollected / 100000).toFixed(1)}L</h3>
              <p className="text-sm text-gray-500">Total Collected</p>
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
                <div className="bg-orange-500 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-orange-100 text-orange-700">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  Pending
                </Badge>
              </div>
              <h3 className="text-gray-800 mb-1">₹{(totalPending / 1000).toFixed(0)}K</h3>
              <p className="text-sm text-gray-500">Pending Amount</p>
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
                <div className="bg-red-500 p-3 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-red-100 text-red-700">
                  Action Needed
                </Badge>
              </div>
              <h3 className="text-gray-800 mb-1">{overdueCount}</h3>
              <p className="text-sm text-gray-500">Overdue Students</p>
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
                <div className="bg-green-500 p-3 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-green-100 text-green-700">
                  This Month
                </Badge>
              </div>
              <h3 className="text-gray-800 mb-1">{((totalCollected / totalAmount) * 100).toFixed(1)}%</h3>
              <p className="text-sm text-gray-500">Collection Rate</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Monthly Collection Overview</CardTitle>
              <CardDescription>Target vs Actual collection</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyCollection}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="target" fill="#E0E0E0" name="Target" />
                  <Bar dataKey="collected" fill="#1A73E8" name="Collected" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Collection Trend</CardTitle>
              <CardDescription>6-month collection performance</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyCollection}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="collected" stroke="#1A73E8" strokeWidth={2} name="Collected" />
                  <Line type="monotone" dataKey="target" stroke="#34A853" strokeWidth={2} strokeDasharray="5 5" name="Target" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Fee Records Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Fee Records</CardTitle>
              <CardDescription>Detailed fee collection status</CardDescription>
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
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="overdue">Overdue</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fee ID</TableHead>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Total Amount</TableHead>
                      <TableHead>Paid</TableHead>
                      <TableHead>Pending</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRecords.map((record, index) => (
                      <motion.tr
                        key={record.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50"
                      >
                        <TableCell>{record.id}</TableCell>
                        <TableCell className="text-gray-800">{record.studentName}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{record.class}</Badge>
                        </TableCell>
                        <TableCell>₹{record.amount.toLocaleString()}</TableCell>
                        <TableCell className="text-green-600">₹{record.paid.toLocaleString()}</TableCell>
                        <TableCell className="text-orange-600">₹{record.pending.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              record.status === 'paid' ? 'bg-green-100 text-green-700' :
                              record.status === 'partial' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }
                          >
                            {record.status === 'paid' ? (
                              <>
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Paid
                              </>
                            ) : record.status === 'partial' ? (
                              <>
                                <Clock className="w-3 h-3 mr-1" />
                                Partial
                              </>
                            ) : (
                              <>
                                <AlertCircle className="w-3 h-3 mr-1" />
                                Overdue
                              </>
                            )}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className={record.status === 'overdue' ? 'text-red-600' : ''}>
                            {new Date(record.dueDate).toLocaleDateString()}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {record.pending > 0 && (
                              <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
                                <DialogTrigger asChild>
                                  <Button size="sm" className="bg-[#1A73E8] hover:bg-[#0D47A1]">
                                    <CreditCard className="w-3 h-3 mr-1" />
                                    Pay Now
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Process Payment</DialogTitle>
                                    <DialogDescription>
                                      Collect fee payment for {record.studentName}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                                      <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Student Name:</span>
                                        <span className="text-gray-800">{record.studentName}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Class:</span>
                                        <span className="text-gray-800">{record.class}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Total Amount:</span>
                                        <span className="text-gray-800">₹{record.amount.toLocaleString()}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Already Paid:</span>
                                        <span className="text-green-600">₹{record.paid.toLocaleString()}</span>
                                      </div>
                                      <div className="flex justify-between pt-2 border-t border-gray-200">
                                        <span className="text-gray-800">Pending Amount:</span>
                                        <span className="text-orange-600">₹{record.pending.toLocaleString()}</span>
                                      </div>
                                    </div>

                                    <div className="space-y-2">
                                      <Label>Payment Amount</Label>
                                      <Input
                                        type="number"
                                        placeholder="Enter amount"
                                        defaultValue={record.pending}
                                      />
                                    </div>

                                    <div className="space-y-2">
                                      <Label>Payment Mode</Label>
                                      <Select>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select payment mode" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="cash">Cash</SelectItem>
                                          <SelectItem value="online">Online - Razorpay</SelectItem>
                                          <SelectItem value="cheque">Cheque</SelectItem>
                                          <SelectItem value="card">Card</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>

                                    <div className="space-y-2">
                                      <Label>Transaction Reference (Optional)</Label>
                                      <Input placeholder="Enter transaction ID or reference" />
                                    </div>

                                    <div className="flex gap-2 pt-4">
                                      <Button variant="outline" className="flex-1">
                                        Cancel
                                      </Button>
                                      <Button className="flex-1 bg-[#1A73E8] hover:bg-[#0D47A1]">
                                        Process Payment & Generate Receipt
                                      </Button>
                                    </div>

                                    <p className="text-xs text-gray-500 text-center">
                                      Payment gateway integration: Razorpay / Paytm / Stripe
                                    </p>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            )}
                            <Button variant="outline" size="sm">
                              <Download className="w-3 h-3 mr-1" />
                              Receipt
                            </Button>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="paid">
              <p className="text-sm text-gray-500 text-center py-8">Showing only paid fee records</p>
            </TabsContent>
            <TabsContent value="pending">
              <p className="text-sm text-gray-500 text-center py-8">Showing only pending fee records</p>
            </TabsContent>
            <TabsContent value="overdue">
              <p className="text-sm text-gray-500 text-center py-8">Showing only overdue fee records</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🤖</span> AI Fee Insights
            </CardTitle>
            <CardDescription>Smart recommendations for fee management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="bg-red-100 p-2 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="text-gray-800 mb-1">Default Risk Alert</h4>
                    <p className="text-sm text-gray-600">5 students at high risk of fee default based on payment history</p>
                    <Button size="sm" variant="link" className="text-[#1A73E8] p-0 h-auto mt-2">
                      Send Reminders →
                    </Button>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-gray-800 mb-1">Collection Forecast</h4>
                    <p className="text-sm text-gray-600">Expected collection: ₹4.8L by end of month (96% target achievement)</p>
                    <Button size="sm" variant="link" className="text-[#1A73E8] p-0 h-auto mt-2">
                      View Forecast →
                    </Button>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-gray-800 mb-1">Best Collection Day</h4>
                    <p className="text-sm text-gray-600">Mondays show 23% higher payment success rate. Schedule reminders accordingly</p>
                    <Button size="sm" variant="link" className="text-[#1A73E8] p-0 h-auto mt-2">
                      Auto-Schedule →
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
