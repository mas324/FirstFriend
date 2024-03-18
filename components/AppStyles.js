import { StyleSheet } from "react-native";

export const appStyles = StyleSheet.create({
    input: {
        height: 40,
        margin: 10,
        borderWidth: 1,
        padding: 10,
    },
    container: {
        flex: 1,
        marginTop: 8,
        backgroundColor: 'white',
      },
      box: {
        height: 75,
        borderRadius: 7,
        marginBottom: 6,
      },
      row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      button: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: 'maroon',
        alignSelf: 'center',
        marginHorizontal: '1%',
        marginBottom: 6,
        minWidth: '48%',
        textAlign: 'center',
      },
      buttonLabel: {
        fontSize: 20,
        fontWeight: '500',
        color: '#fcc200',
        textAlign: 'center',
      },
      label: {
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 20,
      },
});
