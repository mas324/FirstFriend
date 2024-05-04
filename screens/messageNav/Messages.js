import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Image, Pressable, StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MessageDetails from './MessageDetails';
import SendMessageScreen from './SendMessageScreen';
import { deleteItem, getItem, setItem } from '../../utils/LocalStore';
import { appStyles } from '../../components/AppStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppContext from '../../utils/AppContext';

const Stack = createNativeStackNavigator();

const Item = ({ name, photo, status, index }) => {
  const altColor = index % 2 === 0 ? '#e6bb23' : '#f6e4a9'
  return (
    <View style={[styles.item, { backgroundColor: altColor }]}>
      <TouchableOpacity>
        <Image source={{ uri: photo }} style={styles.contactPhoto} />
        <View style={styles.messageContent}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.statusContainer}>
            <Text style={status === 'New' ? styles.newMessage : styles.readMessage}>{status} Message</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
};

const MessagePage = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const { state } = useContext(AppContext);


  const handleMessageSent = () => {
    const username = state.username;
    const messageData = {
      name: username,
      photo: `https://ui-avatars.com/api/?name=${username}&background=random`,
      status: 'New'
    };

    setMessages(prevMessages => {
      const updatedMessages = prevMessages.concat([messageData]);
      setItem('@messages', updatedMessages);
      return updatedMessages;
    })
  };


  const handleAddMessage = (message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  const handleItemPress = (userID) => {
    console.log(handleMessageSent);
    navigation.navigate('MessageDetails', { userID, onMessageSent: handleMessageSent});
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>First Friend</Text>
      </View>
      <Pressable // Remove this as soon as possible when the messaging works
        style={appStyles.button}
        onPress={() => handleMessageSent()}
      >
        <Text style={appStyles.buttonLabel}> Test button </Text>
      </Pressable>
      <FlatList
        data={messages}
        renderItem={({ item, index }) => <Item name={item.name} photo={item.photo} status={item.status} index={index} />}
      />
      <TouchableOpacity onPress={() => { navigation.navigate('SendMessageScreen'); deleteItem('@messages') }} style={styles.fab}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const Messages = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='MessageMain' component={MessagePage} />
      <Stack.Screen name='SendMessageScreen' component={SendMessageScreen} />
      <Stack.Screen name='MessageDetails' component={MessageDetails} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    padding: 16,
    backgroundColor: '#860038'
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
  item: {
    padding: 8,
    flexDirection: 'row',
    marginVertical: 8,
    marginHorizontal: 8,
    alignItems: 'center',
    backgroundColor: '#e6bb23',
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
    marginTop: 10,
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
    backgroundColor: '#860038',
    borderRadius: 30,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 40,
    color: '#e6bb23',
  },
});

export default Messages;
