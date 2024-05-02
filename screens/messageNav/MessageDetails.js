import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MessageDetails = ({ route }) => {
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const { userID, onMessageSent } = route.params;

  const handleSend = () => {
    console.log('Message sent:', message);
    onMessageSent();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>New Message</Text>
      <Text style={styles.userInfo}> {userID}</Text>
      <TextInput
        placeholder="Type your message here..."
        placeholderTextColor="#eee8aa"
        multiline
        style={styles.input}
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Send" color="#eee8aa" onPress={handleSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#800020',
  },
  heading: {
    fontSize: 24,
    color: '#eee8aa',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 18,
    color: '#eee8aa',
    marginBottom: 20,
  },
  input: {
    height: 75,
    borderWidth: 2,
    borderColor: '##eee8aa',
    borderRadius: 10,
    padding: 10,
    color: '#eee8aa',
    marginBottom: 20,
  },
});

export default MessageDetails;
