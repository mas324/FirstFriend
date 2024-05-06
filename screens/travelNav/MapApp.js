// https://www.youtube.com/watch?v=c_X-rBBiidQ
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { MarkerAnimated, PROVIDER_DEFAULT } from 'react-native-maps';
import * as Location from 'expo-location';
import { AnimatedMapView } from 'react-native-maps/lib/MapView';

const VeniceBeachCoffeeFinder = () => {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords);
        })();
    }, []);

    const schoolPOI = [
        {
            name: 'Student Health Center',
            coords: {
                latitude: 33.86580147361135,
                longitude: -118.25666703266454,
            }
        },
        {
            name: 'Parking Lot',
            coords: {
                latitude: 33.86581952457541,
                longitude: -118.25156198442869,
            }
        },
        {
            name: 'Library Addition',
            coords: {
                latitude: 33.86328817219626,
                longitude: -118.25609920567202,
            }
        },
        {
            name: 'Book Store',
            coords: {
                latitude: 33.86483049311999,
                longitude: -118.25591618324796,
            }
        },
        {
            name: 'Small College Complex',
            coords: {
                latitude: 33.865890700227474,
                longitude: -118.25478770669034,
            }
        }
    ]

    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
                {location && (
                    <AnimatedMapView
                        style={styles.map}
                        initialRegion={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        showsUserLocation={true}
                        provider={PROVIDER_DEFAULT}
                    >
                        {schoolPOI.map((value, index) => {
                            return (
                                <MarkerAnimated
                                    coordinate={value.coords}
                                    title={value.name}
                                    key={index}
                                />
                            )
                        })}
                    </AnimatedMapView>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heroBanner: {
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heroBannerImage: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    heroBannerTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    mapContainer: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    coffeeShopList: {
        padding: 20,
    },
    coffeeShopListTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    tableContainer: {
        flexDirection: 'column',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    shopName: {
        fontWeight: 'bold',
    },
});

export default VeniceBeachCoffeeFinder;