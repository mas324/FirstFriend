import React, { useContext, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from '../../components/TextFix';
import { appStyles } from '../../components/AppStyles';
import { findUser, initializeMessages } from '../../utils/Firestore';
import AppContext from '../../utils/AppContext';
import { MessageStore, User } from '../../components/Types';

declare global {
  namespace ReactNavigation {
    interface RootParamList { }
  }
}

const SendMessageScreen = () => {
  const navigation = useNavigation();
  const [userID, setUserID] = useState('');
  const { user } = useContext(AppContext);

  const handleSubmit = async () => {
    const group = userID.split(',');
    console.log('Messages: split', group);
    const groupID = Array<number>();
    try {
      for (let i = 0; i < group.length; i++) {
        const id = Number.parseInt(group[i].trim());
        if (user.id === id) {
          console.log('Cant send to yourself');
          setUserID('Cant sent messages to yourself');
          return;
        } else {
          groupID.push(id);
        }
      }
    } catch (_err) {
      setUserID('ID must be a number');
      return;
    }

    console.log(groupID);
    const userArray = [user];
    try {
      for (let u = 0; u < groupID.length; u++) {
        userArray.push(await findUser(groupID[u]));
      }
      userArray.sort((a, b) => a.id - b.id);
      //console.log(userArray);

      const params: MessageStore = {
        user: userArray,
        history: []
      };

      await initializeMessages(userArray) ? navigation.replace('MessageDetails', params) : setUserID('User already in contacts');
    } catch (err) {
      setUserID('A user does not exist');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>Add New Friend</Text>
        <Text style={styles.headingText}>Add comma for group message</Text>
        <TextInput
          placeholder="Insert userID"
          placeholderTextColor="#e6bb23"
          value={userID}
          onChangeText={(text) => setUserID(text)}
          style={[styles.input, { fontWeight: 'bold' }]}
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
