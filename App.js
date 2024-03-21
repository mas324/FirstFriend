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

const Stack = createNativeStackNavigator();

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

  return (
    <NavigationContainer>
      <AuthContext.Provider value={AuthMemo}>
        <Stack.Navigator initialRouteName='Test'>
        {state.userToken == null || state.userToken != null ? (
          <>
            <Stack.Screen name='Login' component={LoginPage} options={{title: 'Login'}} />
            <Stack.Screen name='PassRes' component={PasswordReset} options={{title: 'Forgot Password'}} />
            <Stack.Screen name='Signup' component={SignUpPage} options={{title: 'Signup'}} />
            <Stack.Screen name='Test' component={Test} options={{title: 'Dev Test page'}} />
            <Stack.Screen name='Home' component={Home} options={{title: 'Home'}} />
            <Stack.Screen name='Jobs' component={Jobs} options={{title: 'Jobs'}} />
            <Stack.Screen name='Messages' component={Messages} options={{title: 'Messages'}} />            
          </>
        ) : (
          <>

          </>
        )}
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}
