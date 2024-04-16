import { useState } from 'react';
import { TextInput, Pressable } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from '../../components/TextFix';
import { appStyles } from '../../components/AppStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { userReset, userVerify } from '../../utils/Database';
import { getHash } from '../../utils/Auth';

const Stack = createNativeStackNavigator();
let key;

function FormPage({ navigation }) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [id, setID] = useState('');
    const [message, setMessage] = useState('Enter email, username, and student ID');
    const [color, setColor] = useState(null)

    return (
        <SafeAreaView>
            <Text style={[{ textAlign: 'center' }, color]}>
                {message}
            </Text>
            <TextInput
                style={appStyles.input}
                placeholder='Email'
                onChangeText={newmail => setEmail(newmail)}
                defaultValue={email}
                inputMode='email'
            />
            <TextInput
                style={appStyles.input}
                placeholder='Username'
                onChangeText={uname => setUsername(uname)}
                defaultValue={username}
            />
            <TextInput
                style={appStyles.input}
                placeholder='Student ID'
                onChangeText={newID => setID(newID)}
                defaultValue={id}
                inputMode='numeric'
            />
            <Pressable
                style={appStyles.button}
                onPress={() => {
                    if (email === '' || username === '' || id === '') {
                        setMessage('Fill all fields');
                        setColor(appStyles.reject);
                        return;
                    }
                    userVerify({ email: email, id: id, username: username }).then((resp) => {
                        if (resp.status === 202) {
                            key = resp.data;
                            navigation.replace('ResetPassword');
                        }
                    }).catch(_err => {
                        setMessage('Failed to verify user');
                        setColor(appStyles.reject);
                    });
                }}
            >
                <Text style={appStyles.buttonLabel}>Reset Password</Text>
            </Pressable>
        </SafeAreaView>
    )
}

function ResetPage({ navigation }) {
    const [password, setPass] = useState('');
    const [passConf, setConfirm] = useState('');
    const [reject, setReject] = useState('');

    return (
        <SafeAreaView>
            <Text>Enter new password</Text>
            <TextInput
                style={appStyles.input}
                secureTextEntry={true}
                placeholder='New Password'
                onChangeText={newPass => setPass(newPass)}
                defaultValue={password}
            />
            <TextInput
                style={appStyles.input}
                secureTextEntry={true}
                placeholder='Confirm password'
                onChangeText={newPass => setConfirm(newPass)}
                defaultValue={passConf}
            />
            <Pressable
                style={appStyles.button}
                onPress={() => {
                    if (password === '' || passConf === '') {
                        setReject('Fill out all forms');
                        return;
                    }
                    if (password === passConf) {
                        let hashedPass = '';
                        getHash(password).then(hashed => hashedPass = hashed
                        ).catch(err => setReject('Unknown error:', err));

                        userReset({ password: hashedPass, key: key }).then(() => {
                            navigation.goBack();
                        }).catch((_err) => {
                            setReject('Error in resetting password');
                        });
                    } else {
                        setReject('Password mismatch');
                    }
                }}
            >
                <Text style={appStyles.buttonLabel}>Submit</Text>
            </Pressable>
            <Text style={appStyles.reject}>{reject}</Text>
        </SafeAreaView>
    )
}

export default function PasswordReset() {
    return (
        <Stack.Navigator initialRouteName='ResetForm' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='ResetForm' component={FormPage} />
            <Stack.Screen name='ResetPassword' component={ResetPage} />
        </Stack.Navigator>
    )
}
