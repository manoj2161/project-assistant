# College Event Registration Portal

## Project Name

College Event Registration Portal (Campusly)

## Project Type

Full-stack college event registration web application.

## Project Purpose

The College Event Registration Portal is designed to simplify and digitize the management of college events. It provides a centralized platform where students can discover and register for events, organizers can submit and manage event proposals, and administrators can oversee event approvals and registrations.

The application reduces dependence on manual registration processes and provides a structured interface for managing college event activities.

## Technology Stack

### Frontend
- **React** — Component-based user interface.
- **Vite** — Frontend development server and build tool.
- **JavaScript** — Application logic.
- **Tailwind CSS** — Styling and responsive layouts.
- **React Router** — Client-side navigation.
- **Lucide React** — Icons.
- **Fetch API** — Communication with external services where required.

### Backend
- **Node.js** — JavaScript runtime.
- **Express.js** — Backend server and REST API routing.
- **Mongoose** — MongoDB object modeling.

### Database
- **MongoDB** — Storage for application data, including event and registration records.

### Authentication and Security
- JSON Web Tokens (JWT) for authentication.
- Access-token and refresh-token handling.
- HTTP cookies for refresh-token management.
- Password hashing for secure password storage.
- Environment variables for sensitive configuration.

### AI Integration
- **Google Gemini API** — AI-powered campus assistant.
- **Google GenAI SDK (`@google/genai`)** — Integration with Gemini models.
- Project-specific instructions and event context to help the assistant answer questions about the portal.

The Gemini model is configurable through environment variables where supported by the backend configuration.

## Main Features

### 1. Student Features
- Discover and browse available college events.
- View event information.
- Register for events.
- View registered events.
- Cancel event registrations where supported by the application.

### 2. Event Organizer Features
- Submit events for administrative review.
- View submitted event proposals.
- Track event submission status.

### 3. Administrator Features
- Review submitted events.
- Approve or reject event proposals.
- Delete events.
- View event registrations.
- Export registration data to CSV.

### 4. AI Campus Assistant
- Provide an AI-powered conversational interface.
- Answer questions about campus events and portal usage.
- Help users understand the event registration process.
- Use project-specific instructions and available event context when generating responses.

AI responses may be inaccurate, so important event details should be verified through the portal.

### 5. User Interface
- Responsive web interface.
- Dark, glassmorphism-inspired visual design.
- Reusable React components.
- Client-side navigation.
- Interactive forms and feedback messages.
- Loading and error states for supported asynchronous operations.

### 6. Backend and Data Management
- REST API endpoints for supported application operations.
- MongoDB-based data persistence.
- Structured backend routing, controllers, and services.
- Environment-based configuration.
- Authentication and authorization for protected operations.

## Application Architecture

The application follows a full-stack architecture:

1. **Frontend:** React and Vite provide the user interface.
2. **API Layer:** Express.js handles HTTP requests and application routes.
3. **Business Logic:** Backend controllers and services process supported operations.
4. **Database Layer:** Mongoose communicates with MongoDB.
5. **AI Service:** The Google GenAI SDK connects the backend to the configured Gemini model.

## Project Repository

**Repository Name:** `EVENT-REGISTRATION-PORTAL`

**GitHub Repository:**  
https://github.com/manoj2161/EVENT-REGISTRATION-PORTAL

## Configuration

The application uses environment variables for configuration.

Depending on the environment, configuration may include:

- MongoDB connection URL.
- JWT secrets.
- Gemini API key.
- Gemini model name.
- Frontend and backend URLs or ports.
- Other application-specific settings.

Sensitive credentials must be stored in environment variables and must not be committed to the public repository.

Refer to the project's environment example files and setup instructions for the exact variable names and required values.

## Important Notes

- The official project name is **College Event Registration Portal**; **Campusly** is the application's product name.
- The technology stack described here is React, Vite, Tailwind CSS, Node.js, Express.js, Mongoose, and MongoDB, with Google Gemini integration.
- Only features implemented and supported by the project should be treated as available.
- Do not assume that undocumented APIs, database fields, third-party services, or additional features exist.
- Do not expose API keys, authentication secrets, or other sensitive configuration values.
- Deployment-specific configuration may differ between development and production.

## Documentation Rule

This document is the primary reference for questions about the College Event Registration Portal.

When answering questions about the project:

1. Use the documented stack and features as the primary source of truth.
2. Do not invent implementation details or claim that unsupported features exist.
3. If a requested detail is not documented, clearly state that the information is not available in the project documentation.
4. If the actual source code contradicts this document, verify the implementation and update the documentation accordingly.
5. Keep the documentation aligned with the current repository as the project evolves.
