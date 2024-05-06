import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, BackHandler, Button, Image, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '../components/TextFix';
import AppContext from '../utils/AppContext';
import { useAuth } from '../utils/Auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WeatherPage, { weatherStyles } from './WeatherPageAdapt';
import VeniceBeachCoffeeFinder from './travelNav/MapApp';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getItem, setItem } from '../utils/LocalStore';
import weatherCall from '../utils/WeatherApi/meteoAPI';
import { weatherImages } from '../utils/WeatherApi';
import { degrees } from '../utils/Helper';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { getJob } from '../utils/Firestore';
import { set } from 'lodash';


const Stack = createNativeStackNavigator();

function HomePage({ navigation }) {
  const { setUser, weather, setWeather, jobs, setJobs } = useContext(AppContext);
  const [showLogout, setShowLogout] = useState(false);
  const route = useRoute();

  useEffect(() => {
    getItem('@weather').then((weatherData) => {
      console.log('Home: checking weather');
      if (weatherData == null) {
        weatherCall().then(newData => {
          console.log('Home: refreshing data');
          setItem('@weather', newData);
          setWeather(newData);
        });
      } else {
        if ((Date.now() - weatherData.current.time) > (1000 * 60 * 30)) {
          weatherCall().then(reWeather => {
            console.log('Home: weather old refreshing');
            setItem('@weather', reWeather);
            setWeather(reWeather);
          });
        } else {
          console.log('Home: weather load okay');
          setWeather(weatherData);
        }
      }
    })
    getJob().then((jobData) => {
      console.log('Home: checking job');
      if (jobData == null) {
        return
      } else {
        console.log('Home: job load okay');
        setJobs(jobData);
      }
    })
  }, []);

  useFocusEffect(React.useCallback(() => {
    const backAction = () => {
      setShowLogout(true);
      return true;
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [route]));

  const handleButtonPress = (buttonNumber) => {
    // define actions for each button press here

    switch (buttonNumber) {
      case 1:
        //console.log('Home: data to weather', weather);
        navigation.navigate('Weather');
        break;
      case 2:
        navigation.navigate('Jobs');
        break;
      case 3:
        navigation.navigate('Travels');
        break;
      case 4:
        navigation.navigate('Messages');
        break;
      case 5:
        useAuth().logout();
        setUser(null);
        break;
      default:
        console.log('Button', buttonNumber, 'pressed');
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal visible={showLogout} transparent={true} animationType='fade'>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.5)' }}>
          <View style={{ backgroundColor: '#eee', borderWidth: 1, padding: 30, borderRadius: 5 }}>
            <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Logout?</Text>
            <View style={{ flexDirection: 'row', alignContent: 'space-between', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
              <TouchableOpacity style={{ flex: 1, borderWidth: 2, borderColor: 'black', backgroundColor: '#f0f0f0' }} onPress={() => handleButtonPress(5)}>
                <Text style={{ fontSize: 20, alignSelf: 'center' }}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flex: 1, borderWidth: 2, borderColor: 'black', backgroundColor: '#09d0ff80' }} onPress={() => setShowLogout(false)}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={[styles.button, { backgroundColor: 'rgba(90, 210, 255, 0.9)' }]} onPress={() => handleButtonPress(1)}>
        {
          weather !== null ? <CurrentCard current={weather.current} /> : <ActivityIndicator size={50} color='gray' />
        }
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, {backgroundColor: 'rgba(255, 253, 208, 0.5)' }]} onPress={() => handleButtonPress(2)}>
      {
          jobs !== null ? <JobCard firstListing={jobs[0]} /> : <ActivityIndicator size={50} color='gray' />
      }
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleButtonPress(3)}>
        <Text>Travel</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleButtonPress(4)}>
        <Text>Messages</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

function CurrentCard({ current }) {
  console.log("Weather: current", current);
  const cardStyle = StyleSheet.create({
    text: {
      color: 'black',
      alignSelf: 'center',
      fontSize: 24,
      fontWeight: 'bold'
    }
  });

  if (current != null) {
    const picture = current.clouds <= 25 ? weatherImages.Sunny :
      current.clouds <= 50 ? weatherImages["Partly cloudy"] :
        weatherImages.Cloudy;
    return (
      <View style={{ flexDirection: 'column', alignContent: 'space-between', alignItems: 'center' }}>
        <Image
          source={picture}
          style={{ flex: 3, objectFit: 'contain' }}
        />
        <View style={{ flex: 7, justifyContent: 'space-around' }}>
          <Text style={cardStyle.text}>
            {current.temperature}°F
          </Text>
          <Text style={cardStyle.text}>
            Rain: {current.precipitation}%
          </Text>
          <Text style={cardStyle.text}>
            {current.windSpeed}mph {degrees(current.windFrom)}
          </Text>
        </View>
      </View>
    )
  } else {
    return (null);
  }
}

function JobCard({firstListing}){

  return (
    <View>
      <Text style={{fontSize:30, alignSelf:'center', marginBottom: 10}}>Jobs</Text>
      <Text style={{fontSize:18, fontWeight: 'bold', alignSelf:'center', marginHorizontal: 10, marginBottom: 5, textAlign:'center'}}>{firstListing.position}</Text>
      <Text style={{fontSize:12, marginHorizontal: 10, marginTop: 10}}>({firstListing.recruiter})</Text>
      <Text style={{fontSize:11, marginHorizontal: 10, marginTop: 5}} numberOfLines={10}>Description:{firstListing.description}</Text>
    </View>
  )
}

const Home = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='HomePage' component={HomePage} />
      <Stack.Screen name='Travels' component={VeniceBeachCoffeeFinder} />
    </Stack.Navigator>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop: 4
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    borderWidth: 1,
    borderColor: 'black',
    width: '50%',
    height: '50%'
  }
});

export default Home;
