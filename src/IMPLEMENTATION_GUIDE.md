# SkillLogic School Management System - Implementation Guide

## 🚀 Quick Start

This is a **frontend prototype** demonstrating the complete SkillLogic School Management System. To use this in a production environment, you'll need to connect it to a backend API.

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Code editor (VS Code recommended)

## 🔧 Development Setup

### 1. Clone or Download the Project
```bash
# If using git
git clone https://github.com/YourOrg/skilllogic-school-crm.git
cd skilllogic-school-crm

# Install dependencies (if running locally)
npm install
```

### 2. Run the Application
This application is built with React and can run in any React environment.

```bash
# Development mode
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure Overview

```
/
├── App.tsx                          # Main application entry
├── components/
│   ├── Dashboard.tsx                # Main dashboard
│   ├── StudentManagement.tsx        # Student CRUD
│   ├── FeeManagement.tsx            # Fee collection
│   ├── AttendanceSystem.tsx         # Attendance tracking
│   ├── ExamResults.tsx              # Exam management
│   ├── LoginScreen.tsx              # Login interface
│   ├── DemoInfoBanner.tsx           # Demo notification
│   └── ui/                          # Shadcn components
├── styles/
│   └── globals.css                  # Global styles
├── README.md                        # Project documentation
├── API_STRUCTURE.md                 # API specifications
└── IMPLEMENTATION_GUIDE.md          # This file
```

## 🔌 Backend Integration

### Step 1: API Configuration

Create an API configuration file:

```typescript
// config/api.ts
export const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Create axios instance
import axios from 'axios';

export const apiClient = axios.create(API_CONFIG);

// Add request interceptor for auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### Step 2: Create API Service Layer

```typescript
// services/studentService.ts
import { apiClient } from '../config/api';

export const studentService = {
  async getAll(params?: {
    page?: number;
    limit?: number;
    class?: string;
    search?: string;
  }) {
    return apiClient.get('/students', { params });
  },

  async getById(id: string) {
    return apiClient.get(`/students/${id}`);
  },

  async create(data: any) {
    return apiClient.post('/students', data);
  },

  async update(id: string, data: any) {
    return apiClient.put(`/students/${id}`, data);
  },

  async delete(id: string) {
    return apiClient.delete(`/students/${id}`);
  },
};

// services/feeService.ts
export const feeService = {
  async getAll(params?: any) {
    return apiClient.get('/fees', { params });
  },

  async collect(data: any) {
    return apiClient.post('/fees/collect', data);
  },

  async getReceipt(receiptId: string) {
    return apiClient.get(`/fees/receipts/${receiptId}`);
  },
};

// Add similar services for attendance, exams, etc.
```

### Step 3: Update Components to Use Real Data

```typescript
// Example: Update StudentManagement.tsx
import { useState, useEffect } from 'react';
import { studentService } from '../services/studentService';

export default function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const response = await studentService.getAll({
        page: 1,
        limit: 50,
      });
      setStudents(response.data);
    } catch (error) {
      console.error('Failed to load students:', error);
    } finally {
      setLoading(false);
    }
  };

  // Rest of component...
}
```

## 🔐 Authentication Implementation

### Step 1: Update Login Screen

```typescript
// components/LoginScreen.tsx
import { useState } from 'react';
import { authService } from '../services/authService';

export default function LoginScreen({ onLogin }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authService.login({
        email,
        password,
      });
      
      // Store token
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      // Notify parent component
      onLogin();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // Rest of component...
}
```

## 💳 Payment Gateway Integration

### Razorpay Integration

```typescript
// services/paymentService.ts
export const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const processPayment = async (data: {
  amount: number;
  studentId: string;
  studentName: string;
  email: string;
  contact: string;
}) => {
  const res = await initializeRazorpay();

  if (!res) {
    alert('Razorpay SDK failed to load');
    return;
  }

  // Create order on backend
  const order = await apiClient.post('/fees/create-order', {
    amount: data.amount,
    studentId: data.studentId,
  });

  const options = {
    key: process.env.REACT_APP_RAZORPAY_KEY,
    amount: order.amount,
    currency: 'INR',
    name: 'SkillLogic School',
    description: 'Fee Payment',
    order_id: order.id,
    handler: async function (response: any) {
      // Verify payment on backend
      const result = await apiClient.post('/fees/verify-payment', {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      });
      
      console.log('Payment successful:', result);
    },
    prefill: {
      name: data.studentName,
      email: data.email,
      contact: data.contact,
    },
    theme: {
      color: '#1A73E8',
    },
  };

  const paymentObject = new (window as any).Razorpay(options);
  paymentObject.open();
};
```

## 📧 SMS/Email Integration

### Using Twilio for SMS

```typescript
// services/communicationService.ts
export const communicationService = {
  async sendSMS(data: {
    to: string[];
    message: string;
    templateId?: string;
  }) {
    return apiClient.post('/communication/sms', data);
  },

  async sendEmail(data: {
    to: string[];
    subject: string;
    body: string;
    templateId?: string;
  }) {
    return apiClient.post('/communication/email', data);
  },

  async sendWhatsApp(data: {
    to: string[];
    message: string;
    templateId?: string;
  }) {
    return apiClient.post('/communication/whatsapp', data);
  },
};
```

## 📊 AI Features Implementation

### OpenAI Integration Example

```typescript
// services/aiService.ts
export const aiService = {
  async predictPerformance(studentId: string) {
    return apiClient.post('/ai/predict/performance', {
      studentId,
    });
  },

  async detectWeakAreas(examId: string, classId: string) {
    return apiClient.post('/ai/detect/weak-areas', {
      examId,
      classId,
    });
  },

  async chatbot(query: string) {
    return apiClient.post('/ai/chatbot', {
      query,
    });
  },

  async getInsights(type: 'attendance' | 'fees') {
    return apiClient.get(`/ai/insights/${type}`);
  },
};
```

## 🌐 Multi-Tenant Setup

### School Context Provider

```typescript
// context/SchoolContext.tsx
import { createContext, useContext, useState } from 'react';

interface SchoolContextType {
  schoolId: string;
  schoolName: string;
  schoolLogo: string;
  primaryColor: string;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

export const SchoolProvider = ({ children }: { children: React.ReactNode }) => {
  const [school, setSchool] = useState<SchoolContextType>({
    schoolId: 'demo_school',
    schoolName: 'Demo School',
    schoolLogo: '/logo.png',
    primaryColor: '#1A73E8',
  });

  return (
    <SchoolContext.Provider value={school}>
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchool must be used within SchoolProvider');
  }
  return context;
};
```

## 🗄️ Database Schema (PostgreSQL)

### Key Tables

```sql
-- Schools table (for multi-tenant)
CREATE TABLE schools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  domain VARCHAR(255) UNIQUE,
  logo_url TEXT,
  primary_color VARCHAR(7),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID REFERENCES schools(id),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL, -- admin, teacher, student, parent
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Students table
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID REFERENCES schools(id),
  admission_number VARCHAR(50) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  date_of_birth DATE NOT NULL,
  gender VARCHAR(10),
  class VARCHAR(10),
  section VARCHAR(10),
  roll_number VARCHAR(10),
  address TEXT,
  city VARCHAR(100),
  pin_code VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Guardians table
CREATE TABLE guardians (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id),
  name VARCHAR(255) NOT NULL,
  relationship VARCHAR(50),
  contact VARCHAR(20),
  email VARCHAR(255),
  occupation VARCHAR(100),
  annual_income DECIMAL(12, 2)
);

-- Fees table
CREATE TABLE fees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id),
  academic_year VARCHAR(10),
  term VARCHAR(50),
  total_amount DECIMAL(10, 2),
  paid_amount DECIMAL(10, 2) DEFAULT 0,
  pending_amount DECIMAL(10, 2),
  due_date DATE,
  status VARCHAR(20), -- paid, pending, overdue, partial
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Attendance table
CREATE TABLE attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id),
  date DATE NOT NULL,
  status VARCHAR(20), -- present, absent, late, leave
  time_in TIME,
  remarks TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(student_id, date)
);

-- Exams table
CREATE TABLE exams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID REFERENCES schools(id),
  name VARCHAR(255) NOT NULL,
  term VARCHAR(50),
  academic_year VARCHAR(10),
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Results table
CREATE TABLE results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  exam_id UUID REFERENCES exams(id),
  student_id UUID REFERENCES students(id),
  subject VARCHAR(100),
  marks_obtained DECIMAL(5, 2),
  max_marks DECIMAL(5, 2),
  grade VARCHAR(2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)

```bash
# Build the application
npm run build

# Deploy to Vercel
vercel --prod

# Or deploy to Netlify
netlify deploy --prod
```

### Backend Deployment (Docker)

```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/schooldb
      - JWT_SECRET=your_jwt_secret
    depends_on:
      - db
  
  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=schooldb
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## 🔒 Environment Variables

```env
# Frontend (.env)
REACT_APP_API_URL=https://api.yourschool.com/v1
REACT_APP_RAZORPAY_KEY=rzp_test_xxxxx
REACT_APP_GOOGLE_MAPS_KEY=your_maps_key

# Backend (.env)
DATABASE_URL=postgresql://user:pass@localhost:5432/schooldb
JWT_SECRET=your_secret_key_here
JWT_EXPIRY=7d

# Payment Gateways
RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_SECRET=xxxxx

# SMS/Email
TWILIO_ACCOUNT_SID=xxxxx
TWILIO_AUTH_TOKEN=xxxxx
TWILIO_PHONE_NUMBER=+1234567890

SENDGRID_API_KEY=xxxxx
SENDGRID_FROM_EMAIL=noreply@yourschool.com

# AI Services
OPENAI_API_KEY=sk-xxxxx

# Storage
AWS_ACCESS_KEY_ID=xxxxx
AWS_SECRET_ACCESS_KEY=xxxxx
AWS_S3_BUCKET=school-documents
```

## 📚 Additional Resources

- **API Documentation:** See `API_STRUCTURE.md`
- **Component Library:** Shadcn UI - https://ui.shadcn.com
- **Icons:** Lucide React - https://lucide.dev
- **Charts:** Recharts - https://recharts.org
- **Animation:** Framer Motion - https://www.framer.com/motion

## 🤝 Support

For technical support or implementation assistance:
- Email: support@skilllogictech.in
- Documentation: https://docs.skilllogictech.in
- Training: Contact for onboarding sessions

## 📄 License

Proprietary Software © 2025 SkillLogic Technologies

---

**Happy Coding! 🚀**
