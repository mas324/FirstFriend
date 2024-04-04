import React, {useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MessageDetails from './MessageDetails';



const Item = ({ name, photo, status }) => (
    <View style={styles.item}>
      <Image source={{ uri: photo }} style={styles.contactPhoto} />
      <View style={styles.messageContent}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.statusContainer}>
        <Text style={status === 'New' ? styles.newMessage : styles.readMessage}>{status} Message</Text>
          </View>
      </View>
    </View>
  );

const FAB = () => {
  const navigation = useNavigation();

  const navigateToSendMessageScreen = () => {
    navigation.navigate('SendMessageScreen');
  };

  return (
    <TouchableOpacity onPress={navigateToSendMessageScreen} style={styles.fab}>
      <Text style={styles.fabIcon}>+</Text>
    </TouchableOpacity>
  );
};

const Message = () => {
  const [messages, setMessages] = useState([]);

  const handleMessageSent = () => {
    console.log('Message sent!');
  };

  const handleAddMessage = (message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  const handleItemPress = (userID) => {
    navigation.navigate('MessageDetails', { userID, onMessageSent: handleMessageSent });
  };

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>First Friend</Text>
      </View>

      <FlatList
        data={messages}
        renderItem={({ item }) => <Item name={item.name} photo={item.photo} status={item.status} />}
      />

      <FAB />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    padding: 20,
    backgroundColor: '#800020'
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
  item: {
    padding: 8,
    flexDirection: 'row',
    marginVertical: 8,
    marginHorizontal: 8,
    alignItems: 'center',
    backgroundColor: '#f3e5ab',
    marginBottom: 6,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  contactPhoto: {
    marginHorizontal: 10,
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },
  messageContent: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusContainer: {
    marginTop: 10 , 
  },
  newMessage: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold',
  },
  readMessage: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#800020',
    borderRadius: 30,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 40,
    color: '#f3e5ab',
  },
});

export default Message;
