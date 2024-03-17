import React, { useState } from 'react';
import { TextInput, Button, SafeAreaView } from 'react-native';
import { appStyles } from '../components/AppStyles';

export function SignUpPage({navigation}) {
    const [firstname, setUserFirstName] = useState('');
    const [lastname, setUserLastName] = useState('');
    const [username, setUsername] = useState('');
    const [Country_of_Origin, setUserCoO] = useState('');
    const [SID, setSID] = useState('');
    const [Major, setUserMajor] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        // Perform validation here (e.g., check if fields are not empty)
        // isEmpty(), comparator, if-else, etc... maybe

        // Display the entered data (can modify this part based on requirements)
        console.log('UserFirstName: ' , firstname);
        console.log('UserLastName: ' , lastname);
        console.log('Username: ', username);
        console.log('Country of Origin: ', Country_of_Origin);
        console.log('Student ID: ' + SID);
        console.log('Major: ', Major);

        console.log('Password: ' + password);
    };

    return (
        <SafeAreaView>
            <TextInput
                style={[appStyles.input]}
                placeholder="UserFirstName"
                value={firstname}
                onChangeText={text => setUserFirstName(text)}
            />
             <TextInput
                style={[appStyles.input]}
                placeholder="UserLastName"
                value={lastname}
                onChangeText={text => setUserLastName(text)}
            />
            <TextInput
                style={[appStyles.input]}
                placeholder="Username"
                value={username}
                onChangeText={text => setUsername(text)}
            />
            <TextInput
                style={[appStyles.input]}
                placeholder="Country of Origin"
                value={Country_of_Origin}
                onChangeText={text => setUserCoO(text)}
            />
            <TextInput
                style={[appStyles.input]}
                placeholder="Student ID"
                value={SID} 
                onChangeText={text => setSID(text)}
            />
            <TextInput
                style={[appStyles.input]}
                placeholder="Major"
                value={Major}
                onChangeText={text => setUserMajor(text)}
            />
            <TextInput
                style={appStyles.input}
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <Button title="Sign Up" onPress={handleSignUp} />
        </SafeAreaView>
    )
}
