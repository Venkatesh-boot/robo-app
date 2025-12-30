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

## API Specification (Mocked)

### Tasks Endpoints
- `GET /tasks`: Retrieve all tasks
- `POST /tasks`: Create a new task
- `PUT /tasks/{id}`: Update a task
- `DELETE /tasks/{id}`: Delete a task

### Robots Endpoints
- `GET /robots`: Retrieve all robots
- `POST /robots`: Create a new robot
- `PUT /robots/{id}`: Update a robot
- `DELETE /robots/{id}`: Delete a robot

## Implementation Plan

1. Set up React project with Redux Toolkit and Material-UI.
2. Create Redux slices for tasks and robots with mock data.
3. Implement TaskManager component with table and CRUD forms.
4. Implement RobotManager component similarly.
5. Add tabs in App.js for navigation.
6. Write unit tests for reducers.
7. Ensure responsive design and clean UI.

## Assumptions and Clarifications

- No real backend; all data is mocked in Redux state.
- Tasks can be assigned to any robot; no validation for robot existence.
- Priority is a number; higher number means lower priority.
- Status options: Pending, In Progress, Completed.

## Future Improvements

- Add real API integration.
- Implement advanced filtering and sorting.
- Add notifications for task status changes.
- Improve error handling and validation.

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
