import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Message from './Message';
import SendMessageScreen from './SendMessageScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Message" component={Message} />
        <Stack.Screen options={{headerShown: false}} name="SendMessageScreen" component={SendMessageScreen} />
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
