import { StyleSheet } from "react-native";

export const jobStyles = StyleSheet.create({

    assembler:{
        flexdirection:'row'
    },

    Main:{
        backgroundColor:'#FFF',
        width:250,
        height:60,
        borderWidth:1,
        borderColor:'black',
        borderTopLeftRadius:30,
        borderBottomLeftRadius:30,
    },

    Input:{
        marginLeft:10,
        marginTop:5,
    },

    buttonP:{
        backgroundColor:'#FFF',
        width:40,
        height:60,
        borderWidth:1,
        borderColor:'black',
        borderBottomRightRadius:30,
        borderTopRightRadius:30,
        alignItems: 'center',
        justifyContent:'center',
    },

    pageBG: {
        alignSelf: 'stretch',
        flex:1,
    },


    jobTitle: {
        fontWeight: 'bold',
        fontSize: 30,
        paddingBottom: 10,
    },

    jobSection:{
        paddingTop: 10,
        fontSize: 15,
        fontWeight: 'bold',
    },

    item: {
        backgroundColor: '#E6EBEB',
        height: 150,
        justifyContent: 'center',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 20
    },

    container: {
        flex:1,
    },

    item: {
        backgroundColor: '#f9c2ff',
        height: 150,
        // justifyContent: 'center',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 20,
    },

    title: {
        fontSize: 32
    },

    


});