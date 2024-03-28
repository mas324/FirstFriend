import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginPage } from './screens/Login';
import { PasswordReset } from './screens/PassRes';
import { Test } from './screens/Test';
import Home from './screens/Home';
import { Jobs } from './screens/Job';
import Messages from './screens/Messages';
import { SignUpPage } from './screens/Signup';
import { AuthContext } from './utils/Auth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // When failed
      }

      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const AuthMemo = React.useMemo(() => ({
    signIn: async (data) => {
      console.log('Sign in data package: ', data);
      dispatch({ type: 'SIGN_IN', token: 'token' });
    },
    signOut: () => dispatch({ type: 'SIGN_OUT' }),
    signUp: async (data) => {
      console.log('Sign up data package: ', data);
      dispatch({ type: 'SIGN_IN', token: 'token' });
    },
  }), []);

  const dev = false; // For final release remove this and else return

  if (!dev) {
    return (
      <NavigationContainer>
        <AuthContext.Provider value={AuthMemo}>
          {state.userToken == null ? (
            <Stack.Navigator initialRouteName='Login'>
              <Stack.Screen name='Login' component={LoginPage} options={{ title: 'Login' }} />
              <Stack.Screen name='PassRes' component={PasswordReset} options={{ title: 'Forgot Password' }} />
              <Stack.Screen name='Signup' component={SignUpPage} options={{ title: 'Signup' }} />
            </Stack.Navigator>
          ) : (
            <Tab.Navigator initialRouteName='Home'>
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
