# SkillLogic School Management System - API Structure

## Base URL
```
Production: https://api.skilllogictech.in/v1
Staging: https://api-staging.skilllogictech.in/v1
Development: http://localhost:3000/api/v1
```

## Authentication
All API requests require authentication using JWT tokens.

```
Headers:
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

---

## 1. Authentication Module

### POST /auth/login
Login to the system
```json
Request:
{
  "email": "admin@school.com",
  "password": "password123",
  "schoolId": "school_xyz"
}

Response:
{
  "success": true,
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_123",
      "name": "Admin User",
      "email": "admin@school.com",
      "role": "admin",
      "schoolId": "school_xyz"
    }
  }
}
```

### POST /auth/logout
Logout from the system

### POST /auth/refresh
Refresh JWT token

### POST /auth/forgot-password
Request password reset

### POST /auth/reset-password
Reset password with token

---

## 2. Dashboard Module

### GET /dashboard/stats
Get overall dashboard statistics
```json
Response:
{
  "success": true,
  "data": {
    "totalStudents": 1247,
    "totalTeachers": 86,
    "feeCollection": 1240000,
    "attendanceToday": 94.2,
    "trends": {
      "students": "+12.5%",
      "teachers": "+3.2%",
      "fees": "+8.7%",
      "attendance": "-2.1%"
    }
  }
}
```

### GET /dashboard/recent-activities
Get recent activities timeline

### GET /dashboard/upcoming-events
Get upcoming events

### GET /dashboard/ai-insights
Get AI-powered insights and recommendations

---

## 3. Student Management Module

### GET /students
Get all students with pagination and filters
```
Query Parameters:
- page: number (default: 1)
- limit: number (default: 50)
- class: string (optional)
- section: string (optional)
- feeStatus: paid|pending|overdue (optional)
- search: string (optional)
```

### GET /students/:id
Get student details by ID

### POST /students
Create new student admission
```json
Request:
{
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "2010-05-15",
  "gender": "male",
  "class": "10",
  "section": "A",
  "rollNumber": "15",
  "address": "123 Main St",
  "city": "Mumbai",
  "pinCode": "400001",
  "guardian": {
    "name": "Jane Doe",
    "relationship": "mother",
    "contact": "9876543210",
    "email": "jane@example.com",
    "occupation": "Teacher",
    "annualIncome": "500000"
  }
}

Response:
{
  "success": true,
  "data": {
    "id": "ST001",
    "admissionNumber": "2025/ST/001",
    "message": "Student admitted successfully"
  }
}
```

### PUT /students/:id
Update student information

### DELETE /students/:id
Delete student record

### GET /students/:id/attendance
Get student attendance history

### GET /students/:id/fees
Get student fee details

### GET /students/:id/results
Get student exam results

### POST /students/import
Bulk import students via CSV/Excel

### GET /students/export
Export students data

---

## 4. Fee Management Module

### GET /fees
Get all fee records with filters
```
Query Parameters:
- page: number
- limit: number
- class: string
- status: paid|pending|overdue|partial
- fromDate: date
- toDate: date
```

### GET /fees/:id
Get fee details by ID

### POST /fees/collect
Collect fee payment
```json
Request:
{
  "studentId": "ST001",
  "amount": 15000,
  "paymentMode": "online",
  "transactionId": "TXN123456",
  "remarks": "Term 1 Fee"
}

Response:
{
  "success": true,
  "data": {
    "receiptNumber": "RCP/2025/001",
    "receiptPdf": "https://cdn.../receipt.pdf",
    "paymentId": "PAY123"
  }
}
```

### GET /fees/receipts/:receiptId
Download fee receipt

### POST /fees/reminders
Send fee payment reminders
```json
Request:
{
  "studentIds": ["ST001", "ST002"],
  "mode": "sms|email|whatsapp"
}
```

### GET /fees/analytics
Get fee collection analytics

### GET /fees/defaulters
Get list of fee defaulters

### POST /fees/concession
Apply fee concession

---

## 5. Attendance Module

### GET /attendance
Get attendance records
```
Query Parameters:
- date: YYYY-MM-DD
- class: string
- section: string
- month: YYYY-MM
```

### POST /attendance/mark
Mark daily attendance
```json
Request:
{
  "date": "2025-10-31",
  "class": "10-A",
  "records": [
    {
      "studentId": "ST001",
      "status": "present",
      "time": "08:45"
    },
    {
      "studentId": "ST002",
      "status": "absent"
    }
  ]
}
```

### GET /attendance/reports
Get attendance reports

### GET /attendance/analytics
Get attendance analytics

### POST /attendance/alerts
Send low attendance alerts

---

## 6. Exam & Results Module

### GET /exams
Get all exams

### POST /exams
Create new exam
```json
Request:
{
  "name": "Mid Term Exam 2025",
  "term": "mid-term",
  "academicYear": "2025-26",
  "startDate": "2025-11-18",
  "endDate": "2025-11-25",
  "classes": ["9", "10", "11", "12"]
}
```

### POST /exams/:examId/marks
Enter exam marks
```json
Request:
{
  "studentId": "ST001",
  "subject": "Mathematics",
  "marksObtained": 85,
  "maxMarks": 100,
  "grade": "A"
}
```

### GET /exams/:examId/results
Get exam results

### POST /exams/:examId/publish
Publish exam results

### GET /results/report-card/:studentId
Generate student report card

### GET /results/analytics
Get result analytics

### GET /results/toppers
Get top performers

---

## 7. Teacher Management Module

### GET /teachers
Get all teachers

### POST /teachers
Add new teacher

### PUT /teachers/:id
Update teacher information

### GET /teachers/:id/timetable
Get teacher's timetable

### GET /teachers/:id/attendance
Get teacher attendance

### POST /teachers/:id/leave
Apply leave

---

## 8. Communication Module

### POST /communication/sms
Send SMS
```json
Request:
{
  "recipients": ["9876543210", "9876543211"],
  "message": "Dear parent, your child is absent today.",
  "templateId": "attendance_alert"
}
```

### POST /communication/email
Send email

### POST /communication/whatsapp
Send WhatsApp message

### POST /communication/notification
Send push notification

### GET /communication/history
Get communication history

---

## 9. Reports Module

### GET /reports/students
Student reports

### GET /reports/fees
Fee collection reports

### GET /reports/attendance
Attendance reports

### GET /reports/results
Exam result reports

### GET /reports/custom
Generate custom reports

---

## 10. Settings Module

### GET /settings/school
Get school settings

### PUT /settings/school
Update school settings

### GET /settings/academic-year
Get academic year settings

### POST /settings/academic-year
Configure academic year

### GET /settings/fee-structure
Get fee structure

### PUT /settings/fee-structure
Update fee structure

---

## 11. AI & Analytics Module

### POST /ai/predict/performance
Predict student performance

### POST /ai/detect/weak-areas
Detect weak areas in subjects

### GET /ai/insights/attendance
Get attendance insights

### GET /ai/insights/fees
Get fee collection insights

### POST /ai/chatbot
AI chatbot for queries

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired token"
  }
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "Insufficient permissions"
  }
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred"
  }
}
```

---

## Webhooks

### Fee Payment Success
```
POST https://your-school.com/webhooks/payment-success
```

### Student Admission
```
POST https://your-school.com/webhooks/student-admission
```

---

## Rate Limiting
- 100 requests per minute per user
- 1000 requests per hour per school

---

## Pagination
All list endpoints support pagination:
```
?page=1&limit=50
```

Response includes:
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 1247,
    "totalPages": 25
  }
}
```

---

## WebSocket Events

Connect to: `wss://api.skilllogictech.in/ws`

### Events:
- `attendance:marked` - Real-time attendance updates
- `fee:collected` - Real-time fee collection
- `notification:new` - New notifications
- `result:published` - Results published

---

## SDKs Available
- JavaScript/TypeScript SDK
- Python SDK
- PHP SDK
- Java SDK

## Support
- API Documentation: https://docs.skilllogictech.in
- Developer Portal: https://developers.skilllogictech.in
- Support Email: api-support@skilllogictech.in
