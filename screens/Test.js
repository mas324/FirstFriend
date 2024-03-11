import * as React from 'react';
import { Button, SafeAreaView, Text } from 'react-native';

export function Test({ navigation }) {
    return (
        <SafeAreaView
            style={{padding: 20, flex: 1}}
        >
            <Text>Hello there  </Text>
            <Button 
                title='Button to login'
                onPress={() => navigation.navigate('Login')}
            />
            <Button
                title='Button to forgot password'
                onPress={() => navigation.navigate('PassRes')}
            />
        </SafeAreaView>
    )
}
