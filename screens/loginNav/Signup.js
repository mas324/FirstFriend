import React, { useContext, useState } from 'react';
import { TextInput, Pressable, View } from 'react-native';
import { appStyles } from '../../components/AppStyles';
import { Text } from '../../components/TextFix';
import { userCreate } from '../../utils/Database';
import { useAuth } from '../../utils/Auth';
import AppContext from '../../utils/AppContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignUpPage({ navigation }) {
    const [firstname, setUserFirstName] = useState('');
    const [lastname, setUserLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [Country_of_Origin, setUserCoO] = useState('');
    const [SID, setSID] = useState('');
    const [Major, setUserMajor] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    const [rejection, setRejection] = useState('');

    const { login } = useAuth()
    const { setState } = useContext(AppContext);

    const handleSignUp = () => {
        let verify = true;
        if (firstname == '' || lastname == '' || username == '' || SID == '' || password == '' || confPassword == '') {
            verify = false;
            // Add some sort of notification for non-optional forms
        }

        if (password !== confPassword) {
            verify = false;
            // Password not matching
        }

        if (verify) {
            userCreate({
                id: SID,
                email: email,
                firstName: firstname,
                lastName: lastname,
                userName: username,
                password: password,
                country: Country_of_Origin,
                study: Major
            }).then((resp) => {
                if (resp.status === 201) {
                    login(username);
                    setState(username);
                } else {
                    setRejection('Error occured. Please check if all fields are correct');
                }
            })
        }
    };

    return (
        <SafeAreaView>
            <Text style={appStyles.reject}>
                {rejection}
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <TextInput
                    style={[appStyles.input, {flex: 1}]}
                    placeholder="First Name"
                    value={firstname}
                    onChangeText={text => setUserFirstName(text)}
                    enterKeyHint='next'
                />
                <TextInput
                    style={[appStyles.input, {flex: 1}]}
                    placeholder="Last Name"
                    value={lastname}
                    onChangeText={text => setUserLastName(text)}
                    enterKeyHint='next'
                />
            </View>
            <TextInput
                style={[appStyles.input]}
                placeholder="Username"
                autoComplete='username-new'
                value={username}
                onChangeText={text => setUsername(text)}
                enterKeyHint='next'
            />
            <TextInput
                style={[appStyles.input]}
                placeholder='Email'
                value={email}
                onChangeText={text => setEmail(text)}
                enterKeyHint='next'
                inputMode='email'
            />
            <TextInput
                style={[appStyles.input]}
                placeholder="Country of Origin"
                value={Country_of_Origin}
                onChangeText={text => setUserCoO(text)}
                enterKeyHint='next'
            />
            <TextInput
                style={[appStyles.input]}
                placeholder="Student ID"
                value={SID}
                onChangeText={text => setSID(text)}
                enterKeyHint='next'
                inputMode='numeric'
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
                autoComplete='new-password'
                secureTextEntry={true}
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <TextInput
                style={appStyles.input}
                placeholder='Confirm Password'
                autoComplete='new-password'
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
