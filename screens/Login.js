import React, { useContext, useState } from 'react';
import { TextInput, SafeAreaView, Pressable, View } from 'react-native';
import { Text } from '../components/TextFix';
import { appStyles } from '../components/AppStyles';
import { userAuth } from '../utils/Database';
import { useAuth } from '../utils/Authentication/Auth';
import AppContext from '../utils/Authentication/AppContext';

export function LoginPage({ navigation }) {
    const { setState } = useContext(AppContext);
    const [username, setName] = useState('jdoe');
    const [password, setPass] = useState('password1');
    const [rejectNotif, setRejection] = useState('');
    const { login } = useAuth();

    const handleLogin = () => {
        if (username === '' || password === '') {
            setRejection('Fill out all forms');
            return;
        }

        userAuth(username, password).then((resp) => {
            console.log(resp.data);
            if (resp.data) {
                setRejection('');
                login(username);
                setState(username);
            } else {
                setRejection('Login information is incorrect');
            }
        }).catch(() => {
            setRejection('No connection to server. Try again later.');
        });
    }

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
                onPress={handleLogin}
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
                    <Text style={{ color: 'blue' }}>Signup</Text>
                </Pressable>
                <Pressable onPress={() => { navigation.navigate('PassRes') }}>
                    <Text style={{ color: 'blue' }}>Forgot password</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};
