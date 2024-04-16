import React, { useContext } from 'react';
import { View, Button, StyleSheet, Dimensions, Pressable } from 'react-native';
import { Text } from '../components/TextFix';
import { appStyles } from '../components/AppStyles';
import AppContext from '../utils/AppContext';
import { useAuth } from '../utils/Auth';

const Home = ({ navigation }) => {
  const { setState } = useContext(AppContext);
  const handleButtonPress = (buttonNumber) => {
    // define actions for each button press here

    switch (buttonNumber) {
      case 2:
        navigation.navigate('Jobs');
        break;
      case 4:
        navigation.navigate('Messages');
        break;
      case 5:
        useAuth().logout();
        setState(null);
        break;
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
      <Pressable
        style={[appStyles.button, { backgroundColor: "#841584" }]}
        onPress={() => handleButtonPress(1)}
      >
        <Text style={[appStyles.label, { color: 'white' }]}>Weather Summary</Text>
      </Pressable>
      <Pressable
        style={[appStyles.button, { backgroundColor: "#1565C0" }]}
        onPress={() => handleButtonPress(2)}
      >
        <Text style={[appStyles.label, { color: 'white' }]}>Jobs</Text>
      </Pressable>
      <Pressable
        style={[appStyles.button, { backgroundColor: "#FF9800" }]}
        onPress={() => handleButtonPress(3)}
      >
        <Text style={[appStyles.label, { color: 'white' }]}>Travel Service</Text>
      </Pressable>
      <Pressable
        style={[appStyles.button, { backgroundColor: "#4CAF50" }]}
        onPress={() => handleButtonPress(4)}
      >
        <Text style={[appStyles.label, { color: 'white' }]}>Messages</Text>
      </Pressable>
      <Pressable
        style={[appStyles.button, { backgroundColor: 'red' }]}
        onPress={() => handleButtonPress(5)}>
        <Text style={[appStyles.label, { color: 'white' }]}>Logout</Text>
      </Pressable>
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
