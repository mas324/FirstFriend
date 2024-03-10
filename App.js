import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginPage } from './Login';
import { PasswordReset } from './PassRes';
import { Test } from './Test';
import { SignUpPage } from './Signup';

export const AuthContext = React.createContext();
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

  const authContext = React.useMemo(() => ({
    signIn: async (data) => {
      console.log(data);
      dispatch({ type: 'SIGN_IN', token: 'token' });
    },
    signOut: () => dispatch({ type: 'SIGN_OUT' }),
    signUp: async (data) => {
      dispatch({ type: 'SIGN_IN', token: 'token' });
    },
  }), []);

  return (
    <NavigationContainer>
      <AuthContext.Provider value={authContext}>
        <Stack.Navigator>
        {state.userToken == null ? (
          <>
            <Stack.Screen name='Login' component={LoginPage} options={{title: 'Login'}} />
            <Stack.Screen name='PassRes' component={PasswordReset} options={{title: 'Forgot Password'}} />
            <Stack.Screen name='Signup' component={SignUpPage} options={{title: 'Signup'}} />
          </>
        ) : (
          <>
            <Stack.Screen name='Test' component={Test} options={{title: 'Dev Test page'}} />
          </>
        )}
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}
