import React, { useCallback, useContext, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Image, StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MessageDetails from './MessageDetails';
import SendMessageScreen from './SendMessageScreen';
import { deleteItem } from '../../utils/LocalStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppContext from '../../utils/AppContext';
import { Text } from '../../components/TextFix';
import { MessageStore } from '../../components/Types';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { getMessage } from '../../utils/Firestore';

const Stack = createNativeStackNavigator();

const MessagePage = ({ navigation }) => {
  const [contacts, setContacts] = useState(Array<MessageStore>());
  const { user, message, setMessage } = useContext(AppContext);
  const route = useRoute();

  // there should be an array of all contacts that have the user gotten from the document id
  // each item in that array should be in the style of {user, history}
  // the history is an array of messages

  useFocusEffect(useCallback(() => {
    handleUpdates();
    const timerID = setInterval(() => {
      handleUpdates();
    }, 2000);
    navigation.addListener('blur', () => {
      console.log('Messages: unfocus');
      clearInterval(timerID);
    });
  }, [route]));

  const handleUpdates = () => {
    console.log('Messages: contact get');
    getMessage(user.id).then((contactArray) => {
      if (contactArray !== undefined && contactArray !== null) {
        setContacts(contactArray);
      }
    })
  }

  const handleItemPress = (messageHistory: MessageStore) => {
    navigation.navigate('MessageDetails', messageHistory);
  };

  const Item = ({ store, index }) => {
    const usersToDisplay = (store as MessageStore).user;
    const userDisplay = usersToDisplay[0].id !== user.id ? usersToDisplay[0] : usersToDisplay[1];
    const photo = `https://ui-avatars.com/api/?name=${userDisplay.firstname}&background=random`;
    const name = userDisplay.firstname + ' ' + userDisplay.lastname;
    const status = 'New';

    const altColor = index % 2 === 0 ? '#e6bb23' : '#f6e4a9'
    return (
      <View style={[styles.item, { backgroundColor: altColor }]}>
        <TouchableOpacity onPress={() => handleItemPress(store)}>
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>First Friend</Text>
      </View>
      <FlatList
        data={contacts}
        renderItem={({ item, index }) => <Item store={item} index={index} />}
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
