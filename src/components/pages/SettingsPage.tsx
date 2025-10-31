import { motion } from 'motion/react';
import { School, Globe, Bell, Lock, Users, Database, Palette, Mail } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your school configuration and preferences</p>
      </motion.div>

      <Tabs defaultValue="school" className="space-y-6">
        <TabsList>
          <TabsTrigger value="school">School Info</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        {/* School Information */}
        <TabsContent value="school">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#1A73E8] rounded-xl flex items-center justify-center">
                  <School className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-900">School Information</h3>
                  <p className="text-sm text-gray-600">Update your school details</p>
                </div>
              </div>

              <div className="space-y-4 max-w-2xl">
                <div>
                  <Label htmlFor="school-name">School Name</Label>
                  <Input
                    id="school-name"
                    placeholder="Enter school name"
                    defaultValue="Demo High School"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="school-code">School Code</Label>
                  <Input
                    id="school-code"
                    placeholder="Enter school code"
                    defaultValue="DEMO001"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="school@example.com"
                    defaultValue="info@demoschool.com"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+91 1234567890"
                    defaultValue="+91 9876543210"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    placeholder="Enter school address"
                    defaultValue="123 Education Street, Bangalore"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    placeholder="https://yourschool.com"
                    defaultValue="https://demoschool.com"
                    className="mt-1.5"
                  />
                </div>

                <Button className="bg-[#1A73E8] hover:bg-blue-600">
                  Save Changes
                </Button>
              </div>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-900">Notification Settings</h3>
                  <p className="text-sm text-gray-600">Manage notification preferences</p>
                </div>
              </div>

              <div className="space-y-6 max-w-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-900">Email Notifications</p>
                    <p className="text-sm text-gray-600">Receive email alerts for important updates</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-900">SMS Notifications</p>
                    <p className="text-sm text-gray-600">Get SMS alerts for critical events</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-900">Fee Reminders</p>
                    <p className="text-sm text-gray-600">Automatic fee payment reminders</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-900">Attendance Alerts</p>
                    <p className="text-sm text-gray-600">Get notified about attendance issues</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-900">Exam Notifications</p>
                    <p className="text-sm text-gray-600">Reminders for upcoming exams</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Button className="bg-[#1A73E8] hover:bg-blue-600">
                  Save Preferences
                </Button>
              </div>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-900">Security Settings</h3>
                  <p className="text-sm text-gray-600">Manage security and access control</p>
                </div>
              </div>

              <div className="space-y-6 max-w-2xl">
                <div>
                  <h4 className="text-gray-900 mb-4">Change Password</h4>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        placeholder="Enter current password"
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="Enter new password"
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm new password"
                        className="mt-1.5"
                      />
                    </div>
                    <Button className="bg-[#1A73E8] hover:bg-blue-600">
                      Update Password
                    </Button>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h4 className="text-gray-900 mb-4">Two-Factor Authentication</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-900">Enable 2FA</p>
                      <p className="text-sm text-gray-600">Add an extra layer of security</p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h4 className="text-gray-900 mb-4">Session Management</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-900">Auto Logout</p>
                      <p className="text-sm text-gray-600">Automatically logout after inactivity</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Appearance */}
        <TabsContent value="appearance">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-900">Appearance Settings</h3>
                  <p className="text-sm text-gray-600">Customize the look and feel</p>
                </div>
              </div>

              <div className="space-y-6 max-w-2xl">
                <div>
                  <h4 className="text-gray-900 mb-4">Theme</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <button className="p-4 border-2 border-[#1A73E8] rounded-lg bg-white">
                      <div className="aspect-square bg-gradient-to-br from-blue-50 to-white rounded mb-2" />
                      <p className="text-sm">Light</p>
                    </button>
                    <button className="p-4 border-2 border-gray-200 rounded-lg">
                      <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded mb-2" />
                      <p className="text-sm">Dark</p>
                    </button>
                    <button className="p-4 border-2 border-gray-200 rounded-lg">
                      <div className="aspect-square bg-gradient-to-br from-blue-50 via-white to-gray-800 rounded mb-2" />
                      <p className="text-sm">Auto</p>
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-gray-900 mb-4">Display</h4>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-900">Compact Mode</p>
                      <p className="text-sm text-gray-600">Reduce spacing for more content</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-900">Sidebar Collapsed</p>
                      <p className="text-sm text-gray-600">Start with collapsed sidebar</p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <Button className="bg-[#1A73E8] hover:bg-blue-600">
                  Save Preferences
                </Button>
              </div>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
