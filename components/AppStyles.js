import { StyleSheet } from "react-native";

export const appStyles = StyleSheet.create({
  reject: {
    color: 'red',
    alignSelf: "center"
  },
  input: {
    height: 40,
    margin: 8,
    borderWidth: 2,
    padding: 10,
    borderColor: 'black'
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
    backgroundColor: '#860038',
    alignSelf: 'center',
    marginHorizontal: '1%',
    marginBottom: 6,
    minWidth: '48%',
    textAlign: 'center',
  },
  button2: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#860038',
    alignSelf: 'top',
    marginHorizontal: '1%',
    marginBottom: 2,
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
  headingText: {
    fontSize: 24,
    color: '#e6bb23',
    fontWeight: '500',
    textAlign: 'center',
  },
});
