import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const MessageDetails = ({ route }) => {
  const [message, setMessage] = useState('');
  const { userID } = route.params;

  const handleSend = () => {
    console.log('Message sent:', message);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Message Details</Text>
      <Text style={styles.userInfo}>Recipient: {userID}</Text>
      <TextInput
        placeholder="Type your message here..."
        placeholderTextColor="#f3e5ab"
        multiline
        style={styles.input}
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Send" onPress={handleSend} />
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
    color: '#f3e5ab',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 18,
    color: '#f3e5ab',
    marginBottom: 20,
  },
  input: {
    height: 150,
    borderWidth: 2,
    borderColor: '#f3e5ab',
    borderRadius: 10,
    padding: 10,
    color: '#f3e5ab',
    marginBottom: 20,
  },
});

export default MessageDetails;
