import React, { useState } from 'react';
import { TextInput, SafeAreaView, Pressable, View } from 'react-native';
import { Text } from '../components/TextFix';
import { appStyles } from '../components/AppStyles';

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
                    // TODO: Add validation with a database for user logins
                    // Use validate as return variable

                    //validate = database.password() == password

                    if (validate) {
                        navigation.navigate('Home');
                    } else {
                        // Notify the user of a failed login
                        setRejection('Login information is incorrect');
                    }
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
