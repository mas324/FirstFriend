// Template https://www.youtube.com/watch?v=xcn-0LyX6JY
import { StatusBar } from "expo-status-bar"
import  { StyleSheet, text, View } from 'react-native'
//import MapView from 'react-native-maps'
//import Map from './components/Map'

// may need:
// npx expo install react-native-maps
// npx expo install expo-sharing
// yarn add  react-native-maps react-native-maps-directions expo-location
// <Text> Open up MapApp.js to start working on your app!</Text>
// CSUDH lat:33.8628277951813, lng:-118.25446981277511

let locationsOfInterest = [
    {
        title: "In-N-Out Burger",
        location: {
            latitude: 33.8490,
            longitude: -118.3531
        },
        description: "First Marker"
    },
    {
        title: "Starbucks",
        location: {
            latitude: 33.9023,
            longitude: -118.3001
        },
        description: "Second Marker"
    },
    //{
    //    title: "Raising Cane's Chicken Fingers",
    //    location: {
    //        latitude: 33.8874,
    //        longitude: -118.3148
    //    },
    //    description: "Third Marker"
    //},
    //{
    //    title: "King's Hawaiian Bakery and Restaurant",
    //    location: {
    //        latitude: 33.8227,
    //        longitude: -118.3348
    //    },
    //    description: "Fourth Marker"
    //},
]

export default function App() {
    const [count, setCount] = useState(0);
    const [draggableMarkerCoord, setDraggableMarkerCoord] = useState ({
        Longitude: -118.254,
        latitude: 33.862
    })

    const onRegionChange = (region) => {
        console.log(region);
    };

    const showLocationOfInterest = () => {
        return locationsOfInterest.map((item, index) => {
            return (
                <Marker
                    key={index}
                    coordinate={item.location}
                    title={item.title}
                    description={item.description}
                />
            )
        });
    };

    return (
        <View style={styles.container}>
            <MapView 
              style={styles.map}
              onRegionChange={onRegionChange}
              initialRegion={{
                latitude: 33.862411752, 
                longitude: -118.254411170
              }}
            >
                {showLocationsOfInterest()}
                <Marker 
                  draggable
                  pinColor= '#0000ff'
                  coordinate= {draggableMarkerCoord}
                  onDragEnd={(e) => setDraggableMarkerCoord(e.nativeEvent.coordinate)}
                />
                <Marker
                  pinColor='#00ff00'
                  coordinate={{latitude: -35, longitude: 147}}
                >
                  <Callout>
                    <Text>Count: {count}</Text>
                    <Button title='Increment Count' onPress={() => setCount(count + 1) } />

                  </Callout>
                </Marker>
            </MapView>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '100%'
    }
});