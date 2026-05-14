# VizMinder MAD Prototype

VizMinder is a visual-first reminder prototype for ADHD users. The prototype pairs reminders with visual cues, keeps check-ins simple, and stores state locally so the app still has data after restart.

## Run

```bash
npm install
npm run start:go
```

## Implemented Features

| Area | Package | Role in this prototype | Analysis |
| --- | --- | --- | --- |
| User engagement | [`react-native-confetti-cannon`](https://www.npmjs.com/package/react-native-confetti-cannon) | Fires a celebration when an important reminder is completed. | Gamification can improve task completion confidence, but should be reserved for meaningful reminders to avoid visual fatigue. |
| User engagement | [`react-native-animatable`](https://www.npmjs.com/package/react-native-animatable) | Adds `fadeInUp` loading motion to reminder cards. | Lightweight native-driver animations keep feedback smooth; older phones still need restrained duration and item count. |
| Scheduling | [`react-native-calendars`](https://www.npmjs.com/package/react-native-calendars) | Shows a full month view with marked reminder days. | A calendar is useful for distribution scanning, but month grids compete with small mobile screens, so the reminder list remains directly below it. |
| Scheduling | [`date-fns`](https://www.npmjs.com/package/date-fns) | Formats display times, compares selected dates, and renders countdown text. | `date-fns` works well for local-device time, but serious cross-time-zone reminders should store timezone-aware metadata with the task. |
| Scheduling | [`expo-notifications`](https://www.npmjs.com/package/expo-notifications) | Schedules real local notifications when reminder time arrives and opens the in-app reminder prompt from notification taps. | Local notifications are feasible in Expo; full lock-screen alarm UI needs native Android work and is not equivalent on iOS. |
| Media context | [`expo-image-picker`](https://www.npmjs.com/package/expo-image-picker) | Lets users attach a gallery image as a reminder visual cue. | Camera and gallery permissions expose private user media; production builds should request permission only at the moment of use and compress or prune local images. |
| Security | [`@react-native-async-storage/async-storage`](https://www.npmjs.com/package/@react-native-async-storage/async-storage) | Persists reminders in local storage after app restart. | AsyncStorage is not encrypted. Medication schedules, routines, and images may be sensitive, so production should use encrypted storage and backup recovery rules. |
| Material UI | [`react-native-paper`](https://www.npmjs.com/package/react-native-paper) | Provides Material 3 buttons, chips, surfaces, snackbar, and theme. | Keeps the prototype consistent with Google Material patterns without building controls from scratch. |
| Icons | [`@expo/vector-icons`](https://www.npmjs.com/package/@expo/vector-icons) | Supplies Material Community icons for task states and visual actions. | Icons reduce reading load when paired with clear labels for critical actions. |
| Native input | [`@react-native-community/datetimepicker`](https://www.npmjs.com/package/@react-native-community/datetimepicker) | Adds platform-native date/time picker controls beside the custom Material dialogs. | Native controls improve familiarity and accessibility, but styling control is more limited than a custom picker. |
| Native gesture | [`react-native-gesture-handler`](https://www.npmjs.com/package/react-native-gesture-handler) | Enables native-feeling swipe-to-delete on reminder rows. | Native gesture handling feels smoother than JS-only drag logic, especially when lists become larger. |
| Native feedback | [`expo-haptics`](https://www.npmjs.com/package/expo-haptics) | Adds tactile feedback for completion, toggle, and delete actions. | Haptics make state changes easier to perceive without adding more visual noise, which fits ADHD-friendly interaction design. |


## Useful Source Links

- react-native-confetti-cannon: [GitHub](https://github.com/VincentCATILLON/react-native-confetti-cannon), [NPM](https://www.npmjs.com/package/react-native-confetti-cannon)
- react-native-animatable: [GitHub](https://github.com/oblador/react-native-animatable), [NPM](https://www.npmjs.com/package/react-native-animatable)
- react-native-calendars: [GitHub](https://github.com/wix/react-native-calendars), [NPM](https://www.npmjs.com/package/react-native-calendars)
- date-fns: [GitHub](https://github.com/date-fns/date-fns), [NPM](https://www.npmjs.com/package/date-fns)
- expo-notifications: [GitHub](https://github.com/expo/expo/tree/main/packages/expo-notifications), [NPM](https://www.npmjs.com/package/expo-notifications)
- expo-image-picker: [GitHub](https://github.com/expo/expo/tree/main/packages/expo-image-picker), [NPM](https://www.npmjs.com/package/expo-image-picker)
- AsyncStorage: [GitHub](https://github.com/react-native-async-storage/async-storage), [NPM](https://www.npmjs.com/package/@react-native-async-storage/async-storage)
- react-native-paper: [GitHub](https://github.com/callstack/react-native-paper), [NPM](https://www.npmjs.com/package/react-native-paper)
- @expo/vector-icons: [GitHub](https://github.com/expo/vector-icons), [NPM](https://www.npmjs.com/package/@expo/vector-icons)
- @react-native-community/datetimepicker: [GitHub](https://github.com/react-native-datetimepicker/datetimepicker), [NPM](https://www.npmjs.com/package/@react-native-community/datetimepicker)
- react-native-gesture-handler: [GitHub](https://github.com/software-mansion/react-native-gesture-handler), [NPM](https://www.npmjs.com/package/react-native-gesture-handler)
- expo-haptics: [GitHub](https://github.com/expo/expo/tree/main/packages/expo-haptics), [NPM](https://www.npmjs.com/package/expo-haptics)
- expo: [GitHub](https://github.com/expo/expo), [NPM](https://www.npmjs.com/package/expo)
- expo-status-bar: [GitHub](https://github.com/expo/expo/tree/main/packages/expo-status-bar), [NPM](https://www.npmjs.com/package/expo-status-bar)
- expo-font: [GitHub](https://github.com/expo/expo/tree/main/packages/expo-font), [NPM](https://www.npmjs.com/package/expo-font)
- react-native-safe-area-context: [GitHub](https://github.com/AppAndFlow/react-native-safe-area-context), [NPM](https://www.npmjs.com/package/react-native-safe-area-context)
