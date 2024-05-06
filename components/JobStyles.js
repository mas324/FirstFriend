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
    marginHorizontal: 5,
    marginTop: 10
  },

  jobSection: {
    paddingTop: 6,
    fontSize: 12,
    marginHorizontal: 5,
    marginBottom: 5,
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 70,
    backgroundColor: '#800020',
    backgroundColor: '#C73A52',
    borderRadius: 28,
    elevation: 8,
  },

  plusr: {
    color: "#fffdd0",
    color: "#860038",
    color: 'white',
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

  jobAppInput: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white'
  },

  inputDescription: {
    textAlignVertical: 'top',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 450,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white'
  },
});
