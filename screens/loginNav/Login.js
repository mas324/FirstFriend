import React, { useContext, useState } from 'react';
import { TextInput, Pressable, View } from 'react-native';
import { Text } from '../../components/TextFix';
import { appStyles } from '../../components/AppStyles';
import { useAuth } from '../../utils/Auth';
import AppContext from '../../utils/AppContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FireStatusCodes, signIn } from '../../utils/Firestore';

export default function LoginPage({ navigation }) {
    const { setState } = useContext(AppContext);
    const [username, setName] = useState('dev@firstfriend.com');
    const [password, setPass] = useState('123456');
    const [rejectNotif, setRejection] = useState('');
    const { login } = useAuth();

    const handleLogin = () => {
        if (username === '' || password === '') {
            setRejection('Fill out all forms');
            return;
        }

        signIn(username, password).then(({ status, data, user }) => {
            console.log("login:", data.data());
            switch (status) {
                case FireStatusCodes.NO_USER:
                    setRejection('User does not exist');
                    return;
                case FireStatusCodes.LOGIN_INVALID:
                    setRejection('Invalid login information');
                    return;
                default:
                    if (data != undefined && data != null && data.exists()) {
                        setRejection('');
                        login(data.data(), user);
                        setState(data.data());
                    } else {
                        console.log("No data exists. Reason:", status);
                    }
            }
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
                    justifyContent: 'space-evenly',
                    color: '#EEE8AA'
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
