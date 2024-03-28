import React, { useState } from 'react';
import { TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { Text } from '../components/TextFix';
import { appStyles } from '../components/AppStyles';

const styles = appStyles;

const Messages = () => {
  const [flexDirection, setflexDirection] = useState('column');
  const { winWidth } = useWindowDimensions();

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

export default Messages;
