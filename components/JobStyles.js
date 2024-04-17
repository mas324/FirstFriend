import { StyleSheet } from "react-native";

export const jobStyles = StyleSheet.create({

    assembler: {
        flexdirection: 'row'
    },

    Main: {
        backgroundColor: '#FFF',
        height: 60,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
    },

    Input: {
        marginLeft: 10,
        marginTop: 5,
    },

    buttonP: {
        backgroundColor: '#FFF',
        width: 40,
        height: 60,
        borderWidth: 1,
        borderColor: 'black',
        borderBottomRightRadius: 30,
        borderTopRightRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },

    pageBG: {
        alignSelf: 'stretch',
        flex: 1,
    },


    jobTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        paddingBottom: 4,
    },

    jobSection: {
        paddingTop: 6,
        fontSize: 12,
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
        flex: 1,
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
        fontSize: 20
    },
});
