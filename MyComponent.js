import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Message from './Message';


const MyComponent = () => {
  const navigation = useNavigation();

  const navigateToPreviousScreen = () => {
    navigation.goBack(); // Ensure navigation object is available
  };

  return (
    <View>
      <Button title="Go Back" onPress={navigateToPreviousScreen} />
    </View>
  );
};

export default MyComponent;