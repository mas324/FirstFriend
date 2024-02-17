import * as React from 'react';
import { View, Text } from 'react-native';


export function HelloPage({navigator}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Hello there</Text>
        </View>
    )
}