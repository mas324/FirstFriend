import * as React from 'react';
<<<<<<< HEAD
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
=======
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginPage } from './Login';
import { PasswordReset } from './PassRes';
import { Test } from './Test';

const Stack = createNativeStackNavigator();
>>>>>>> fbb15ad9205e37f72022a9f2271c722d854e7a19

function HomeScreen({ navigation }) {
  return (
<<<<<<< HEAD
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
        />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{title:'Overview'}}
        />
        <Stack.Screen name="Details" 
        component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
=======
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Test' component={Test} options={{title: 'Dev Test page'}} />
        <Stack.Screen name='Login' component={LoginPage} options={{title: 'Login'}} />
        <Stack.Screen name='PassRes' component={PasswordReset} options={{title: 'Forgot Password'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
>>>>>>> fbb15ad9205e37f72022a9f2271c722d854e7a19
