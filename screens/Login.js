import React, { useState } from 'react';
import { TextInput, SafeAreaView, Pressable, View } from 'react-native';
import { Text } from '../components/TextFix';
import { appStyles } from '../components/AppStyles';
import { userAuth } from '../utils/Database';

export function LoginPage({ navigation }) {

    const [username, setName] = useState('');
    const [password, setPass] = useState('');
    const [rejectNotif, setRejection] = useState('');

    return (
        <SafeAreaView style={{ padding: 10, flex: 1, alignContent: 'center' }}>
            <Text
                style={{ color: 'red', alignSelf: 'center', }}
                textBreakStrategy='simple'
            >
                {rejectNotif}
            </Text>
            <TextInput
                style={appStyles.input}
                autoComplete='username'
                placeholder='Username'
                onChangeText={newName => setName(newName)}
                defaultValue={username}
            />
            <TextInput
                style={appStyles.input}
                autoComplete='current-password'
                secureTextEntry={true}
                placeholder='Password'
                onChangeText={newPass => setPass(newPass)}
                defaultValue={password}
            />
            <Pressable
                style={appStyles.button}
                onPress={() => {
                    if (username !== '' && password !== '') {
                        userAuth(username, password).then((resp) => {
                            resp.data ? navigation.navigate('Home') : setRejection('Login information is incorrect');
                        });
                        return;
                    }
                    setRejection('Fill out all forms');
                }}
            >
                <Text style={appStyles.buttonLabel}>Login</Text>
            </Pressable>
            <View
                style={{
                    flexDirection: 'row',
                    padding: 20,
                    justifyContent: 'space-evenly'
                }}
            >
                <Pressable onPress={() => { navigation.navigate('Signup') }}>
                    <Text style={{color: 'blue'}}>Signup</Text>
                </Pressable>
                <Pressable onPress={() => { navigation.navigate('PassRes') }}>
                    <Text style={{color: 'blue'}}>Forgot password</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};
