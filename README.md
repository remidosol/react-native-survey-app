# Survey App - React Native

This is a React Native project developed using `react-native-paper` for UI components, providing a survey system along with features like profile management, survey detail tracking, in-app notifications, and localization.

## Features

- **Profile Management**: Manage user profiles including nickname, email, and phone number.
- **Survey System**: Conduct surveys with different question types, including single choice, multiple choice, and slider.
- **Survey Detail Tracking**: View completed surveys with time and score tracking.
- **In-App Notifications**: Show success, error, or information notifications.
- **Localization**: Support multiple languages (e.g., English and Turkish).
- **Persistent Survey State**: Save survey progress locally, allowing users to continue where they left off.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install) or npm

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/survey-app.git
   cd survey-app
   ```

2. Install dependencies:

   ```sh
   yarn install
   # or
   npm install
   ```

3. Start the Expo server:

   ```sh
   npx expo start
   ```

### Running on a Device or Simulator

- Scan the QR code with the Expo Go app on your mobile device.
- You can also run the project in an iOS or Android simulator.

## Project Structure

- **src/components**: Reusable components, including `InAppNotification`, `SurveyHeader`, `SurveyQuestion`, `ProfileScreen`, and `SurveyDetail`.
- **src/screens**: Application screens such as `HomeScreen`, `ProfileScreen`, `SurveyScreen`, and `SurveyDetailScreen`.
- **src/navigation**: Handles navigation across screens, including stack and bottom tab navigators.
- **src/store**: Redux store setup, including slices such as `userSlice` for handling user data and login data.
- **src/i18n**: Manages localization and language switching.
- **src/hooks**: Custom hooks for data fetching and state management, including survey progress tracking.

## Key Features Overview

### Survey System

The survey system allows users to take part in surveys with different types of questions:

- **Single Choice Questions**: Users can select one answer from a list of options.
- **Slider Questions**: Users can adjust a slider value (e.g., to express satisfaction levels).
- **Multiple Choice Questions**: Users can select multiple answers.
- **Survey Progress Tracking**: Users can continue a survey from where they left off.

### In-App Notification System

The in-app notification system provides feedback on user actions (e.g., successful survey submission or error messages) using `react-native-paper` components and an `Animated` view to show a notification bar at the top of the screen.

### Localization

The app supports multiple languages, allowing users to switch between available languages such as English and Turkish.

### Persistent Storage

Survey answers and progress are saved using `AsyncStorage`, allowing users to continue surveys if they leave the app or experience interruptions.

## Libraries and Tools Used

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [React Native Paper](https://callstack.github.io/react-native-paper/): UI components
- [Redux Toolkit](https://redux-toolkit.js.org/): State management
- [React Navigation](https://reactnavigation.org/): Navigation between screens
- [i18next](https://www.i18next.com/): Localization
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/): Persistent storage for survey progress

## Available Scripts

- `expo start`: Start the development server.
- `yarn android`: Run the app on an Android emulator.
- `yarn ios`: Run the app on an iOS simulator.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
