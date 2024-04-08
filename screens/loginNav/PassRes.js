import { useState } from 'react';
import { TextInput, Pressable } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from '../../components/TextFix';
import { appStyles } from '../../components/AppStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { userReset, userVerify } from '../../utils/Database';

const Stack = createNativeStackNavigator();
let key;
let outerID;

function FormPage({ navigation }) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [id, setID] = useState('');
    const [message, setMessage] = useState('Enter email, username, and student ID');

    return (
        <SafeAreaView>
            <Text style={{ textAlign: 'center' }}>
                {message}
            </Text>
            <TextInput
                style={appStyles.input}
                placeholder='Email'
                onChangeText={newmail => setEmail(newmail)}
                defaultValue={email}
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
            />
            <Pressable
                style={appStyles.button}
                onPress={() => {
                    userVerify({ email: email, id: id, username: username }).then((resp) => {
                        if (resp.status === 202) {
                            key = resp.data;
                            outerID = id;
                            navigation.replace('ResetPassword');
                        }
                    }, (err) => {
                        setMessage(err.response.data);
                    })
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
            <Text>Test input for the next step in reset password</Text>
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
                placeholder='Reenter password'
                onChangeText={newPass => setConfirm(newPass)}
                defaultValue={passConf}
            />
            <Pressable
                style={appStyles.button}
                onPress={() => {
                    if (password === '' || passConf === '') {
                        setReject('Fill out forms');
                        return;
                    }
                    if (password === passConf) {
                        userReset({ id: outerID, password: password }).then(() => {
                            navigation.goBack();
                        }).catch((e) => {
                            setReject(e)
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
