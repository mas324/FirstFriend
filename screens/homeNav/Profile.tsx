import { View, ImageBackground, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "../../components/TextFix";
import { useContext } from "react";
import AppContext from "../../utils/AppContext";

const image = require('../../assets/images/profile_bg.png');

function Profile(){
    const {user, setUser}=useContext(AppContext)
    const newUser = user;
    newUser.major = ""
    newUser.username = ""
    setUser (newUser)
    return(
        <ImageBackground
                source={image}
                blurRadius={0}
                style={{ flex: 1}}
                resizeMode="cover">
                    <View style={{ flex: 1, justifyContent: 'center'}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={styles.textLeft}>First name: {user.firstname}</Text>
                            <Text style={styles.textRight}>Last name: {user.lastname}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={[styles.textLeft,{flex: 1}]}>User ID: {user.id}</Text>
                            <View style={{flex: 1}}>
                                <Text style={[styles.textLeft]}>{user.type}</Text>
                            </View>
                        </View>
                        
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={styles.textLeft}>Username: </Text>
                            <TextInput placeholder={user.username} 
                                        style={styles.textInput} />
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={styles.textLeft}>Major: </Text>
                            <TextInput placeholder={user.major} 
                                        style={styles.textInput}/>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                
                            }}
                        >
                            <Text style={styles.textButton}>Submit</Text>
                        </TouchableOpacity>
                    </View>
        </ImageBackground>
        
    )
}

const styles = StyleSheet.create({
    textLeft:{
        color:'white',
        marginLeft: 25,
        marginBottom: 20,
        fontSize: 14
    },
    textRight:{
        color:'white',
        marginRight: 25,
        marginBottom: 20,
        fontSize: 14
    },
    textInput:{
        // backgroundColor: 'rgba(255,255,255,.6)',
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