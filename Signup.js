import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export function SignUpPage({navigation}) {
    // const [firstName, setUserFirstName] = useState('');
    // const [lastName, setUserLastName] = useState('');
    const [username, setUsername] = useState('');
    const [Country_of_Origin, setUserCoO] = useState('');
    const [SID, setSID] = useState('');
    const [Major, setUserMajor] = useState('');

    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        // Perform validation here (e.g., check if fields are not empty)
        // isEmpty(), comparator, if-else, etc... maybe

        // Display the entered data (can modify this part based on requirements)
        // console.log('UserFirstName: ' + 'UserLastName: ', firstName, lastName);
        console.log('Username: ', username);
        console.log('Country of Origin: ', Country_of_Origin);
        console.log('Student ID: ' + SID);
        console.log('Major: ', Major);

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
                placeholder="Country of Origin"
                value={Country_of_Origin}
                onChangeText={text => setUserCoO(text)}
            />
            <TextInput
                placeholder="Student ID"
                value={SID} 
                onChangeText={text => setSID(text)}
            />
            <TextInput
                placeholder="Major"
                value={Major}
                onChangeText={text => setUserMajor(text)}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <Button title="Sign Up" onPress={handleSignUp} />
        </View>
    )
}
