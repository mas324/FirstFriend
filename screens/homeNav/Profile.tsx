import { View, ImageBackground, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Text } from "../../components/TextFix";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../utils/AppContext";
import { updateProfile } from "../../utils/Firestore";
import { Entypo } from '@expo/vector-icons';
import { setItem } from "../../utils/LocalStore";

const image = require('../../assets/images/profile_bg.png');

function Profile() {
    const { user, setUser } = useContext(AppContext)
    const [newUsername, setNewUsername] = useState('');
    const [newMajor, setNewMajor] = useState('');
    const [editName, setEditName] = useState(false);
    const [editMajor, setEditMajor] = useState(false);

    useEffect(() => {
        setNewUsername(user.username);
        setNewMajor(user.major);
    }, [])


    const updateUserProfile = () => {
        const newUser = user;
        newUser.major = newMajor
        newUser.username = newUsername
        updateProfile(newUser).then(() => {
            Alert.alert('', 'Profile updated successfully', [{ text: 'OK' }]);
            setUser(newUser);
            setItem('@user', newUser);
        })
    }

    return (
        <ImageBackground
            source={image}
            blurRadius={0}
            style={{ flex: 1 }}
            resizeMode="cover">
            <View style={{ flex: 1, marginTop: '40%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.textLeft}>First name: {user.firstname}</Text>
                    <Text style={styles.textRight}>Last name: {user.lastname}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[styles.textLeft]}>User ID: {user.id}</Text>
                    <Text style={[styles.textRight]}>Authorized as {user.type}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.textLeft}>Username: {editName ? '' : newUsername}</Text>
                    {editName ?
                        <TextInput
                            placeholder={newUsername}
                            defaultValue={newUsername}
                            style={styles.textInput}
                            onChangeText={text => setNewUsername(text)}
                            onBlur={() => {
                                setEditName(false);
                                if (newUsername.length === 0) {
                                    setNewUsername(user.username);
                                }
                            }}
                        />
                        :
                        <TouchableOpacity onPress={() => setEditName(true)} style={{ flex: 1, marginLeft: 20 }}>
                            <Entypo name='pencil' size={20} color='white' />
                        </TouchableOpacity>
                    }
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.textLeft}>{user.type === 'staff' ? 'Department:' : 'Major:'} {editMajor ? '' : newMajor}</Text>
                    {editMajor ?
                        <TextInput
                            placeholder={newMajor}
                            defaultValue={newMajor}
                            style={styles.textInput}
                            onChangeText={text => setNewMajor(text)}
                            onBlur={() => {
                                setEditMajor(false);
                                if (newMajor.length === 0) {
                                    setNewMajor(user.major);
                                }
                            }}
                        />
                        :
                        <TouchableOpacity onPress={() => setEditMajor(true)} style={{ flex: 1, marginLeft: 20 }}>
                            <Entypo name='pencil' size={20} color='white' />
                        </TouchableOpacity>
                    }
                </View>
                <TouchableOpacity onPress={() => updateUserProfile()}>
                    <Text style={styles.textButton}>Submit</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>

    )
}

const styles = StyleSheet.create({
    textLeft: {
        color: 'white',
        marginLeft: 25,
        marginBottom: 20,
        fontSize: 14
    },
    textRight: {
        color: 'white',
        marginRight: 25,
        marginBottom: 20,
        fontSize: 14
    },
    textInput: {
        backgroundColor: 'rgba(254,234,279,1)',
        width: '42%',
        marginRight: 25,
        marginBottom: 20,
        fontSize: 14
    },
    textButton: {
        alignSelf: 'center',
        position: 'absolute',
        textAlign: 'center',
        width: 100,
        height: 40,
        backgroundColor: '#C73A52',
        padding: 9,
        borderRadius: 16, // This will make the button rounded
        color: 'white',
        fontSize: 15,
        marginTop: 10
    },
});

export default Profile;