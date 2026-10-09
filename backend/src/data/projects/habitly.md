# Habitly --- Project Documentation

## Overview

Habitly is a full-stack habit-tracking web application for creating
habits, tracking daily completion, monitoring streaks, viewing progress
on a calendar, analyzing habit performance, and managing a user account.

## Goals

Habitly was built as a practical MERN project demonstrating:

-   React and component-based UI development
-   React Router and protected routes
-   Axios-based API communication
-   Node.js and Express backend development
-   MongoDB and Mongoose
-   JWT authentication and authorization
-   bcrypt password hashing
-   Backend validation and ownership checks
-   CRUD operations
-   Async JavaScript and Promise.all()
-   Derived UI state with useMemo()
-   Responsive dashboard navigation

## Technology Stack

### Frontend

-   React
-   JavaScript / JSX
-   Tailwind CSS
-   React Router
-   Axios
-   Vite
-   localStorage / sessionStorage

### Backend

-   Node.js
-   Express
-   MongoDB
-   Mongoose
-   JSON Web Tokens
-   bcrypt
-   dotenv
-   CORS

### Database

MongoDB stores users, habits, and habit-completion records.

## Architecture

``` text
React Frontend
      |
      | HTTP / Axios
      v
Express Backend
      |
      v
Controllers
      |
      v
Mongoose Models
      |
      v
MongoDB
```

Authentication:

``` text
Login
  |
  v
Credentials verified
  |
  v
JWT generated
  |
  v
Frontend stores token
  |
  v
Authorization: Bearer <token>
  |
  v
JWT middleware
  |
  v
Protected controller
```

## Core Features

### Authentication

-   Registration
-   Login
-   JWT access token
-   Protected routes
-   Logout
-   Automatic token cleanup after HTTP 401
-   One-hour JWT expiration

### Habit Management

-   Create habits
-   Edit habits
-   Delete habits
-   Prevent duplicate habit names for the same user
-   Associate each habit with its owner

### Completion Tracking

-   Mark a habit complete for a date
-   Remove a completion
-   Preserve historical completion dates
-   Prevent duplicate dates
-   Store dates as `YYYY-MM-DD`

### Dashboard

-   Total habit count
-   Total completion count
-   Habit cards
-   Current-week tracking
-   Streaks
-   Search
-   Streak filtering
-   Sorting
-   Previous completion loading

### Calendar

-   Select a habit
-   View completion dates
-   Display completion information
-   Preserve historical data

### Statistics

-   Completion counts
-   Habit-specific completion data
-   Streak calculations
-   Progress analysis

### Settings

-   View name and email
-   View habit count
-   Update name
-   Change password
-   Delete account
-   Log out

### Forgot Password

-   Submit email
-   Generate a short-lived reset token
-   Reset the password using the reset token
-   Validate the new password

> Production limitation: the current implementation returns the reset
> token to the frontend instead of sending a real email. A production
> system should send a secure reset link through an email provider.

## Authentication

### Registration

The backend:

1.  Validates the name.
2.  Normalizes email to lowercase.
3.  Validates the password.
4.  Checks for an existing email.
5.  Hashes the password with bcrypt.
6.  Creates the user.

Passwords are never stored as plaintext.

### Login

The backend:

1.  Finds the user by email.
2.  Compares the submitted password with bcrypt.
3.  Generates a JWT.
4.  Returns the token.

Current JWT lifetime:

``` text
1 hour
```

### Authorization

Protected requests use:

``` text
Authorization: Bearer <JWT>
```

The authentication middleware validates the header, extracts the token,
verifies it, and makes authenticated-user information available to
controllers.

## Habit Data

Each habit contains:

``` text
_id
userId
name
color
createdAt
```

The MongoDB `_id` is the authoritative habit identifier.

The frontend uses this ID for:

-   Editing
-   Deleting
-   Completion requests
-   Mapping completion data to habits

## Completion Data

Completion records contain:

``` text
userId
habitId
dates[]
```

Example:

``` text
2026-10-01
2026-10-02
2026-10-05
```

Frontend completion state is represented conceptually as:

``` js
{
  [habitId]: [
    "2026-10-01",
    "2026-10-02"
  ]
}
```

MongoDB `$addToSet` prevents duplicate completion dates, while `$pull`
removes dates.

## Dashboard Data Flow

``` text
getCurrentUser()
      |
      v
User + habits
      |
      v
Completion data
      |
      v
completedDays[habit._id]
      |
      v
Dashboard UI
```

The dashboard derives displayed habits from:

-   Search
-   Streak filter
-   Sort order
-   Current habits
-   Completion data

## Calendar Data Flow

``` text
Current user
    |
    v
Habits
    |
    v
Completion dates
    |
    v
completedDays[habit._id]
    |
    v
Selected habit
    |
    v
Calendar
```

## Statistics

Statistics are calculated from backend-backed habit and completion data
rather than the old localStorage-only data model.

## Settings

### Update Name

``` text
PUT /api/auth/user/dashboard/profile/name
```

### Change Password

``` text
PUT /api/auth/user/dashboard/profile/password
```

Password requirements:

-   8--64 characters
-   At least one uppercase letter
-   At least one lowercase letter
-   At least one number
-   At least one special character

### Delete Account

``` text
DELETE /api/auth/user/dashboard/profile/delete
```

Account deletion also removes the user's habits and completion records.

## Forgot Password

### Step 1

``` text
POST /api/auth/user/forgot-password/email
```

The backend generates a short-lived reset token.

### Step 2

``` text
PUT /api/auth/user/forgot-password/reset
```

The reset token is supplied as a Bearer token.

## API Endpoints

### Authentication

``` text
POST /api/auth/user/register
POST /api/auth/user/login
```

### Profile

``` text
GET    /api/auth/user/dashboard/profile
PUT    /api/auth/user/dashboard/profile/name
PUT    /api/auth/user/dashboard/profile/password
DELETE /api/auth/user/dashboard/profile/delete
```

### Password Recovery

``` text
POST /api/auth/user/forgot-password/email
PUT  /api/auth/user/forgot-password/reset
```

### Habits

``` text
POST   /api/auth/user/dashboard/habits
PUT    /api/auth/user/dashboard/habits/:habitId/update
DELETE /api/auth/user/dashboard/habits/:habitId/delete
GET    /api/auth/user/dashboard/habits/:habitId/completion
POST   /api/auth/user/dashboard/habits/:habitId/completion
DELETE /api/auth/user/dashboard/habits/:habitId/completion
```

Protected endpoints require authentication unless explicitly stated
otherwise.

## Data Models

### User

``` text
users
├── name
├── email
├── password
└── createdAt
```

Email is unique. Password is a bcrypt hash.

### Habit

``` text
habits
├── userId
├── name
├── color
└── createdAt
```

`userId` identifies the habit owner.

### Completed

``` text
completedDays
├── userId
├── habitId
└── dates[]
```

## Frontend Authentication State

The frontend can store the JWT in:

``` text
localStorage.token
```

or:

``` text
sessionStorage.token
```

The authentication utility checks both locations.

Custom `auth-change` events synchronize login/logout state across the
application.

### Logout

``` text
clearAuth()
   |
   v
Remove token
   |
   v
auth-change event
   |
   v
App updates authentication state
   |
   v
Navigate to /
```

### Expired Token

When a protected request is made with an expired JWT:

``` text
Expired JWT
    |
    v
Backend returns 401
    |
    v
Axios interceptor
    |
    v
clearAuth()
    |
    v
Redirect to /
```

If no protected request is made after expiration, the current UI can
remain visible until the next protected request.

## Validation

Backend validation includes:

-   Name validation
-   Email normalization
-   Password validation
-   MongoDB ObjectId validation
-   Completion date format validation
-   Habit ownership validation
-   Duplicate habit prevention
-   Duplicate completion prevention

## Error Handling

Typical status codes include:

``` text
400 Bad Request
401 Unauthorized
404 Not Found
500 Internal Server Error
```

The frontend has a global Axios 401 interceptor that clears
authentication.

AI/API errors are handled with try/catch at the controller/service
boundary.

## Performance

Completion data for multiple habits can be fetched in parallel with
`Promise.all()`.

The remaining N+1-style completion request pattern can be improved by
returning all completion information in one dashboard/profile response.

Potential database optimization:

``` text
Completed:
userId + habitId
```

can be indexed as a compound lookup key.

The backend should also wait for a successful MongoDB connection before
starting the HTTP server.

## Security

Current security measures include:

-   JWT authentication
-   Bearer-token authorization
-   bcrypt password hashing
-   Backend ownership checks
-   ObjectId validation
-   Backend input validation
-   Duplicate prevention
-   Token cleanup after 401

Production improvements should include:

-   Restrictive CORS
-   Rate limiting
-   Helmet/security headers
-   HTTPS
-   Centralized error handling
-   Secure cookie-based authentication where appropriate
-   Real email password reset
-   Monitoring and logging
-   Proper secret management

## Environment Variables

Typical backend variables:

``` env
PORT=3000
APP_NAME=Habitly
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EMAIL_SECRET=your_password_reset_secret
```

Never commit real secrets.

Frontend API configuration uses:

``` text
VITE_API_URL
```

## Project Structure

Conceptual structure:

``` text
Habitly/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── endpoints.js
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   │   ├── auth.js
│   │   │   └── user.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── ...
│
└── backend/
    ├── src/
    │   ├── config/
    │   ├── controllers/
    │   │   ├── userControllers.js
    │   │   └── habitController.js
    │   ├── middleware/
    │   │   ├── auth.js
    │   │   └── forgotPasswordAuth.js
    │   ├── models/
    │   │   ├── userModel.js
    │   │   ├── habitModel.js
    │   │   └── completedModel.js
    │   └── routes/
    │       ├── userRoutes.js
    │       └── habitRoutes.js
    ├── .env
    ├── .gitignore
    ├── package.json
    └── server.js
```

## Deployment

The frontend is deployed on Vercel.

Current public frontend:

``` text
https://habitlyx.vercel.app/
```

The frontend must use the deployed backend URL in production rather than
the local development API URL.

## Current Status

Habitly is functionally complete for its current training/portfolio
scope.

Completed areas include:

-   Registration
-   Login
-   JWT authentication
-   Protected routes
-   Logout
-   Token-expiration handling
-   Create habit
-   Edit habit
-   Delete habit
-   Completion tracking
-   Historical completion loading
-   Dashboard
-   Search
-   Filtering
-   Sorting
-   Streaks
-   Calendar
-   Statistics
-   Settings
-   Password change
-   Account deletion
-   Forgot-password flow
-   MongoDB integration
-   Responsive navigation
-   Fixed desktop sidebar

## Known Limitations

1.  Password recovery does not yet send a real email.
2.  There is no refresh-token system.
3.  Multiple completion requests can still occur for multiple habits.
4.  Production security hardening is still possible.
5.  Date-only handling should remain consistent to avoid
    timezone-related bugs.

## Future Improvements

Potential improvements:

-   Refresh tokens
-   Email verification
-   Real email password reset
-   Habit reminders
-   Habit categories
-   Habit frequency/recurrence
-   Habit archiving
-   Weekly/monthly goals
-   Completion percentages
-   Progress charts
-   Reports
-   Skeleton loading
-   Toast notifications
-   Accessibility improvements
-   Consolidated dashboard API
-   MongoDB indexes
-   Centralized Axios instance
-   Better caching

## AI Project Assistant Context

Habitly is being used as the first project in a reusable AI Project
Assistant.

The goal is to give an AI assistant project-specific documentation so it
can answer questions about the actual project rather than relying only
on general model knowledge.

Desired architecture:

``` text
README / Project Documentation
          |
          v
      Chunking
          |
          v
      Embeddings
          |
          v
    Vector Search
          |
          v
Relevant project context
          |
          v
       AI model
          |
          v
Project-specific answer
```

The long-term assistant should support multiple projects:

``` text
Habitly README
       RecipeBox README ----> Project Assistant
       /
Portfolio README
```

Each project can eventually be identified by a project ID.

## Maintainer

Manoj Kumar / Manu

Habitly was developed as a full-stack MERN learning and portfolio
project.

## License

No specific license is currently defined in the available project
context.
