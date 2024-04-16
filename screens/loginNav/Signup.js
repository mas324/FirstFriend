import React, { useContext, useState } from 'react';
import { TextInput, Pressable, View, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { appStyles } from '../../components/AppStyles';
import { Text } from '../../components/TextFix';
import { userCreate } from '../../utils/Database';
import { getHash, useAuth } from '../../utils/Auth';
import AppContext from '../../utils/AppContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUpPage = ({ navigation }) => {
    const [firstname, setUserFirstName] = useState('');
    const [lastname, setUserLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [Country_of_Origin, setUserCoO] = useState('');
    const [SID, setSID] = useState('');
    const [Major, setUserMajor] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    const [rejection, setRejection] = useState('');
    const [inputStyle, setInputStyle] = useState([appStyles.input]);
    const [placeColor, setPlaceColor] = useState(null)

    const { login } = useAuth()
    const { setState } = useContext(AppContext);

    const handleSignUp = () => {
        if (firstname == '' || lastname == '' || username == '' || SID == '' || password == '' || confPassword == '') {
            const newStyle = StyleSheet.create({
                reject: {
                    borderColor: 'red'
                }
            });
            setInputStyle([appStyles.input, newStyle.reject])
            setRejection('Fill all required forms');
            setPlaceColor('red');
            return;
        }

        if (password !== confPassword) {
            setRejection('Passwords do not match');
            return;
        }

        let hashedPass = '';
        getHash(password).then(hash => hashedPass = hash
        ).catch(err => setRejection('Unknown error:', err));

        userCreate({
            id: SID,
            email: email,
            firstName: firstname,
            lastName: lastname,
            userName: username,
            password: hashedPass,
            country: Country_of_Origin,
            study: Major
        }).then((resp) => {
            if (resp.status === 201) {
                login(username);
                setState(username);
            } else {
                setRejection('Error occured. Please check if all fields are correct');
            }
        }).catch(err => {
            console.error(err)
            setRejection(err);
        })
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} style={{ flex: 1 }}>
            <SafeAreaView style={{ justifyContent: 'space-around' }}>
                <Text style={[appStyles.reject, { paddingTop: 0 }]}>
                    {rejection}
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <TextInput
                        style={[inputStyle, { flex: 1 }]}
                        placeholder="First Name"
                        placeholderTextColor={placeColor}
                        value={firstname}
                        onChangeText={text => setUserFirstName(text)}
                        enterKeyHint='next'
                        onSubmitEditing={() => { this.ln.focus() }}
                        blurOnSubmit={false}
                    />
                    <TextInput
                        style={[inputStyle, { flex: 1 }]}
                        placeholder="Last Name"
                        placeholderTextColor={placeColor}
                        value={lastname}
                        onChangeText={text => setUserLastName(text)}
                        enterKeyHint='next'
                        ref={(input) => { this.ln = input }}
                        onSubmitEditing={() => { this.un.focus() }}
                        blurOnSubmit={false}
                    />
                </View>
                <TextInput
                    style={inputStyle}
                    placeholder="Username"
                    placeholderTextColor={placeColor}
                    autoComplete='username-new'
                    value={username}
                    onChangeText={text => setUsername(text)}
                    enterKeyHint='next'
                    ref={(input) => { this.un = input; }}
                    onSubmitEditing={() => { this.em.focus() }}
                    blurOnSubmit={false}
                />
                <TextInput
                    style={inputStyle}
                    placeholder='Email'
                    placeholderTextColor={placeColor}
                    value={email}
                    onChangeText={text => setEmail(text)}
                    enterKeyHint='next'
                    inputMode='email'
                    ref={(input) => { this.em = input }}
                    onSubmitEditing={() => { this.con.focus() }}
                    blurOnSubmit={false}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <TextInput
                        style={[appStyles.input, { flex: 1 }]}
                        placeholder="Country of Origin"
                        value={Country_of_Origin}
                        onChangeText={text => setUserCoO(text)}
                        enterKeyHint='next'
                        ref={(input) => { this.con = input }}
                        onSubmitEditing={() => { this.sid.focus() }}
                        blurOnSubmit={false}
                    />
                    <TextInput
                        style={[inputStyle, { flex: 1 }]}
                        placeholder="Student ID"
                        placeholderTextColor={placeColor}
                        value={SID}
                        onChangeText={text => setSID(text)}
                        enterKeyHint='next'
                        inputMode='numeric'
                        ref={(input) => { this.sid = input }}
                        onSubmitEditing={() => { this.mj.focus() }}
                        blurOnSubmit={false}
                    />
                </View>
                <TextInput
                    style={appStyles.input}
                    placeholder="Major"
                    enterKeyHint='next'
                    value={Major}
                    onChangeText={text => setUserMajor(text)}
                    ref={(input) => { this.mj = input }}
                    onSubmitEditing={() => { this.pass.focus() }}
                    blurOnSubmit={false}
                />
                <TextInput
                    style={inputStyle}
                    placeholder="Password"
                    placeholderTextColor={placeColor}
                    enterKeyHint='next'
                    autoComplete='new-password'
                    secureTextEntry={true}
                    value={password}
                    onChangeText={text => setPassword(text)}
                    ref={(input) => { this.pass = input }}
                    onSubmitEditing={() => { this.newp.focus() }}
                    blurOnSubmit={false}
                />
                <TextInput
                    style={inputStyle}
                    placeholder='Confirm Password'
                    placeholderTextColor={placeColor}
                    autoComplete='new-password'
                    secureTextEntry={true}
                    value={confPassword}
                    onChangeText={text => setConfPassword(text)}
                    ref={(input) => { this.newp = input }}
                    blurOnSubmit={true}
                />
                <Pressable style={appStyles.button} onPress={handleSignUp}>
                    <Text style={appStyles.buttonLabel}>Sign up</Text>
                </Pressable>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default SignUpPage;