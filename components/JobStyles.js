import { StyleSheet } from "react-native";

export const jobStyles = StyleSheet.create({

    searchBox: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        BorderColor: "#ccc",
        boderWidth: 1,
        borderRadius: 8,
    },

    pageBG: {
        alignSelf: 'stretch',
        textAlign: 'left',
        paddingLeft: 30,
        paddingRight: 30,
        padding: 20,
        justifyContent: 'top',
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
        justifyContent: 'center',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 20,
    },

    title: {
        fontSize: 32
    },

    input: {
        height: 40,
        margin: 10,
        borderWidth: 1,
        padding: 10,
    }
});