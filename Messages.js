import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const FlexDirectionBasics = () => {
  const [flexDirection, setflexDirection] = useState('column');

  return (
    <PreviewLayout
      label="First Friend"
      values={['Search', '+']}
      selectedValue={flexDirection}
      setSelectedValue={setflexDirection}
    >
      <View style={[styles.box, { backgroundColor: 'bisque' }]} />
      <View style={[styles.box, { backgroundColor: 'burlywood' }]} />
      <View style={[styles.box, { backgroundColor: 'bisque' }]} />
      <View style={[styles.box, { backgroundColor: 'burlywood' }]} />
      <View style={[styles.box, { backgroundColor: 'bisque' }]} />
      <View style={[styles.box, { backgroundColor: 'burlywood' }]} />
      <View style={[styles.box, { backgroundColor: 'bisque' }]} />
      <View style={[styles.box, { backgroundColor: 'burlywood' }]} />
      <View style={[styles.box, { backgroundColor: 'bisque' }]} />
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
    width: 372,
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
    color: 'goldenrod',
    textAlign: 'center',
  },
  label: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 20,
  },
});

export default FlexDirectionBasics;