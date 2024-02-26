import { useState } from 'react';
import { Text, SafeAreaView } from 'react-native';

export function PasswordReset({navigator}) {
    const [email, setEmail] = useState('');

    return (
        <SafeAreaView>
            <Text>New page  </Text>
        </SafeAreaView>
    )
}
