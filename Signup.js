import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const SignUpPage = () => {
    // maybe first name, last name, etc...
    // const [firstname, setUserfirstname] = useState('');
    // const [lastname, setUserlastname] = useState('');
    // const [Country of origin, ] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        // Perform validation here (e.g., check if fields are not empty)
        // isEmpty(), comparator, if-else, etc... maybe

        // Display the entered data (can modify this part based on requirements)
        // console.log('Userfirstname: ', userfirstname);
        // console.log('Userlastname: ', userlastname);
        console.log('Username: ', username);
        console.log('Email: ' + email);
        console.log('Password: ' + password);
    }; 

    return (
        <View>
            <Text>Sign Up</Text>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={text => setUsername(text)}
            />
            <TextInput
                placeholder="Email"
                value={email} 
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <Button title="Sign Up" onPress={handleSignUp} />
        </View>
    );
};

export default SignUpPage;