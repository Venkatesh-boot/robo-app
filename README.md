# Robot Task Scheduler

A React application for managing robot tasks with CRUD operations. Built with React, Redux Toolkit, and Material-UI.

## Features

- **Task Management**: Create, read, update, and delete tasks assigned to robots.
- **Robot Management**: Manage robots with basic information.
- **Responsive UI**: Built with Material-UI for a clean, responsive interface.
- **State Management**: Uses Redux Toolkit for predictable state management.
- **Mocked API**: Simulates API endpoints for tasks and robots.

## Technologies Used

- React 18
- Redux Toolkit
- Material-UI
- TypeScript (for type safety in slices)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository or navigate to the project directory.
2. Install dependencies:
   ```
   npm install
   ```

### Running the Application

1. Start the development server:
   ```
   npm start
   ```
2. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Tests

```
npm test
```

## Project Structure

- `src/store/`: Redux store configuration
- `src/features/`: Redux slices for tasks and robots
- `src/components/`: React components for UI
- `src/App.js`: Main app component with tabs