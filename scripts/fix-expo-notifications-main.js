const fs = require("fs");
const path = require("path");

const packagePath = path.join(__dirname, "..", "node_modules", "expo-notifications", "package.json");

if (!fs.existsSync(packagePath)) {
  process.exit(0);
}

const manifest = JSON.parse(fs.readFileSync(packagePath, "utf8"));

// Metro on this Windows setup resolves expo-notifications more reliably without the .js suffix.
if (manifest.main === "build/index.js") {
  manifest.main = "build/index";
  fs.writeFileSync(packagePath, `${JSON.stringify(manifest, null, 2)}\n`);
}

const localPackageDir = path.join(__dirname, "..", "node_modules", "expo-notifications-local");
fs.mkdirSync(localPackageDir, { recursive: true });

fs.writeFileSync(
  path.join(localPackageDir, "package.json"),
  `${JSON.stringify({ name: "expo-notifications-local", version: "0.0.0", main: "index.js", private: true }, null, 2)}\n`
);

fs.writeFileSync(
  path.join(localPackageDir, "index.js"),
  `export { scheduleNotificationAsync } from "../expo-notifications/build/scheduleNotificationAsync.js";
export { cancelScheduledNotificationAsync } from "../expo-notifications/build/cancelScheduledNotificationAsync.js";
export { cancelAllScheduledNotificationsAsync } from "../expo-notifications/build/cancelAllScheduledNotificationsAsync.js";
export { setNotificationChannelAsync } from "../expo-notifications/build/setNotificationChannelAsync.js";
export { requestPermissionsAsync, getPermissionsAsync } from "../expo-notifications/build/NotificationPermissions.js";
export { addNotificationReceivedListener, addNotificationResponseReceivedListener } from "../expo-notifications/build/NotificationsEmitter.js";
export { setNotificationHandler } from "../expo-notifications/build/NotificationsHandler.js";
export { AndroidNotificationPriority, SchedulableTriggerInputTypes } from "../expo-notifications/build/Notifications.types.js";
export {
  AndroidAudioUsage,
  AndroidImportance,
  AndroidNotificationVisibility
} from "../expo-notifications/build/NotificationChannelManager.types.js";
`
);
