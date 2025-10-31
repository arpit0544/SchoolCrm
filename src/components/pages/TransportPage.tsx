import { motion } from 'motion/react';
import { Bus, MapPin, Phone, Users, Plus, Download } from 'lucide-react';
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
import { mockTransport } from '../../utils/mockData';

export function TransportPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-gray-900">Transport Management</h1>
          <p className="text-gray-600 mt-1">Manage school buses, routes, and transport details</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
          <Button className="bg-[#1A73E8] hover:bg-blue-600 gap-2">
            <Plus className="w-4 h-4" />
            Add Bus
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-6 card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Buses</p>
                <h3 className="text-gray-900 mt-2">{mockTransport.length}</h3>
                <Badge className="mt-2 bg-green-100 text-green-700">Active</Badge>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <Bus className="w-6 h-6 text-white" />
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
                <p className="text-sm text-gray-600">Total Students</p>
                <h3 className="text-gray-900 mt-2">
                  {mockTransport.reduce((sum, t) => sum + t.students, 0)}
                </h3>
                <p className="text-xs text-gray-500 mt-2">Using transport</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
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
                <p className="text-sm text-gray-600">Total Routes</p>
                <h3 className="text-gray-900 mt-2">{mockTransport.length}</h3>
                <p className="text-xs text-gray-500 mt-2">Active routes</p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
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
                <p className="text-sm text-gray-600">Capacity Usage</p>
                <h3 className="text-gray-900 mt-2">91.2%</h3>
                <Badge className="mt-2 bg-orange-100 text-orange-700">High</Badge>
              </div>
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                <Bus className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Bus Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockTransport.map((transport, index) => (
          <motion.div
            key={transport.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <Card className="p-6 card-hover">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#1A73E8] rounded-xl flex items-center justify-center">
                    <Bus className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900">{transport.routeName}</h3>
                    <p className="text-sm text-gray-600">{transport.busNumber}</p>
                  </div>
                </div>
                <Badge
                  className={
                    transport.students / transport.capacity > 0.9
                      ? 'bg-red-100 text-red-700'
                      : 'bg-green-100 text-green-700'
                  }
                >
                  {transport.students}/{transport.capacity}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Driver</span>
                  </div>
                  <span className="text-sm text-gray-900">{transport.driverName}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Contact</span>
                  </div>
                  <span className="text-sm text-gray-900">{transport.driverPhone}</span>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Route Stops</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {transport.stops.map((stop, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {idx + 1}. {stop}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <span className="text-sm text-gray-700">Timing</span>
                  <span className="text-sm text-[#1A73E8]">{transport.timing}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Track Live
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Route Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="p-6">
          <h3 className="text-gray-900 mb-4">All Routes Overview</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bus Number</TableHead>
                  <TableHead>Route Name</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTransport.map((transport) => (
                  <TableRow key={transport.id}>
                    <TableCell>{transport.busNumber}</TableCell>
                    <TableCell>{transport.routeName}</TableCell>
                    <TableCell>{transport.driverName}</TableCell>
                    <TableCell>{transport.driverPhone}</TableCell>
                    <TableCell>{transport.students}</TableCell>
                    <TableCell>{transport.capacity}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          transport.students / transport.capacity > 0.9
                            ? 'bg-red-100 text-red-700'
                            : 'bg-green-100 text-green-700'
                        }
                      >
                        {transport.students / transport.capacity > 0.9
                          ? 'Near Full'
                          : 'Available'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
