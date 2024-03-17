import React, { useState } from 'react';
import { TextInput, SafeAreaView, StyleSheet, Button, Pressable, View } from 'react-native';
import { Text } from '../components/TextFix';

export function LoginPage({ navigation }) {

    const [username, setName] = useState('');
    const [password, setPass] = useState('');
    const [rejectNotif, setRejection] = useState('');
    let validate = true;

    return (
        <SafeAreaView style={{ padding: 10, flex: 1, alignContent: 'center' }}>
            <Text
                style={{ color: 'red', alignSelf: 'center', }}
                textBreakStrategy='simple'
            >
                {rejectNotif}
            </Text>
            <TextInput
                style={styles.input}
                autoComplete='username'
                placeholder='Username'
                onChangeText={newName => setName(newName)}
                defaultValue={username}
            />
            <TextInput
                style={styles.input}
                autoComplete='current-password'
                secureTextEntry={true}
                placeholder='Password'
                onChangeText={newPass => setPass(newPass)}
                defaultValue={password}
            />
            <Button
                onPress={() => {
                    // TODO: Add validation with a database for user logins
                    // Use validate as return variable

                    //validate = database.password() == password

                    if (validate) {
                        navigator.navigate('Home');
                    } else {
                        // Notify the user of a failed login
                        setRejection('Login information is incorrect');
                    }
                }}
                title='Login'
            />
            <View
                style={{
                    flexDirection: 'row',
                    padding: 20,
                    justifyContent: 'space-evenly'
                }}
            >
                <Pressable onPress={() => { navigation.navigate('Signup') }}>
                    <Text>Signup</Text>
                </Pressable>
                <Pressable onPress={() => { navigation.navigate('PassRes') }}>
                    <Text>Forgot password</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 10,
        borderWidth: 1,
        padding: 10,
    },
});
