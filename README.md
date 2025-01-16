# timetrics_prototype/timetrics_prototype/README.md

# Timetrics Prototype

A simple time tracker application built with React Native. This application allows users to start and stop a timer, displays the elapsed time, and fetches HTTP data while the timer is running. Notifications are implemented to allow users to control the timer even when the app is in the background.

## Features

- Start and stop timer functionality
- Display elapsed time
- Fetch HTTP data while the timer is running
- Background notifications to control the timer

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/timetrics_prototype.git
   ```

2. Navigate to the project directory:
   ```
   cd timetrics_prototype
   ```

3. Install dependencies:
   ```
   npm install
   ```

## Running the Application

To run the application on Android:
```
npm run android
```

To run the application on iOS:
```
npm run ios
```

## Development

- The main entry point of the application is located in `src/App.tsx`.
- The timer functionality is encapsulated in the `src/components/Timer.tsx` component.
- Notifications are managed by the `src/components/NotificationHandler.tsx` component.
- Custom hooks for timer logic can be found in `src/hooks/useTimer.ts`.
- HTTP requests are handled in `src/services/api.ts`.
- Notification utilities are located in `src/utils/notifications.ts`.

## License

This project is licensed under the MIT License.