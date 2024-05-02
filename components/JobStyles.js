import { StyleSheet } from "react-native";

export const jobStyles = StyleSheet.create({

    Main: {
        margin: 3,
        backgroundColor: '#FFF',
        height: 60,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
    },

    input: {
        height: 40,
        margin: 10,
        // borderWidth: 1,
        padding: 10,
        fontSize: 20,
      },

    button: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 8,
        // backgroundColor: 'maroon',
        // backgroundColor: '#C75A6D',
        alignSelf: 'center',
        marginHorizontal: '1%',
        marginBottom: 6,
        minWidth: '48%',
        textAlign: 'center',
        color: 'black',
      },

    buttonLabel: {
        fontSize: 20,
        fontWeight: '500',
        color: 'black',
        textAlign: 'center',
      },

    company: {
        fontSize: 20,
        paddingBottom: 4,
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
    fab: {
        // position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        backgroundColor: '#800020',
        borderRadius: 30,
        elevation: 8,
      },
});
