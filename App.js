import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Test } from './screens/Test';
import Home from './screens/Home';
import { Jobs } from './screens/Job';
import Messages from './screens/Messages';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppContext from './utils/AppContext';
import { getItem } from './utils/LocalStore';
import LoginPage from './screens/loginNav/Login';
import PasswordReset from './screens/loginNav/PassRes';
import SignUpPage from './screens/loginNav/Signup';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator initialRouteName='Login' id='Unauth' key={'main'} screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={LoginPage} />
      <Stack.Screen name='PassRes' component={PasswordReset} />
      <Stack.Screen name='Signup' component={SignUpPage} />
    </Stack.Navigator>
  )
}

const MainStack = () => {
  return (
    <Tab.Navigator initialRouteName='Home' id='Authed' key={'user'}>
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Jobs' component={Jobs} />
      <Tab.Screen name='Messages' component={Messages} />
    </Tab.Navigator>
  )
}

const App = () => {
  const dev = false; // For final release remove this and else return
  const [state, setState] = React.useState('unauth');

  React.useEffect(() => {
    getItem('@user').then((val) => {
      setState(val);
    })
  });

  if (!dev) {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <AppContext.Provider value={{ state, setState }}>
            {state === null ? <LoginStack /> : <MainStack />}
          </AppContext.Provider>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  } else {
    return (
      <SafeAreaProvider>
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
      </SafeAreaProvider>
    );
  }
}

export default App;
