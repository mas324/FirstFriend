import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, BackHandler, Image, Modal, StyleSheet, TouchableOpacity, View, ImageBackground } from 'react-native';
import { Text } from '../../components/TextFix';
import AppContext from '../../utils/AppContext';
import { useAuth } from '../../utils/Auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WeatherPage from './WeatherPageAdapt';
import VeniceBeachCoffeeFinder from '../travelNav/MapApp';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getItem, setItem } from '../../utils/LocalStore';
import weatherCall from '../../utils/WeatherApi/meteoAPI';
import { weatherImages } from '../../utils/WeatherApi';
import { degrees } from '../../utils/Helper';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { getJob, getMessage } from '../../utils/Firestore';
import Profile from './Profile';


const Stack = createNativeStackNavigator();

const image = require('../../assets/images/pathway.jpeg');

function HomePage({ navigation }) {
  const { setUser, weather, setWeather, jobs, setJobs, setMessage, user } = useContext(AppContext);
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
    });

    getJob().then((jobData) => {
      console.log('Home: checking job');
      if (jobData == null) {
        return
      } else {
        console.log('Home: job load okay');
        setJobs(jobData);
      }
    });

    getMessage(user.id).then((contactArray) => {
      console.log('Messages: contact get');
      if (contactArray !== undefined && contactArray !== null) {
        setMessage(contactArray);
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
        navigation.navigate('Travels');
        break;
      case 3:
        navigation.navigate('Profile');
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
    <ImageBackground
      source={image}
      blurRadius={2}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView style={[styles.container, { backgroundColor: 'rgba(255,255,255,.05)' }]}>
        <Modal visible={showLogout} transparent={true} animationType='fade'>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.5)' }}>
            <View style={{ backgroundColor: '#eee', borderWidth: 2, paddingVertical: 15, paddingHorizontal: 30, borderRadius: 10, maxHeight: '20%' }}>
              <Text style={{ flex: 3, fontSize: 32, fontWeight: 'bold' }}>Logout?</Text>
              <View style={{ flex: 2, flexDirection: 'row', alignContent: 'space-between', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={{ flex: 1, borderWidth: 1, borderColor: 'black', backgroundColor: '#f0f0f0' }} onPress={() => handleButtonPress(5)}>
                  <Text style={{ fontSize: 20, alignSelf: 'center' }}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, borderWidth: 1, borderColor: 'black', backgroundColor: '#09d0ffff' }} onPress={() => setShowLogout(false)}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <TouchableOpacity style={[styles.button, { backgroundColor: 'rgba(90, 210, 255, .7)' }]} onPress={() => handleButtonPress(1)}>
          {
            weather !== null ? <CurrentCard current={weather.current} /> : <ActivityIndicator size={50} color='gray' />
          }
        </TouchableOpacity>
        <TouchableOpacity style={[styles.travelButton, { height: 50, width: 110, borderRadius: 28, marginHorizontal: '37%', marginTop: '10%' }]} onPress={() => handleButtonPress(2)}>
          <Text style={{ fontSize: 16, color: 'white' }}>Travel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.travelButton, { height: 50, width: 110, borderRadius: 28, marginHorizontal: '37%', marginTop: '10%' }]} onPress={() => handleButtonPress(3)}>
          <Text style={{ fontSize: 16, color: 'white' }}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.travelButton, { height: 50, width: 110, borderRadius: 28, marginHorizontal: '37%', marginTop: '10%' }]} onPress={() => setShowLogout(true)}>
          <Text style={{ fontSize: 16, color: 'white' }}>Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}

function CurrentCard({ current }) {
  //console.log("Weather: current", current);
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

// function JobCard({ firstListing }) {

//   return (
//     <View>
//       <Text style={{ fontSize: 30, alignSelf: 'center', marginBottom: 10 }}>Jobs</Text>
//       <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'center', marginHorizontal: 10, marginBottom: 5, textAlign: 'center' }}>{firstListing.position}</Text>
//       <Text style={{ fontSize: 12, marginHorizontal: 10, marginTop: 10 }}>({firstListing.recruiter})</Text>
//       <Text style={{ fontSize: 11, marginHorizontal: 10, marginTop: 5 }} numberOfLines={10}>Description:{firstListing.description}</Text>
//     </View>
//   )
// }

const Home = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='HomePage' component={HomePage} />
      <Stack.Screen name='Weather' component={WeatherPage} />
      <Stack.Screen name='Travels' component={VeniceBeachCoffeeFinder} />
      <Stack.Screen name='Profile' component={Profile} />
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
    // borderWidth: 1,
    borderColor: 'black',
    width: '70%',
    height: '50%',
    marginLeft: '16%',
    borderRadius: 20,
  },
  travelButton: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(254,234,279,1)',
    backgroundColor: '#C73A52',
    fontSize: 20,
  }
});

export default Home;
