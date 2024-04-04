// index.js
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json'; // Assuming this import exists
import NotificationHandler from './src/libs/notifications'; // Importing NotificationHandler

const notificationHandler = new NotificationHandler(); // Instantiating NotificationHandler
notificationHandler.startOnBackground();
AppRegistry.registerComponent(appName, () => App);
