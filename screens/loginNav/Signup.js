import React, { useContext, useState } from 'react';
import { Text, TextInput, Pressable, View, KeyboardAvoidingView, Platform, StyleSheet, ImageBackground} from 'react-native';
import { appStyles } from '../../components/AppStyles';
import { useAuth } from '../../utils/Auth';
import AppContext from '../../utils/AppContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { convertToUserJSON } from '../../utils/LocalStore';
import { FireStatusCodes, signUp } from '../../utils/Firestore';

const image = {uri:'https://news.csudh.edu/wp-content/uploads/2017/04/JSF_8585.jpg'};

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
                    borderColor: '#860038'
                }
            });
            setInputStyle([appStyles.input, newStyle.reject])
            setRejection('Fill All Required Forms!');
            setPlaceColor('#860038');
            return;
        }

        let parseSID;
        try {
            if (SID.includes('.') || SID.includes('-')) {
                throw new Error('No decimals');
            }
            parseSID = Number.parseInt(SID, 10);
        } catch (e) {
            setRejection('Student ID is not a number');
            return;
        }

        if (password !== confPassword) {
            setRejection('Passwords do not match');
            return;
        }

        let userType;
        if (email.endsWith('@toromail.csudh.edu')) {
            userType = 'student';
        } else if (email.endsWith('@csudh.edu')) {
            userType = 'staff';
        } else {
            setRejection('Invalid CSUDH email');
            return;
        }

        const user = convertToUserJSON({
            id: parseSID,
            email: email,
            firstname: firstname,
            lastname: lastname,
            username: username,
            country: Country_of_Origin,
            major: Major,
            type: userType,
        });

        signUp(user, password).then((resp) => {
            if (resp.status === FireStatusCodes.SUCCESS) {
                setRejection('');
                login(user, resp.data);
                setState(user);
            } else {
                setRejection('Error occured. Please check if all fields are correct');
            }
        })
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} style={{ flex: 1 }}>
            <SafeAreaView style={{flex: 1 }}>
            <ImageBackground
                source={image} 
                style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center', opacity: 0.8}}>
                    <Text style={[appStyles.reject, { paddingTop: 0 }]}>
                    {rejection}
                </Text>
                <Pressable>
                <Text style={{fontSize: 24,
                    color: '#860038',
                    fontWeight: '900',
                    textAlign: 'center',
                    top: 4
                    }}>Welcome to First Friend!</Text>
            </Pressable>
                
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <TextInput
                        style={[inputStyle, { flex: 1}]}
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
                <Pressable style={appStyles.button} onPress={() => handleSignUp()}>
                    <Text style={appStyles.buttonLabel}>Sign up</Text>
                </Pressable>
                </ImageBackground>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default SignUpPage;
