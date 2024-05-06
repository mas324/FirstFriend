import {React, useState} from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Firebase from 'firebase/app';
import { messageGet } from '../../utils/Database';

export const MessageChannel = async (senderID, receiverID) => {
    try {

      const messageChannel = firestore.collection('messages');
      const query = await messageChannel
        .where('senderID', '==', senderID)
        .where('receiverID', '==', receiverID)
        .get();
  
      const messageHistory = [];
      query.forEach((messages) => {
        messageHistory.push(messageData);
      });
  
      return messageHistory;
    } catch (error) {
      console.error('Error fetching message history:', error);
      return []; 
    }
  };












