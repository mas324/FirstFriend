import { useState } from 'react';
import { SafeAreaView, TextInput, Button } from 'react-native';
import { Text } from '../components/TextFix';
import { appStyles } from '../components/AppStyles';

export function PasswordReset({ navigation }) {
    const [email, setEmail] = useState('');

    return (
        <SafeAreaView>
            <Text
                style={{
                    textAlign: 'center'
                }}
            >Enter email used to signup. It should be your school email, unless you used something else</Text>
            <TextInput
                style={appStyles.input}
                autoComplete='email'
                placeholder='Email'
                onChangeText={newmail => setEmail(newmail)}
                defaultValue={email}
            />
            <Button
                title='Submit'
                onPress={() => {
                    // TODO: Connection to database to verify
                    // Should require email and student id
                    // After both are verified enable password reset
                    // Not secure but a basic proof of concept

                    //newPassword(navigation);
                }}
            />
        </SafeAreaView>
    )
}

function newPassword({ navigation }) {
    const [password, setPass] = useState('');
    const [passConf, setConfirm] = useState('');

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
            <Button
                title='Submit'
                onPress={() => {
                    if (password !== passConf) {
                        // Set rejection text
                    }
                    // Continue with password reset
                }}
            />
        </SafeAreaView>
    )
}
