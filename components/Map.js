// https://classic.yarnpkg.com/en/ and https://www.npmjs.com/package/react-native-maps
// React Native Maps - iOS And Android Setup: https://www.youtube.com/watch?v=jvIQQ4ID2JY
// (Used)The Ultimate Guide to Google Map Integration in React Native: https://www.youtube.com/watch?v=RvEU-5peOrM
// Repo of the map Guide https://github.com/kimbi619/simpleMap
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import MapView from 'react-native-maps'
import * as Location from 'expo-location'
// original from the tutorial -> lat: 37.78825, lng: -122.4324
export default function Map() {
    const initialLocation = {
        latitude: 33.86282,
        longitude: -118.25446,
    }

    const [myLocation, setMyLocation] = useState(initialLocation)
    const [pin, setPin] = useState({})
    const [region, setRegion] = useState(null)
    const mapRef = React.useRef()

    const local = {
        latitude: "33.86282",
        longitude: "-118.25446",
    }

    useEffect(() => {
        setPin(local)
        _getLocation()
    }, [])

    const _getLocation =async() => {
        try{
            let { status } = await Location.requestForegroundPermissionsAsync()

            if(status !== 'granted') {
                console.warn('Permission to access location has not been granted')
                return
            }
            let location = await Location.getCurrentPositionAsync({})
            setMyLocation(location.coords)
        }
        catch(err) {
            console.warn(err);
        }
    }

    const focusOnLocation = () => { 
        if(pin.latitude && pin.longitude) {
            const region = {
                latitude: parseFloat(pin.latitude),
                longitude: parseFloat(pin.longitude),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }
            if(mapRef.current) {
                mapRef.current.animateToRegion(region, 1000)
            }
        }
    }

    return (
        <View style={styles.container}>
            <MapView
              style={styles.map}
              region={region}
              onRegionChangeComplete={setRegion}
              ref={mapRef}
            provider='google'
            >

                {/*{ myLocation.latitude && pin.longitude &&
                  <Marker
                    coordinate ={{
                      latitude:myLocation.latitude,
                      longitude: myLocation.longitude
                    }}
                    title='Current Location'
                    description='I am here'
                  />
                } */}

                { myLocation.latitude && pin.longitude &&
                  <CustomMarker
                    coordinate ={{
                      latitude:myLocation.latitude,
                      longitude: myLocation.longitude
                    }}
                    title='Current Location'
                    // need an image of a place, like CSUDH
                    image={require('./assets/favicon.png')}
                  />
                } 

                { pin.latitude && pin.longitude &&
                  <Marker
                    coordinate = {{
                      latitude: parseFloat(pin.latitude),
                      longitude: parseFloat(pin.longitude)
                    }}
                    title='Default location'
                    description='I am here'
                  />
                }

            </MapView>
            <View style = { styles.buttonContainer}>
                <Button title='Get Location' onPress= { focusOnLocation } />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width:  Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    markerImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    }
})