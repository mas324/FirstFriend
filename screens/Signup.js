import React, { useState } from 'react';
import { TextInput, Button, SafeAreaView, Pressable } from 'react-native';
import { appStyles } from '../components/AppStyles';
import { Text } from '../components/TextFix';
import { userCreate } from '../utils/Database';

export function SignUpPage({navigation}) {
    const [firstname, setUserFirstName] = useState('');
    const [lastname, setUserLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [Country_of_Origin, setUserCoO] = useState('');
    const [SID, setSID] = useState('');
    const [Major, setUserMajor] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    const handleSignUp = () => {
        let verify = true;
        if (firstname == '' || lastname == '' || username == '' || SID == '' || password == '' || confPassword == '') {
            verify = false;

        }

        if (password !== confPassword) {
            verify = false;
            // Password not matching
        }

        if (verify) {
            let data = {
                name: {
                    first: firstname,
                    last: lastname,
                    user: username
                },
                school: {
                    sid: SID,
                    study: Major,
                    email: email
                },
                country: Country_of_Origin,
                password: password
            }

            userCreate(data);
        }
    };

    return (
        <SafeAreaView>
            <TextInput
                style={[appStyles.input]}
                placeholder="First Name"
                value={firstname}
                onChangeText={text => setUserFirstName(text)}
            />
             <TextInput
                style={[appStyles.input]}
                placeholder="Last Name"
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
                placeholder='Email'
                value={email}
                onChangeText={text => setEmail(text)}
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
            <TextInput
                style={appStyles.input}
                placeholder='Confirm Password'
                secureTextEntry={true}
                value={confPassword}
                onChangeText={text => setConfPassword(text)}
            />
            <Pressable style={appStyles.button} onPress={handleSignUp}>
                <Text style={appStyles.buttonLabel}>Sign up</Text>
            </Pressable>
        </SafeAreaView>
    )
}
