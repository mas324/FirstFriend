import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginPage } from './screens/Login';
import { PasswordReset } from './screens/PassRes';
import { Test } from './screens/Test';
import Home from './screens/Home';
import { Jobs } from './screens/Job';
import Messages from './screens/Messages';
import { SignUpPage } from './screens/Signup';
import VeniceBeachCoffeeFinder from './screens/travelNav/MapApp';

const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
  // Change route name to Test for development, Login for production
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Test'>
        <Stack.Screen name='Test' component={Test} options={{ title: 'Dev Test page' }} />
        <Stack.Screen name='Login' component={LoginPage} options={{ title: 'Login' }} />
        <Stack.Screen name='PassRes' component={PasswordReset} options={{ title: 'Forgot Password' }} />
        <Stack.Screen name='Signup' component={SignUpPage} options={{ title: 'Signup' }} />
        <Stack.Screen name='Home' component={Home} options={{ title: 'Home' }} />
        <Stack.Screen name='Jobs' component={Jobs} options={{ title: 'Jobs' }} />
        <Stack.Screen name='Messages' component={Messages} options={{ title: 'Messages' }} />
        <Stack.Screen name='Maps' component={VeniceBeachCoffeeFinder} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
