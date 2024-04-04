import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MessageDetails from './MessageDetails';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MessageDetails from './MessageDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Message" component={Message} />
        <Stack.Screen options={{headerShown: false}} name="SendMessageScreen" component={SendMessageScreen} />
        <Stack.Screen options={{headerShown: false}} name="MessageDetails" component={MessageDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
