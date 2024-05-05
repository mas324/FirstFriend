import React, { useContext, useState } from 'react';
import { TextInput, Pressable, View, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import { appStyles } from '../../components/AppStyles';
import { useAuth } from '../../utils/Auth';
import AppContext from '../../utils/AppContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FireStatusCodes, signIn } from '../../utils/Firestore';
import { Text } from '../../components/TextFix';

const image = require('../../assets/loginBG/Stairs.jpg');

export default function LoginPage({ navigation }) {
    const { setState } = useContext(AppContext);
    const [username, setName] = useState('dev@firstfriend.com');
    const [password, setPass] = useState('123456');
    const [rejectNotif, setRejection] = useState('');
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        if (username === '' || password === '') {
            setRejection('Fill out all forms');
            return;
        }

        setLoading(true);
        signIn(username, password).then(({ status, data, user }) => {
            console.log("login:", data.data());
            switch (status) {
                case FireStatusCodes.NO_USER:
                    setRejection('User does not exist');
                    return;
                case FireStatusCodes.LOGIN_INVALID:
                    setRejection('Invalid login information');
                    return;
                default:
                    if (data != undefined && data != null && data.exists()) {
                        setRejection('');
                        login(data.data(), user);
                        setState(data.data());
                    } else {
                        console.log("No data exists. Reason:", status);
                    }
            }
        }).finally(() => setLoading(false));
    }
    // 
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={image}
                blurRadius={0}
                style={{ flex: 1, resizeMode: 'cover' }}>
                <View style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.6)', justifyContent: 'center' }}>
                    <Pressable
                        style={[appStyles.button2]}
                    >
                        <Text style={appStyles.headingText}>First Friend</Text>
                    </Pressable>
                    <Text style={appStyles.reject}>
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
                        onPress={handleLogin}
                    >
                        {loading ?
                            <ActivityIndicator size='large' color={appStyles.buttonLabel.color} />
                            :
                            <Text style={appStyles.buttonLabel}>Login</Text>
                        }
                    </Pressable>
                    <View
                        style={{
                            flexDirection: 'row',
                            padding: 20,
                            justifyContent: 'space-evenly',
                            color: '#860038'
                        }}
                    >
                        <Pressable onPress={() => { navigation.navigate('Signup') }}>
                            <Text style={{ color: 'black', fontWeight: '800', fontSize: 14 }}>Signup</Text>
                        </Pressable>
                        <Pressable onPress={() => { navigation.navigate('PassRes') }}>
                            <Text style={{ color: 'black', fontWeight: '800', fontSize: 14 }}>Forgot password</Text>
                        </Pressable>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};
