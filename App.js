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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppContext from './utils/Authentication/AppContext';
import { getItem } from './utils/Authentication/LocalStore';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator initialRouteName='Login' id='Unauth'>
      <Stack.Screen name='Login' component={LoginPage} options={{ title: 'Login' }} />
      <Stack.Screen name='PassRes' component={PasswordReset} options={{ title: 'Forgot Password' }} />
      <Stack.Screen name='Signup' component={SignUpPage} options={{ title: 'Signup' }} />
    </Stack.Navigator>
  )
}

const MainStack = () => {
  return (
    <Tab.Navigator initialRouteName='Home' id='Authed'>
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
      console.log('Setting state to:', val);
      setState(val);
    })
  });

  if (!dev) {
    return (
      <NavigationContainer>
        <AppContext.Provider value={{ state, setState }}>
          {state === null ? <LoginStack /> : <MainStack />}
        </AppContext.Provider>
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
          <Stack.Screen options={{headerShown: false}} name="Messages" component={Messages} />
          <Stack.Screen options={{headerShown: false}} name="SendMessageScreen" component={SendMessageScreen} />
          <Stack.Screen options={{headerShown: false}} name="MessageDetails" component={MessageDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
