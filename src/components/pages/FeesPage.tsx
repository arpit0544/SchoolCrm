import { useState } from 'react';
import { motion } from 'motion/react';
import {
  DollarSign,
  Search,
  Filter,
  Download,
  CreditCard,
  AlertCircle,
  Check,
  Clock,
  TrendingUp,
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
import { Label } from '../ui/label';
import { mockFees } from '../../utils/mockData';
import { Fee } from '../../types';

export function FeesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFee, setSelectedFee] = useState<Fee | null>(null);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');

  const filteredFees = mockFees.filter(
    (fee) =>
      fee.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fee.class.includes(searchQuery)
  );

  const totalRevenue = mockFees.reduce((sum, fee) => sum + fee.paidAmount, 0);
  const totalPending = mockFees.reduce((sum, fee) => sum + fee.pendingAmount, 0);
  const paidFees = mockFees.filter((f) => f.status === 'paid').length;
  const overdueFees = mockFees.filter((f) => f.status === 'overdue').length;

  const handleCollectPayment = (fee: Fee) => {
    setSelectedFee(fee);
    setPaymentAmount(fee.pendingAmount.toString());
    setIsPaymentDialogOpen(true);
  };

  const handlePayment = () => {
    // In a real app, this would process the payment
    alert(`Payment of ₹${paymentAmount} processed successfully!`);
    setIsPaymentDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'overdue':
        return 'bg-red-100 text-red-700';
      case 'partial':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
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
          <h1 className="text-gray-900">Fee Management</h1>
          <p className="text-gray-600 mt-1">Track and manage all fee payments</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
          <Button className="bg-[#1A73E8] hover:bg-blue-600 gap-2">
            <CreditCard className="w-4 h-4" />
            Collect Payment
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-6 card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <h3 className="text-gray-900 mt-2">₹{totalRevenue.toLocaleString()}</h3>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+12.5%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
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
                <p className="text-sm text-gray-600">Pending Amount</p>
                <h3 className="text-gray-900 mt-2">₹{totalPending.toLocaleString()}</h3>
                <p className="text-xs text-gray-500 mt-2">
                  {mockFees.filter((f) => f.status !== 'paid').length} students
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
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
                <p className="text-sm text-gray-600">Paid Fees</p>
                <h3 className="text-gray-900 mt-2">{paidFees}</h3>
                <p className="text-xs text-gray-500 mt-2">
                  {((paidFees / mockFees.length) * 100).toFixed(1)}% of total
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
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
                <p className="text-sm text-gray-600">Overdue Fees</p>
                <h3 className="text-gray-900 mt-2">{overdueFees}</h3>
                <Badge className="mt-2 bg-red-100 text-red-700">Action Required</Badge>
              </div>
              <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
            </div>
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
                placeholder="Search by student name or class..."
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

      {/* Fees Table */}
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
                  <TableHead>Student Name</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Fee Type</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Paid Amount</TableHead>
                  <TableHead>Pending Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFees.map((fee) => (
                  <TableRow key={fee.id}>
                    <TableCell>
                      <div>
                        <p className="text-sm text-gray-900">{fee.studentName}</p>
                        {fee.lastPaymentDate && (
                          <p className="text-xs text-gray-500">
                            Last paid: {fee.lastPaymentDate}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-blue-100 text-blue-700">
                        {fee.class}-{fee.section}
                      </Badge>
                    </TableCell>
                    <TableCell className="capitalize">{fee.feeType}</TableCell>
                    <TableCell>₹{fee.totalAmount.toLocaleString()}</TableCell>
                    <TableCell className="text-green-600">
                      ₹{fee.paidAmount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-red-600">
                      ₹{fee.pendingAmount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <span
                        className={
                          new Date(fee.dueDate) < new Date() && fee.status !== 'paid'
                            ? 'text-red-600'
                            : ''
                        }
                      >
                        {fee.dueDate}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(fee.status)}>{fee.status}</Badge>
                    </TableCell>
                    <TableCell>
                      {fee.status !== 'paid' && (
                        <Button
                          size="sm"
                          onClick={() => handleCollectPayment(fee)}
                          className="bg-[#1A73E8] hover:bg-blue-600"
                        >
                          Collect
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </motion.div>

      {/* Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Collect Fee Payment</DialogTitle>
            <DialogDescription>Process fee payment for the student</DialogDescription>
          </DialogHeader>
          {selectedFee && (
            <div className="space-y-4">
              {/* Student Info */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Student</p>
                <p className="text-gray-900 mt-1">{selectedFee.studentName}</p>
                <p className="text-sm text-gray-600 mt-2">Class</p>
                <p className="text-gray-900 mt-1">
                  {selectedFee.class}-{selectedFee.section}
                </p>
              </div>

              {/* Fee Details */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Fee:</span>
                  <span className="text-gray-900">
                    ₹{selectedFee.totalAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Already Paid:</span>
                  <span className="text-green-600">
                    ₹{selectedFee.paidAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-900">Pending Amount:</span>
                  <span className="text-red-600">
                    ₹{selectedFee.pendingAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Payment Amount Input */}
              <div>
                <Label htmlFor="amount">Payment Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="mt-1.5"
                />
              </div>

              {/* Payment Method */}
              <div>
                <Label>Payment Method</Label>
                <div className="grid grid-cols-3 gap-2 mt-1.5">
                  <Button variant="outline" className="w-full">
                    Cash
                  </Button>
                  <Button variant="outline" className="w-full">
                    Card
                  </Button>
                  <Button variant="outline" className="w-full">
                    Online
                  </Button>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePayment} className="bg-[#1A73E8] hover:bg-blue-600">
              Process Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
