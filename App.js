import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HelloPage } from './Login.js';

const Stack = createNativeStackNavigator();

function Home({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title='Go to Profile'
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  )
}

function ProfileScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Profile Screen</Text>
      <Button
        title='Goto Hello'
        onPress={() => navigation.navigate('Hello')}
      />
    </View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name='Profile' component={ProfileScreen} />
        <Stack.Screen name='Hello' component={HelloPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
