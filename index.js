/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  'Could not find image file',
  'Possible Unhandled Promise Rejection',
]); // Ignore log notification by message

AppRegistry.registerComponent(appName, () => App);
