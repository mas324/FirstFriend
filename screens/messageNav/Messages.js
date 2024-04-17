import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Image, Pressable, StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MessageDetails from './MessageDetails';
import SendMessageScreen from './SendMessageScreen';
import { getItem, setItem } from '../../utils/LocalStore';
import { appStyles } from '../../components/AppStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { messageCreate, messageGet } from '../../utils/Database';
import AppContext from '../../utils/AppContext';

const Stack = createNativeStackNavigator();

const Item = ({ name, photo, status }) => {
  return (
    <View style={styles.item}>
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
  const { state: user } = useContext(AppContext);

  useEffect(() => {
    return;
    let local = null;
    let remote = null;
    getItem('@messages').then(val => {
      if (val !== null && Array.isArray(val.data) && val.data.length) {
        local = val;
      }
    }).catch(err => {
      console.error(err)
    }).finally(() => {
      messageGet(user).then(val => {
        if (val !== null && Array.isArray(val.data) && val.data.length) {
          remote = val.data;
        }
      }).catch(err => {
        console.error(err);
      }).finally(() => {
        if (local !== null && remote !== null) {
          console.log('Comparison state');
          /*
          * Code here to compare timestamps to see what is outdated
          * The internal storage should be outdated
          * If not then something is wrong with processing
          * This is here to fix any problem that may occur with that situation
          * When in doubt just use remote database, as both users will be synced with that
          */
        } else if (local !== null) {
          setMessages(local);
        } else if (remote !== null) {
          setMessages(remote);
        }

        console.log(messages);
      });
    });
  }, []);

  const handleMessageSent = () => {
    const messageData = {
      name: user,
      photo: `https://ui-avatars.com/api/?name=${user}&background=random`,
      status: 'New'
    };
    messageCreate(messageData).then(_resp => {
      setMessages(messages.concat([messageData]));
      //setItem('@messages', messages);
    }).catch(rej => {
      console.error(rej);
      // Notify user of message failed to send
      // Do not put message into array
    });
  };


  const handleAddMessage = (message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  const handleItemPress = (userID) => {
    navigation.navigate('MessageDetails', { userID, onMessageSent: handleMessageSent });
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
        renderItem={({ item }) => <Item name={item.name} photo={item.photo} status={item.status} />}
      />
      <TouchableOpacity onPress={() => navigation.navigate('SendMessageScreen')} style={styles.fab}>
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
    backgroundColor: '#800020',
    borderRadius: 30,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 40,
    color: '#f3e5ab',
  },
});

export default Messages;
