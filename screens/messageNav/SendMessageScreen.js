import {React, useState} from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SendMessageScreen = () => {
  const navigation = useNavigation();
  const [userID, setUserID] = useState("");

  const handleSubmit = () => {
    
    navigation.navigate('MessageDetails', { userID });
  };

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>Add New Friend</Text>
        <TextInput
                placeholder="Insert userID"
                placeholderTextColor = "#e6bb23"
                fontWeight = "bold"
                value={userID}
                onChangeText={(text) => setUserID(text)}
                keyboardType='number-pad'
                style={styles.input}
            />
            <Button 
            title="Submit" 
            color= "#e6bb23"
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
    backgroundColor: '#860038',
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
    color: '#e6bb23',
    fontWeight: 'bold',
  },
   input: {
    height: 40,
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#e6bb23",
    width: 350 ,
    padding: 10,
    color: "#e6bb23"
  },
});

export default SendMessageScreen;
