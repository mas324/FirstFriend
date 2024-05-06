import React, { useCallback, useContext, useState } from 'react';
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

  let otherUser: User;
  userHistory.user.forEach(item => {
    if (item.id !== sender.id) {
      otherUser = item;
    }
  });

  useFocusEffect(useCallback(() => {
    const timerID = setInterval(() => {
      getSingleMessage(userHistory.user[0].id, userHistory.user[1].id).then((refresh) => {
        if (refresh !== undefined && refresh !== null && refresh.history.length > 0) {
          if (refresh.history.length !== history.length) {
            console.log('MessageDetail: sync messages');
            const combine = history.concat(refresh.history);
            combine.filter((value, index, self) => {
              index === self.findIndex((t) => {
                return t.message === value.message && t.time === value.time && t.userIDSender === value.userIDSender
              });
            });
            sendPacket(combine);
            setHistory(combine);
          }
        }
      }).finally(() => console.log('Message: timer finish'));
    }, 10000);
    setHistory(userHistory.history);
    navigation.addListener('blur', () => {
      console.log('MessageDetail: unfocused');
      clearInterval(timerID);
    })
  }, [route]));

  const handleSend = () => {
    console.log('MessageDetails:', messageBody);

    const toSend: Message = {
      userIDSender: sender.id,
      userIDReceiver: otherUser.id,
      message: messageBody,
      read: false,
      time: Date.now(),
    }
    const newHistory = history.slice();
    newHistory.push(toSend);
    setHistory(newHistory);
    setMessageBody('');
  };

  function sendPacket(newHistory: Message[]) {
    const docID = userHistory.user[0].id.toString() + '_' + userHistory.user[1].id.toString();
    const sendPacket: MessageStore = {
      user: userHistory.user,
      history: newHistory,
    }

    sendMessage(sendPacket, docID).then((value) => {
      if (!value) {
        setMessageBody('Message failed to send');
        return;
      }
      setHistory(newHistory);
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: 'purple' }}>
        <Text style={styles.heading}>{otherUser.firstname} {otherUser.lastname}</Text>
      </View>
      <KeyboardAvoidingView behavior='padding' style={[styles.container, {}]}>
        <FlatList
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
