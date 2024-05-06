import { React, useContext, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from '../../components/TextFix';
import { appStyles } from '../../components/AppStyles';
import { findUser } from '../../utils/Firestore';
import AppContext from '../../utils/AppContext';

const SendMessageScreen = () => {
  const navigation = useNavigation();
  const [userID, setUserID] = useState("");
  const { user } = useContext(AppContext);

  const handleSubmit = () => {
    if (user.id === Number.parseInt(userID)) {
      console.log('Cant send to yourself');
      return;
    }
    findUser(Number.parseInt(userID)).then(userB => {
      const userArray = [];
      if (user.id < userB.id) {
        userArray.push(user);
        userArray.push(userB);
      }
      const params = {
        user: userArray,
        history: [],
      }
      navigation.navigate('MessageDetails', params);
    })
  };

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>Add New Friend</Text>
        <TextInput
          placeholder="Insert userID"
          placeholderTextColor="#e6bb23"
          fontWeight="bold"
          value={userID}
          onChangeText={(text) => setUserID(text)}
          keyboardType='number-pad'
          style={styles.input}
        />
        <TouchableOpacity
          style={[appStyles.button, {
            backgroundColor: '#e6bb23',
            justifyContent: 'center',
            height: 40
          }]}
          onPress={handleSubmit}
        >
          <Text style={[appStyles.buttonLabel, { color: 'white' }]}>Submit</Text>
        </TouchableOpacity>
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
    width: 350,
    padding: 10,
    color: "#e6bb23"
  },
});

export default SendMessageScreen;
