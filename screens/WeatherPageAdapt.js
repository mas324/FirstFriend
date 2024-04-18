import { useState } from "react";
import { Image, Pressable, View } from "react-native";
import { polyfillGlobal } from "react-native/Libraries/Utilities/PolyfillFunctions"
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "../components/TextFix";
import { appStyles } from "../components/AppStyles";
import { fetchLocations, fetchWeatherForecast } from "../utils/WeatherApi/weather";
import { getItem } from "../utils/LocalStore";
import { fetchWeatherApi } from "openmeteo";
import axios, { Axios } from "axios";


export default function WeatherPage() {
    const [currentWeather, setCurrentWeather] = useState({});

    const applyPolyfill = () => {
        polyfillGlobal("TextEncoder", () => TextEncoder);
        polyfillGlobal("TextDecoder", () => TextDecoder);
    }

    applyPolyfill();

    const params = {
        "latitude": 33.8314,
        "longitude": -118.282,
        "current": ["temperature_2m", "precipitation", "wind_speed_10m"],
        "daily": ["temperature_2m_max", "temperature_2m_min", "precipitation_hours", "wind_speed_10m_max"],
        "temperature_unit": "fahrenheit",
        "wind_speed_unit": "mph",
        "precipitation_unit": "inch",
        "timezone": "America/Los_Angeles"
    };
    const url = "https://api.open-meteo.com/v1/forecast";

    const otherURL = 'https://api.open-meteo.com/v1/forecast?latitude=33.8314&longitude=-118.282&current=temperature_2m,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_hours,wind_speed_10m_max&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FLos_Angeles'

    const handleWeather = () => {
        console.log('getting weather')
        axios.get(otherURL).then(data => {
            const dailyData = data.data.daily;
            console.log(dailyData)
            setCurrentWeather(data.data.current);
        })
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Image
                source={require('../assets/images/bg.png')}
                blurRadius={20}
                style={{ width: '100%', height: '100%', position: 'absolute' }}
            />
            <View>
                <Pressable
                    style={appStyles.button}
                    onPress={() => handleWeather()}
                >
                    <Text style={appStyles.buttonLabel}>Refresh</Text>
                </Pressable>
            </View>
            <Text style={{ color: 'white' }}>{currentWeather.time}</Text>
            <Text style={{ color: 'white' }}>{currentWeather.temperature_2m}</Text>
            <Text style={{ color: 'white' }}>{currentWeather.precipitation}</Text>
            <Text style={{ color: 'white' }}>{currentWeather.wind_speed_10m_max}</Text>
        </SafeAreaView>
    );
}