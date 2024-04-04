import {React, useState} from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const SendMessageScreen = () => {
  const navigation = useNavigation();
  const [userID, setUserID] = useState("");

  const handleSubmit = () => {
    
    navigation.navigate('MessageDetails', { userID });
  };

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>New Message</Text>
        <TextInput
                placeholder="Insert userID"
                placeholderTextColor = "#f3e5ab"
                value={userID}
                onChangeText={(text) => setUserID(text)}
                keyboardType="user ID"
                style={styles.input}
            />
            <Button 
            title="Submit" 
            color= "#f3e5ab"
            marginTop = "20"
            onPress={handleSubmit} 
            />
      </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    padding: 20,
    backgroundColor: '#800020',
    alignItems: "center",
    justifyContent: "center",
  },
   heading: {
    marginBottom: 8,
    alignItems: 'center',
    height: 32,
    backgroundColor: 'none',
    justifyContent: 'center'
  },
  headingText: {
    fontSize: 24,
    color: '#f3e5ab',
    fontWeight: 'bold',
  },
   input: {
    height: 40,
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#f3e5ab",
    width: 350 ,
    padding: 10,
    color: "#f3e5ab"
  },
});

export default SendMessageScreen;
