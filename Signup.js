import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { AuthContext, hasher } from './components/Auth';

export function SignUpPage({navigation}) {
    const [firstname, setUserFirstName] = useState('');
    const [lastname, setUserLastName] = useState('');
    const [username, setUsername] = useState('');
    const [Country_of_Origin, setUserCoO] = useState('');
    const [SID, setSID] = useState('');
    const [Major, setUserMajor] = useState('');

    const [password, setPassword] = useState('');
    const { signUp } = React.useContext(AuthContext);

    const handleSignUp = () => {
        // Perform validation here (e.g., check if fields are not empty)
        // isEmpty(), comparator, if-else, etc... maybe

        // Display the entered data (can modify this part based on requirements)

        hasher(password).then(hashPass => {
            signUp({firstname, lastname, username,
                Country_of_Origin, SID, Major, hashPass});
        })
        
    };

    return (
        <View>
            <Text>Sign Up</Text>
            <TextInput
                placeholder="UserFirstName"
                value={firstname}
                onChangeText={text => setUserFirstName(text)}
            />
             <TextInput
                placeholder="UserLastName"
                value={lastname}
                onChangeText={text => setUserLastName(text)}
            />
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
