import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Item = ({ name, timestamp, photo }) => (
    <View style={styles.item}>
      <Image source={{ uri: photo }} style={styles.contactPhoto} />
      <View style={styles.messageContent}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.statusContainer}>
          <Text style={styles.status}>New Message</Text>
        </View>
        <Text style={styles.timestamp}>{timestamp}</Text>
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
  
  const data = [
    { name: 'John', photo: 'https://http.cat/images/200.jpg'},
    { name: 'John', photo: 'https://http.cat/images/200.jpg'},
   { name: 'John', photo: 'https://http.cat/images/200.jpg'},
    { name: 'John', photo: 'https://http.cat/images/200.jpg'},
     { name: 'John', photo: 'https://http.cat/images/200.jpg'},
    { name: 'John', photo: 'https://http.cat/images/200.jpg'},
   { name: 'John', photo: 'https://http.cat/images/200.jpg'},
    { name: 'John', photo: 'https://http.cat/images/200.jpg'},
    { name: 'John', photo: 'https://http.cat/images/200.jpg'},
    { name: 'John', photo: 'https://http.cat/images/200.jpg'},
   { name: 'John', photo: 'https://http.cat/images/200.jpg'},
    { name: 'John', photo: 'https://http.cat/images/200.jpg'},
     { name: 'John', photo: 'https://http.cat/images/200.jpg'},
    { name: 'John', photo: 'https://http.cat/images/200.jpg'},
   { name: 'John', photo: 'https://http.cat/images/200.jpg'},
    { name: 'John', photo: 'https://http.cat/images/200.jpg'},
   { name: 'John', photo: 'https://http.cat/images/200.jpg'},
    { name: 'John', photo: 'https://http.cat/images/200.jpg'},
   { name: 'John', photo: 'https://http.cat/images/200.jpg'},
    { name: 'John', photo: 'https://http.cat/images/200.jpg'},
   { name: 'John', photo: 'https://http.cat/images/200.jpg'},
    { name: 'John', photo: 'https://http.cat/images/200.jpg'},
   { name: 'John', photo: 'https://http.cat/images/200.jpg'},
    { name: 'John', photo: 'https://http.cat/images/200.jpg'},
   { name: 'John', photo: 'https://http.cat/images/200.jpg'},
    { name: 'John', photo: 'https://http.cat/images/200.jpg'},
   { name: 'John', photo: 'https://http.cat/images/200.jpg'},
    { name: 'John', photo: 'https://http.cat/images/200.jpg'},
  ];

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>First Friend</Text>
      </View>

      <FlatList
        data={data}
        renderItem={({ item }) => <Item name={item.name} photo={item.photo}   />}
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
  timestamp: {
    fontSize: 10,
    color: 'gray',
  },
  statusContainer: {
    marginTop: 10 , 
  },
  status: {
    fontSize: 14,
    color: 'green', 
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
    color: 'white',
  },
});

export default Message;