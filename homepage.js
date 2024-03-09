import React from 'react';
import { View, Button, Text, StyleSheet, Dimensions } from 'react-native';

const MyScreenWithButtons = () => {
  const handleButtonPress = (buttonNumber) => {
    // define actions for each button press here
    console.log('Button', buttonNumber, 'pressed');
  };

  const windowWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Home</Text>
      </View>
      <Button
        title="Weather Summary"
        onPress={() => handleButtonPress(1)}
        color="#841584"
      />
      <Button
        title="Jobs"
        onPress={() => handleButtonPress(2)}
        color="#1565C0"
      />
      <Button
        title="Travel Service"
        onPress={() => handleButtonPress(3)}
        color="#FF9800"
      />
      <Button
        title="Messages"
        onPress={() => handleButtonPress(4)}
        color="#4CAF50"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingContainer: {
    backgroundColor: '#FF9800', 
    paddingVertical: 10, 
    paddingHorizontal: 0.05 * Dimensions.get('window').width, 
    borderRadius: 5, 
    marginBottom: 20, 
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white', 
  },
});

export default MyScreenWithButtons;