import React, { useCallback, useContext, useRef, useState } from 'react';
import { View, TextInput, StyleSheet, KeyboardAvoidingView, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Text } from '../../components/TextFix';
import AppContext from '../../utils/AppContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Message, MessageStore, User } from '../../components/Types';
import { getSingleMessage, sendMessage } from '../../utils/Firestore';
import { appStyles } from '../../components/AppStyles';

const MessageDetails = ({ navigation, route }) => {
  const [messageBody, setMessageBody] = useState('');
  const [history, setHistory] = useState(Array<Message>);
  const { user: sender, } = useContext(AppContext);
  const userHistory = route.params as MessageStore;

  let allUsers = userHistory.user;
  let otherID = Array<number>();
  let docID = '';
  let names = '';

  for (let i = 0; i < allUsers.length; i++) {
    const ru = allUsers[i];
    if (sender.id === ru.id) {
      continue;
    }
    otherID.push(ru.id);
    if (i === allUsers.length - 1) {
      names += ru.firstname + ' ' + ru.lastname;
    } else {
      names += ru.firstname + ' ' + ru.lastname + ', ';
    }
  }

  for (let i = 0; i < allUsers.length; i++) {
    const ru = allUsers[i];
    if (i === allUsers.length - 1) {
      docID += ru.id.toString();
    } else {
      docID += ru.id.toString() + 'U';
    }
  }

  names = names.trimEnd();
  if (names.endsWith(',')) {
    names = names.slice(0, names.length - 1);
  }


  useFocusEffect(useCallback(() => {
    setHistory(userHistory.history);

    const timerID = setInterval(() => {
      syncMessages();
    }, 1000);
    navigation.addListener('blur', () => {
      console.log('MessageDetail: unfocused');
      clearInterval(timerID);
    });
  }, [route]));

  const handleSend = () => {
    if (messageBody.trim().length === 0) {
      return;
    }
    console.log('MessageDetails:', messageBody);

    const toSend: Message = {
      userIDSender: sender.id,
      userIDReceiver: otherID,
      message: messageBody,
      read: false,
      time: Date.now(),
    }

    sendMessage(toSend, docID).then(value => {
      if (value) {
        setMessageBody('');
        syncMessages();
      } else {
        setMessageBody('Message not sent');
      }
    });
  };

  function syncMessages() {
    getSingleMessage(docID).then(newData => {
      setHistory(newData);
    });
  }

  const messageStyle = StyleSheet.create({
    box: {
      minHeight: 20,
      margin: 6,
      backgroundColor: 'rgba(40,100,255,1)',
      borderRadius: 10
    },
    text: {
      fontSize: 20,
      color: 'white',
      padding: 8
    }
  })

  const listRef = useRef(null);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: 'purple' }}>
        <Text style={styles.heading}>{names}</Text>
      </View>
      <KeyboardAvoidingView behavior='padding' style={[styles.container, {}]}>
        <FlatList
          ref={listRef}
          onContentSizeChange={() => listRef.current.scrollToEnd({ animated: true })}
          onLayout={() => listRef.current.scrollToEnd({ animated: true })}
          data={history}
          renderItem={({ item }) => {
            const message = item as Message;
            //console.log('MessageTest:', message);
            if (message.userIDSender === sender.id) {
              return (
                <View style={[messageStyle.box, {}]}>
                  <Text style={[messageStyle.text, { textAlign: 'right' }]}>{message.message}</Text>
                </View>
              )
            } else {
              return (
                <View style={[messageStyle.box, { backgroundColor: 'white' }]}>
                  <Text style={[messageStyle.text, { color: '#444' }]}>{message.message}</Text>
                </View>
              )
            }
          }}
        />
        <View>
          <TextInput
            placeholder='Message here'
            placeholderTextColor='#e6bb23'
            style={styles.input}
            multiline
            value={messageBody}
            onChangeText={(text) => setMessageBody(text)}
          />
          <TouchableOpacity onPress={handleSend} style={[appStyles.button, {}]}>
            <Text style={[appStyles.buttonLabel, {}]}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#860038',
  },
  heading: {
    fontSize: 30,
    color: '#e6bb23',
    fontWeight: 'bold',
    marginVertical: 6,
    alignSelf: 'center'
  },
  userInfo: {
    fontSize: 18,
    color: '#e6bb23',
    marginBottom: 20,
  },
  input: {
    minHeight: 40,
    borderWidth: 2,
    borderColor: '#e6bb23',
    borderRadius: 10,
    padding: 10,
    color: '#e6bb23',
    marginBottom: 20,
  },
});

export default MessageDetails;
