import { useState } from 'react';
import { TextInput, Pressable, Text, ImageBackground, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { appStyles } from '../../components/AppStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { confirmReset, sendPasswordReset } from '../../utils/Firestore';

const Stack = createNativeStackNavigator();

const image = require('../../assets/loginBG/CampusLawn.jpg');

function FormPage({ navigation }) {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('Enter Email for reset link');
    const [buttonMessage, setButtonMessage] = useState('Reset Password');
    const [color, setColor] = useState(null)

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={image}
                style={{ flex: 1, resizeMode: 'cover' }}>
                <View style={{ flex: 1, backgroundColor: 'rgba(200,200,200,0.7)', justifyContent: 'center' }}>
                    <Text style={[{ textAlign: 'center', color: '#860038', fontWeight: '500' }]}>
                        {message}
                    </Text>
                    <TextInput
                        style={appStyles.input}
                        placeholder='Email'
                        onChangeText={newmail => setEmail(newmail)}
                        defaultValue={email}
                        inputMode='email'
                    />
                    <Pressable
                        style={appStyles.button}
                        onPress={() => {
                            if (buttonMessage === 'Go back') {
                                navigation.goBack();
                            }
                            if (email === '') {
                                setMessage('Fill all fields!');
                                setColor(appStyles.reject);
                                return;
                            }

                            sendPasswordReset(email).then(() => {
                                setMessage('Link has been sent to the specified email\nFollow the instructions and return to the login page.');
                                setButtonMessage('Go back');
                                setColor({ color: 'black' })
                                //navigation.replace('ResetPassword')
                            }).catch((_err) => {
                                setMessage('Failed to verify user');
                                setColor(appStyles.reject);
                            })
                        }}
                    >
                        <Text style={appStyles.buttonLabel}>{buttonMessage}</Text>
                    </Pressable>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

function ResetPage({ navigation }) {
    const [password, setPass] = useState('');
    const [passConf, setConfirm] = useState('');
    const [code, setCode] = useState('');
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
            <Text>Enter code from email</Text>
            <TextInput
                style={appStyles.input}
                placeholder='Verification code'
                onChangeText={newCode => setCode(newCode)}
                defaultValue={code}
            />
            <Pressable
                style={appStyles.button}
                onPress={async () => {
                    if (password === '' || passConf === '' || code === '') {
                        setReject('Fill out all forms');
                        return;
                    }
                    if (password === passConf) {
                        confirmReset(code, password).then(() => {
                            navigation.goBack();
                        }).catch(_err => {
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
