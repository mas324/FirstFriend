import React, { useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { Text } from '../components/TextFix';

const Messages = () => {
  const [flexDirection, setflexDirection] = useState('column');
  const {winWidth} = useWindowDimensions();

  return (
    <PreviewLayout
      label="First Friend"
      values={['Search', '+']}
      selectedValue={flexDirection}
      setSelectedValue={setflexDirection}
    >
      <View style={[styles.box, { backgroundColor: '#f0dc82' }]} />
      <View style={[styles.box, { backgroundColor: '#f3e5ab' }]} />
      <View style={[styles.box, { backgroundColor: '#f0dc82' }]} />
      <View style={[styles.box, { backgroundColor: '#f3e5ab' }]} />
      <View style={[styles.box, { backgroundColor: '#f0dc82' }]} />
      <View style={[styles.box, { backgroundColor: '#f3e5ab' }]} />
      <View style={[styles.box, { backgroundColor: '#f0dc82' }]} />
      <View style={[styles.box, { backgroundColor: '#f3e5ab' }]} />
      <View style={[styles.box, { backgroundColor: '#f0dc82' }]} />
    </PreviewLayout>
  );
};

const PreviewLayout = ({
  label,
  children,
  values,
  selectedValue,
  setSelectedValue,
}) => (
  <View style={{ padding: 10, flex: 1 }}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.row}>
      {values.map((value) => (
        <TouchableOpacity
          key={value}
          onPress={() => setSelectedValue(value)}
          style={[styles.button]}
        >
          <Text style={[styles.buttonLabel]}>{value}</Text>
        </TouchableOpacity>
      ))}
    </View>
    <View style={[styles.container, { [label]: selectedValue }]}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
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

export default Messages;
