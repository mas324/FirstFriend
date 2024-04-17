import React, { useContext, useState } from 'react';
import { TextInput, Pressable, View } from 'react-native';
import { Text } from '../../components/TextFix';
import { appStyles } from '../../components/AppStyles';
import { userAuth } from '../../utils/Database';
import { getHash, useAuth } from '../../utils/Auth';
import AppContext from '../../utils/AppContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginPage({ navigation }) {
    const { setState } = useContext(AppContext);
    const [username, setName] = useState('');
    const [password, setPass] = useState('');
    const [rejectNotif, setRejection] = useState('');
    const { login } = useAuth();

    const handleLogin = async () => {
        if (username === '' || password === '') {
            setRejection('Fill out all forms');
            return;
        }

        if (0 == 1) {
            login('Developer');
            setState('Developer');
            return;
        }

        userAuth(username, await getHash(password)).then((response) => {
            console.log(response);
            if (response.data && response.status === 200) {
                setRejection('');
                login(username);
                setState(username);
            } else {
                setRejection('Login information is incorrect');
            }
        }).catch(_err => {
            console.error(_err.message);
            setRejection(_err.request.status === 401 ? 'Login information is incorrect' : 'Server unavailable');
        });
    }

    return (
        <SafeAreaView style={{ padding: 10, flex: 1, alignContent: 'center' }}>
            <Text style={appStyles.reject}>
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
