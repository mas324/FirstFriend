import * as React from 'react';
import { Pressable, SafeAreaView, View } from 'react-native';
//import { Text } from 'react-native';
import { Text } from '../components/TextFix';
import { appStyles } from '../components/AppStyles';

export function Test({ navigation }) {

    const button = appStyles.button;
    const label = appStyles.buttonLabel;

    return (
        <SafeAreaView
            style={{padding: 10, flex: 1, backgroundColor: 'skyblue'}}
        >
            <Text>DEVELOPER PAGE</Text>
            <View
                style={{padding: 4}}
            >
                <Pressable
                    style={button}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={label}>Login</Text>
                </Pressable>
                <Pressable
                    style={button}
                    onPress={() => navigation.navigate('PassRes')}
                >
                    <Text style={label}>Password Reset</Text>
                </Pressable>
                <Pressable
                    style={button}
                    onPress={() => navigation.navigate('Signup')}
                >
                    <Text style={label}>Signups</Text>
                </Pressable>
                <Pressable
                    style={button}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={label}>Home</Text>
                </Pressable>
                <Pressable
                    style={button}
                    onPress={() => navigation.navigate('Jobs')}
                >
                    <Text style={label}>Jobs</Text>
                </Pressable>
                <Pressable
                    style={button}
                    onPress={() => navigation.navigate('Messages')}
                >
                    <Text style={label}>Messages</Text>
                </Pressable>
                <Pressable
                    style={button}
                    onPress={navigation.navigate('Weather')}
                >
                    <Text style={label}>Weather</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}
