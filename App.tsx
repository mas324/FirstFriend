import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import { Jobs } from './screens/Job';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppContext from './utils/AppContext';
import { getItem } from './utils/LocalStore';
import LoginPage from './screens/loginNav/Login';
import PasswordReset from './screens/loginNav/PassRes';
import SignUpPage from './screens/loginNav/Signup';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Messages from './screens/messageNav/Messages';
import BottomTab from './components/TabBar';
import { reauthenticate } from './utils/Firestore';
import { useAuth } from './utils/Auth';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={LoginPage} />
      <Stack.Screen name='PassRes' component={PasswordReset} />
      <Stack.Screen name='Signup' component={SignUpPage} />
    </Stack.Navigator>
  )
}

const MainStack = () => {
  return (
    <Tab.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }} tabBar={BottomTab}>
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Jobs' component={Jobs} />
      <Tab.Screen name='Messages' component={Messages} />
    </Tab.Navigator>
  )
}

const App = () => {
  const [weather, setWeather] = React.useState(null);
  const [jobs, setJobs] = React.useState(null);
  const [message, setMessage] = React.useState(null);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    getItem('@user').then((val) => {
      console.log("Appstart:", val);
      setUser(val);
      if (val == null) {
        return;
      }
      reauthenticate().then(loaded => {
        if (!loaded) {
          console.log('App: token invalid forcing logout');
          setUser(null);
          useAuth().logout();
        } else {
          console.log('App: user set successfully')
        }
      })
    });
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppContext.Provider value={{
          user, setUser,
          weather, setWeather,
          jobs, setJobs,
          message, setMessage
        }}>
          {user === null ? <LoginStack /> : <MainStack />}
        </AppContext.Provider>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App;
