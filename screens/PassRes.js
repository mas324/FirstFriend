import { useState } from 'react';
import { SafeAreaView, TextInput, Button } from 'react-native';
import { Text } from '../components/TextFix';
import { styles } from './Login';

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
                style={styles.input}
                autoComplete='email'
                placeholder='Email'
                onChangeText={newmail => setEmail(newmail)}
                defaultValue={email}
            />
            <Button
                title='Submit'
                onPress={() => {
                    // TODO: Connection to database to verify email
                    // Return some random text to use as reset password
                    // Should also email user, not sure how to

                    // sendEmail(email)

                    newPassword(navigation);

                    var validate = false;
                    // validate = database.resetpassword() == password
                    if (validate) {
                        // Send ability to change password
                    } else {
                        // Set rejection notice for failed reset attempt
                    }
                }}
            />
        </SafeAreaView>
    )
}

function newPassword({ navigation }) {
    const [password, setPass] = useState('');
    const [passConf, setConfirm] = useState('');

    <SafeAreaView>
        <Text>Test input for the next step in reset password</Text>
        <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder='New Password'
            onChangeText={newPass => setPass(newPass)}
            defaultValue={password}
        />
        <TextInput
            style={styles.input}
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
}
