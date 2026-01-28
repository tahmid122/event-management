# Event Management SMT

A modern, full-featured event management platform built with Next.js, React, and TypeScript. EVENT SMT enables users to discover, create, manage, and book events seamlessly with real-time chat capabilities and secure payment processing.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Architecture](#architecture)
- [Key Components](#key-components)
- [API Integration](#api-integration)
- [Authentication](#authentication)
- [Contributing](#contributing)

---

## Features

### 🎉 Event Management

- **Browse Events**: Discover all active events with detailed information
- **Create Events**: Event managers can create and publish new events with comprehensive details
- **Manage Events**: Update, edit, and delete events you've created
- **Search & Filter**: Find events by name and other criteria
- **Event Details**: View complete event information including capacity, pricing, and location

### 👤 User Accounts

- **Authentication**: Secure login and signup with JWT-based authentication
- **User Profiles**: Manage personal profile information and preferences
- **Role-Based Access**: Different capabilities for regular users and event managers
- **Booking History**: Track all bookings in your personal dashboard

### 💳 Payments & Bookings

- **Stripe Integration**: Secure payment processing for event bookings
- **Booking Management**: View and manage all your event bookings
- **Payment History**: Track transaction history in user profile

### 💬 Real-Time Communication

- **WebSocket Chat**: Real-time messaging with event organizers and other users
- **Chat Notifications**: Instant message notifications and connection status
- **Chat History**: Access previous conversations with ticket tracking

### 📊 Analytics & Charts

- **Data Visualization**: Interactive charts and area charts for event analytics
- **Dashboard Metrics**: View event statistics and booking trends

### 🎨 Modern UI/UX

- **Dark/Light Mode**: Toggle between dark and light themes with next-themes
- **Responsive Design**: Fully responsive design for mobile, tablet, and desktop
- **Tailwind CSS**: Modern styling with utility-first CSS framework
- **Radix UI Components**: Accessible, unstyled UI components foundation
- **Smooth Animations**: CSS animations for enhanced user experience

---

## Tech Stack

### Frontend

- **Framework**: [Next.js 16.1.1](https://nextjs.org/) - React framework with App Router
- **Language**: TypeScript 5
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) + Tailwind Merge
- **UI Components**: Radix UI (Dialog, Dropdown, Select, Popover, Radio Group, etc.)
- **State Management**: Redux Toolkit 2.11 + Redux Persist
- **API Layer**: RTK Query for data fetching and caching
- **Authentication**: JWT with js-cookie
- **Forms**: React Hook Form + Zod validation
- **Rich Text Editor**: Suneditor React
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React + React Icons
- **Date Handling**: date-fns
- **Payments**: Stripe (React Stripe.js)
- **Notifications**: Sonner (Toast notifications)
- **Real-time**: WebSocket communication
- **Theme**: next-themes for dark/light mode toggle

### Development Tools

- **Linting**: ESLint 9
- **Build**: Turbopack (Next.js bundler)
- **Package Manager**: npm

---

## Project Structure

```
event-management-smt/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── layout.tsx               # Root layout wrapper
│   │   ├── page.tsx                 # Home page
│   │   ├── charts/                  # Analytics and data visualization
│   │   ├── chat/                    # Real-time chat functionality
│   │   ├── events/                  # Event browsing and details
│   │   │   └── checkout/            # Stripe payment integration
│   │   ├── login/                   # Authentication pages
│   │   ├── signup/                  # User registration
│   │   └── profile/                 # User dashboard and settings
│   │       ├── create-events/       # Event creation
│   │       ├── my-events/           # User's created events
│   │       ├── my-bookings/         # User's bookings
│   │       └── all-events/          # All events view
│   │
│   ├── components/
│   │   ├── ui/                      # Radix UI components (button, card, dialog, etc.)
│   │   ├── custom/
│   │   │   ├── layout/              # Navigation, Footer components
│   │   │   └── reuseable/           # EventCard, DatePicker, Logo, etc.
│   │   └── Forms/                   # Custom form components
│   │       ├── CustomInput.tsx
│   │       ├── CustomSelect.tsx
│   │       ├── CustomDatePicker.tsx
│   │       ├── CustomFileUploader.tsx
│   │       ├── CustomRichTextEditor.tsx
│   │       └── CustomForm.tsx
│   │
│   ├── redux/
│   │   ├── api/
│   │   │   ├── baseApi.ts          # RTK Query base configuration
│   │   │   ├── authApi.ts          # Authentication endpoints
│   │   │   └── eventApi.ts         # Event CRUD endpoints
│   │   ├── authSlice.ts            # Auth state management
│   │   └── store/
│   │       └── index.ts            # Redux store configuration
│   │
│   ├── types/                       # TypeScript interfaces
│   │   ├── event.ts
│   │   ├── user.ts
│   │   ├── authResponse.ts
│   │   ├── payment.ts
│   │   └── loginSingup.ts
│   │
│   ├── schema/                      # Zod validation schemas
│   │   └── index.ts
│   │
│   ├── lib/
│   │   └── utils.ts                # Utility functions
│   │
│   ├── utils/
│   │   └── verifyJWT.ts            # JWT verification
│   │
│   └── styles/
│       └── globals.css             # Global Tailwind styles
│
├── public/                          # Static assets
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript config
├── tailwind.config.js              # Tailwind CSS config
├── next.config.ts                  # Next.js config
├── components.json                 # Component library config
└── README.md                        # This file
```

---

## Installation

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd event-management-smt
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory with the following variables:

   ```env
   NEXT_PUBLIC_API_BASE_URL=<your-backend-api-url>
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<your-stripe-key>
   NEXT_PUBLIC_WS_URL=ws://<websocket-server-url>:5000
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

---

## Getting Started

### Development Workflow

1. **Create a new event** (if you're an event manager):
   - Navigate to Profile → Create Events
   - Fill in event details (name, location, date, capacity, joining fee)
   - Submit the form to create the event

2. **Browse events**:
   - Go to the Events page
   - View all available events with search functionality
   - Click on an event to see detailed information

3. **Book an event**:
   - Select an event from the listings
   - Proceed to checkout
   - Complete payment via Stripe

4. **Real-time chat**:
   - Access chat from event details or user dashboard
   - Send and receive messages in real-time via WebSocket

5. **View bookings**:
   - Profile → My Bookings
   - See all your event bookings and payment history

---

## Scripts

```bash
# Development server with Turbopack (fast refresh)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

---

## Architecture

### State Management

The application uses **Redux Toolkit** with **Redux Persist** for state management:

- **authSlice**: Manages user authentication state, tokens, and user information
- **RTK Query**: Handles API calls, caching, and synchronization
  - `baseApi`: Core API configuration with interceptors
  - `authApi`: Authentication endpoints (login, signup)
  - `eventApi`: Event CRUD operations

### API Layer

- RTK Query provides automatic caching, request deduplication, and optimistic updates
- Base API includes error handling and token-based authentication
- All API responses are typed with TypeScript

### Form Handling

- **React Hook Form**: Efficient form state management with minimal re-renders
- **Zod**: Schema-based validation for type-safe form validation
- Custom form components abstract common patterns (input, select, date picker, etc.)

### Real-Time Communication

- **WebSocket**: Direct connection to backend for real-time chat
- Auto-reconnection logic with exponential backoff
- Message history fetching and display

---

## Key Components

### Pages

- **Home** (`/`): Landing page with welcome message
- **Events** (`/events`): Browse and search all events
- **Event Details** (`/events/[id]`): Detailed event information
- **Checkout** (`/events/checkout/[id]`): Payment processing
- **Chat** (`/chat/[id]`): Real-time messaging
- **Login** (`/login`): User authentication
- **Signup** (`/signup`): New user registration
- **Profile** (`/profile`): User dashboard
  - Create Events
  - My Events Management
  - My Bookings
  - All Events View

### Reusable Components

- **EventCard**: Display event summary information
- **DatePicker**: Calendar-based date selection
- **SkeletonUI**: Loading placeholders
- **Navbar**: Navigation with user actions
- **Footer**: Site footer with links
- **Logo**: Branding component

### Form Components

- **CustomInput**: Text input with Tailwind styling
- **CustomSelect**: Dropdown selection
- **CustomDatePicker**: Date selection with calendar
- **CustomFileUploader**: Drag-and-drop file upload
- **CustomRichTextEditor**: Rich text content editing
- **CustomMultiSelect**: Multi-value selection
- **CustomRadioGroup**: Radio button groups

---

## API Integration

### Authentication Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration

### Event Endpoints

- `GET /api/event` - Get all active events
- `POST /api/event` - Create new event
- `GET /api/event/[id]` - Get event details
- `PUT /api/event/[id]` - Update event
- `DELETE /api/event/[id]` - Delete event
- `GET /api/event/my-events` - Get user's created events
- `POST /api/event/[id]/publish` - Publish event (admin)

### Payment Endpoints

- `POST /api/payment/checkout` - Initiate Stripe checkout

---

## Authentication

The application uses **JWT (JSON Web Tokens)** for authentication:

1. **Login/Signup**: User credentials are sent to backend
2. **Token Storage**: JWT tokens are stored in cookies via js-cookie
3. **Token Verification**: JWT tokens are verified in utils/verifyJWT.ts
4. **Auto-Login**: Redux Persist automatically restores user session on app load
5. **Request Headers**: Bearer token is automatically added to API requests

---

## Contributing

### Code Standards

- Use TypeScript for type safety
- Follow Tailwind CSS utility-first approach
- Create reusable components for common patterns
- Use proper TypeScript interfaces for all data structures
- Maintain consistent naming conventions

### Development Guidelines

- Create feature branches from main
- Write clear commit messages
- Test features locally before pushing
- Update component documentation

---

## License

This project is private and proprietary.

---

## Support

For issues, questions, or feature requests, please contact the development team.

---

**Built with ❤️ using Next.js, React, and TypeScript**
