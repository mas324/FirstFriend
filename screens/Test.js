import * as React from 'react';
import { Button, SafeAreaView } from 'react-native';
//import { Text } from 'react-native';
import { Text } from '../components/TextFix';

export function Test({ navigation }) {
    return (
        <SafeAreaView
            style={{padding: 20, flex: 1}}
        >
            <Text>DEVELOPER PAGE</Text>
            <Button 
                title='Login'
                onPress={() => navigation.navigate('Login')}
            />
            <Button
                title='Password Reset'
                onPress={() => navigation.navigate('PassRes')}
            />
            <Button
                title='Signup'
                onPress={() => navigation.navigate('Signup')}
            />
            <Button
                title='Home'
                onPress={() => navigation.navigate('Home')}
            />
            <Button
                title='Jobs'
                onPress={() => navigation.navigate('Jobs')}
            />
            <Button
                title='Messages'
                onPress={() => navigation.navigate('Messages')}
            />
        </SafeAreaView>
    )
}
