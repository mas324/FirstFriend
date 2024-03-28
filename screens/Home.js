import React from 'react';
import { View, Button, StyleSheet, Dimensions } from 'react-native';
import { Text } from '../components/TextFix';

const Home = ({ navigation }) => {
  const handleButtonPress = (buttonNumber) => {
    // define actions for each button press here

    switch (buttonNumber) {
      case 2:
        navigation.navigate('Jobs');
        break;
      case 4:
        navigation.navigate('Messages');
      default:
        console.log('Button', buttonNumber, 'pressed');
        break;
    }
  };

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

export default Home;
