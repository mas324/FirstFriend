import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginPage } from './screens/Login';
import { PasswordReset } from './screens/PassRes';
import { Test } from './screens/Test';

const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Test' component={Test} options={{title: 'Dev Test page'}} />
        <Stack.Screen name='Login' component={LoginPage} options={{title: 'Login'}} />
        <Stack.Screen name='PassRes' component={PasswordReset} options={{title: 'Forgot Password'}} />
        <Stack.Screen name='Signup' component={SignUpPage} options={{title: 'Signup'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
