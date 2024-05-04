import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "../components/TextFix";
import { appStyles } from "../components/AppStyles";
import { getItem, setItem } from "../utils/LocalStore";
import weatherCall from "../utils/WeatherApi/meteoAPI";
import { weatherImages } from "../utils/WeatherApi";

function CurrentCard({ current }) {
    //console.log("Weather: current", current);
    const picture = current.clouds <= 25 ? weatherImages.Sunny :
        current.clouds <= 50 ? weatherImages["Partly cloudy"] :
            weatherImages.Cloudy;

    if (current != null) {
        return (
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <Image
                    source={picture}
                    style={weatherStyles.image}
                />
                <View style={{ marginLeft: 10 }}>
                    <Text style={weatherStyles.text}>
                        Current temperature: {current.temperature}°F
                    </Text>
                    <Text style={weatherStyles.text}>
                        Current humidity: {current.humidity}%
                    </Text>
                    <Text style={weatherStyles.text}>
                        Clouds: {current.clouds}% | Rain: {current.precipitation}%
                    </Text>
                    <Text style={weatherStyles.text}>
                        Winds: {current.windSpeed}mph {degrees(current.windFrom)}
                    </Text>
                </View>
            </View>
        )
    } else {
        return (null);
    }
}

function DailyCard({ daily }) {
    //console.log(daily);
    const date = new Date(daily.time);
    return (
        <View style={{ marginVertical: 10 }}>
            <Text style={weatherStyles.text}>{date.getMonth() + 1}/{date.getDate() + 1}</Text>
            <Text style={weatherStyles.text}>Min temperature: {daily.tempMin}°F</Text>
            <Text style={weatherStyles.text}>Max temperature: {daily.tempMax}°F</Text>
            <Text style={weatherStyles.text}>Rain: {daily.rain}%</Text>
            <Text style={weatherStyles.text}>{daily.wind}mph {degrees(daily.windFrom)}</Text>
        </View>
    )
}

function degrees(direction) {
    let degrees = direction;
    if (degrees <= 180) {
        if (degrees < 22.5) {
            return 'N';
        } else if (degrees < 22.5 * 3 && degrees >= 22.5) {
            return 'NE';
        } else if (degrees < 22.5 * 5 && degrees >= 22.5 * 3) {
            return 'E';
        } else if (degrees < 22.5 * 7 && degrees >= 22.5 * 5) {
            return 'SE';
        } else {
            return 'S';
        }
    } else {
        degrees -= 180;
        if (degrees < 22.5) {
            return 'S';
        } else if (degrees < 22.5 * 3 && degrees >= 22.5) {
            return 'SW';
        } else if (degrees < 22.5 * 5 && degrees >= 22.5 * 3) {
            return 'W';
        } else if (degrees < 22.5 * 7 && degrees >= 22.5 * 5) {
            return 'NW';
        } else {
            return 'N';
        }
    }
}

export default function WeatherPage() {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [dailyWeather, setDailyWeather] = useState([]);

    const refreshWeather = async () => {
        console.log('WeatherPage: refreshing weather');
        const newWeather = await weatherCall();
        setItem('@weather', newWeather);
        setCurrentWeather(newWeather.current);
        setDailyWeather(newWeather.daily);
        return newWeather;
    }

    const handleWeather = () => {
        if ((Date.now() - currentWeather.time) > (1000 * 60 * 15)) {
            console.log('Weather: button weather outdated')
            //console.log('Weather: current time', new Date(Date.now()).toTimeString());
            //console.log('Weather: old time', new Date(currentWeather.time).toTimeString());
            refreshWeather().catch(err => console.error('Weather: button error', err));
        } else {
            // put something here to tell the user to calm down with updates
        }
    }

    useEffect(() => {
        console.log("Weather: effect update");
        getItem('@weather').then(item => {
            if (item == undefined || item == null) {
                refreshWeather().catch(err => console.error('Weather:', err));
            } else {
                if ((Date.now() - item.current.time) > (1000 * 60 * 60)) {
                    console.log("Weather: preload outdated")
                    refreshWeather().catch(err => console.error("Weather:", err));
                } else {
                    setCurrentWeather(item.current);
                    setDailyWeather(item.daily);
                }
            }
        })
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Image
                source={require('../assets/images/bg.png')}
                blurRadius={40}
                style={{ width: '100%', height: '200%', position: 'absolute' }}
            />
            <View>
                <Pressable
                    style={appStyles.button}
                    onPress={() => handleWeather()}
                >
                    <Text style={appStyles.buttonLabel}>Refresh</Text>
                </Pressable>
                {currentWeather != null ?
                    <CurrentCard current={currentWeather} /> : null
                }
                <FlatList
                    data={dailyWeather}
                    renderItem={({ item, index }) => <DailyCard daily={item} />}
                />
            </View>
        </SafeAreaView>
    );
}

const weatherStyles = StyleSheet.create({
    text: {
        color: 'white'
    },
    image: {
        height: 'auto',
        width: 'auto',
        maxWidth: '20%',
        maxHeight: '100%',
        position: 'relative',
        flex: 1,
        objectFit: 'contain',
    }
})
