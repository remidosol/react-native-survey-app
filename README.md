# Survey App - React Native Project

## Overview

This is a mobile survey application built using React Native with Expo. It provides users with an interactive interface to complete surveys, view their survey history, and manage profile settings. The app supports localization for both English and Turkish languages and uses a clean and modular codebase to ensure scalability and maintainability.

## Features

- User Authentication (Login and Sign-Up)
- Interactive Surveys with Various Question Types (Multiple Choice, Slider, Single Choice)
- Survey Progress Saving and Resumption
- Survey History Overview
- In-App Notification System
- Localization Support (English and Turkish)
- Gradient Background Components with Customizable Transparency
- Animated SVG Graphics
- Custom Bottom Tab Navigation
- Language Switcher on Profile Page
- Data Persistence with AsyncStorage

## Technologies Used

### Frameworks & Libraries

- **React Native**: Core library for mobile development.
- **Expo**: Framework and platform for universal React applications.
- **React Native Paper**: For UI components like buttons, switches, and progress bars.
- **React Navigation**: For managing navigation throughout the app.
- **Redux Toolkit**: For state management.
- **React-Redux**: To connect React components with the Redux store.
- **Redux Thunk**: For async actions in Redux.
- **React Native SVG**: For rendering SVGs and creating animations.
- **React Native Circular Progress**: For progress indicators with animations.

### State Management

- **Redux Toolkit & Redux Thunk**: Manages app state, including user authentication and survey data.

### Localization & i18n

- **i18next**: For handling localization (supports English and Turkish languages).
- **react-i18next**: Integration with React components for localization.

### Asynchronous Storage

- **AsyncStorage**: Used for storing user data (e.g., survey progress and authentication tokens).

### User Interface & Design

- **React Native Paper**: Provides UI components like buttons, inputs, progress bars, and more.
- **Expo Linear Gradient**: Adds linear gradient backgrounds to components.

### Icons & Animations

- **@expo/vector-icons**: For using icons such as Ionicons.
- **React Native Animated API**: To create animations (e.g., in-app notifications, animated SVGs).

### Additional Tools & Services

- **Hermes**: JavaScript engine to optimize app performance.
- **React Native DevTools**: For debugging and optimizing React Native apps.

## Project Structure

The project follows a clean and modular folder structure:

```
root
├── src
│   ├── api
│   ├── components
│   │   ├── Animated
│   │   ├── Survey
│   │   └── ... Other Custom Components
│   ├── hooks
│   ├── localization
│   ├── navigation
│   ├── screens
│   │   ├── Auth
│   │   ├── Survey
│   │   ├── HomeScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── store
│   ├── styles
│   ├── types
│   ├── utils
│   ├── i18n.ts
│   └── data.ts
└── assets
```

### Key Folders

- **api**: Contains functions for making network requests (e.g., authentication).
- **components**: Reusable UI components like buttons, gradient backgrounds, animated SVGs, etc.
- **hooks**: Custom React hooks, including hooks for saving survey data.
- **i18n**: Localization files and configuration.
- **navigation**: Contains all navigators used in the app (stack navigators, bottom tab navigators, etc.).
- **screens**: All individual screens, organized by feature (e.g., Auth, Home, Profile, Survey).
- **slices**: Redux slices for managing different parts of the state.
- **store**: Redux store configuration.
- **utils**: Utility functions used throughout the app.

All tests have been done on Pixel_3a_API_34_extension_level_7_arm64-v8a Android emulator.

## Setup and Installation

1. **Clone the Repository**:

   ```sh
   git clone https://github.com/remidosol/react-native-survey-app.git
   cd react-native-survey-app
   ```

2. **Install Dependencies**:

   ```sh
   yarn
   ```

3. **Start the App**:

   ```sh
   npx expo start
   ```

4. **Run on a Physical Device**: Make sure you have the Expo Go app installed, and scan the QR code generated.

## How to Run with Hermes

To enable Hermes engine for the app:

1. Add `"jsEngine": "hermes"` to your `expo` configuration in `app.json`.
2. Run the app in development mode with:

   ```sh
   npx expo start --dev-client
   ```

## Usage Instructions

- **Authentication**: Sign up or log in to begin using the app.
- **Survey Interaction**: Complete surveys with different types of questions. The progress will be saved locally.
- **Profile Management**: Update profile details and switch between languages from the Profile screen.

## Future Improvements

- **Backend Integration**: Integrate with a backend to persist survey data in a database.
- **Push Notifications**: Add push notifications for survey reminders.
- **Offline Mode**: Improve offline data handling for better user experience.

## License

[MIT](LICENSE)
