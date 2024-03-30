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
import { useAuth } from './utils/Authentication/Auth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from './utils/Authentication/AuthContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const dev = false; // For final release remove this and else return
  const { user, setUser } = useAuth();

  if (!dev) {
    return (
      <NavigationContainer>
        <AuthContext.Provider value={{ user, setUser }}>
          {user === null ? (
            <Stack.Navigator initialRouteName='Login' id='Unauth'>
              <Stack.Screen name='Login' component={LoginPage} options={{ title: 'Login' }} />
              <Stack.Screen name='PassRes' component={PasswordReset} options={{ title: 'Forgot Password' }} />
              <Stack.Screen name='Signup' component={SignUpPage} options={{ title: 'Signup' }} />
            </Stack.Navigator>
          ) : (
            <Tab.Navigator initialRouteName='Home' id='Authed'>
              <Tab.Screen name='Home' component={Home} />
              <Tab.Screen name='Jobs' component={Jobs} />
              <Tab.Screen name='Messages' component={Messages} />
            </Tab.Navigator>
          )}
        </AuthContext.Provider>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Test'>
          <Stack.Screen name='Test' component={Test} />
          <Stack.Screen name='Login' component={LoginPage} />
          <Stack.Screen name='PassRes' component={PasswordReset} />
          <Stack.Screen name='Signup' component={SignUpPage} />
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Jobs' component={Jobs} />
          <Stack.Screen name='Messages' component={Messages} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
