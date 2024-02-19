import React, { useState } from 'react';
import { Text, TextInput, SafeAreaView, StyleSheet, Button } from 'react-native';

export function LoginPage({navigator}) {

    const [username, setName] = useState('');
    const [password, setPass] = useState('');
    const [rejectNotif, setRejection] = useState('');
    let validate = false;
    
    return (
        <SafeAreaView style={{padding: 10, alignContent: 'center'}}>
            <Text style={{color: 'red', alignSelf: 'center', }} textBreakStrategy='simple'>
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
                    //TODO: Add validation with a database for user logins
                    // Use validate as return variable
                    
                    //validate = database.password() == password

                    if (validate) {
                        //navigator.navigate('Home');
                    } else {
                        // Notify the user of a failed login
                        setRejection('Login information is incorrect  ');
                    }                    
                }}
                title='Submit'
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});