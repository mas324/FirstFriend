import { useContext, useState } from "react";
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "../../components/TextFix";
import { appStyles } from "../../components/AppStyles";
import { setItem } from "../../utils/LocalStore";
import weatherCall from "../../utils/WeatherApi/meteoAPI";
import { weatherImages } from "../../utils/WeatherApi";
import { degrees } from "../../utils/Helper";
import AppContext from "../../utils/AppContext";

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


export default function WeatherPage() {
    // const [currentWeather, setCurrentWeather] = useState(null);
    // const [dailyWeather, setDailyWeather] = useState([]);
    const { weather, setWeather } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('Refresh');

    //console.log('Weather:', weather);

    const refreshWeather = async () => {
        console.log('Weather: refreshing weather');
        const newWeather = await weatherCall();
        setItem('@weather', newWeather);
        setWeather(newWeather);
        return newWeather;
    }

    const handleWeather = () => {
        if ((Date.now() - weather.current.time) > (1000 * 60 * 15)) {
            setLoading(true);
            console.log('Weather: button weather outdated')
            //console.log('Weather: current time', new Date(Date.now()).toTimeString());
            //console.log('Weather: old time', new Date(currentWeather.time).toTimeString());
            refreshWeather().catch(err => console.error('Weather: button error', err)
            ).finally(() => setLoading(false));
        } else {
            setMessage('Update cooldown of 15 minutes retry later');
            setTimeout(() => {
                setMessage('Refresh')
            }, 5000);
        }
    }

    // useEffect(() => {
    //     console.log("Weather: effect update");
    //     getItem('@weather').then(item => {
    //         if (item == undefined || item == null) {
    //             refreshWeather().catch(err => console.error('Weather:', err));
    //         } else {
    //             if ((Date.now() - item.current.time) > (1000 * 60 * 60)) {
    //                 console.log("Weather: preload outdated")
    //                 refreshWeather().catch(err => console.error("Weather:", err));
    //             } else {
    //                 setCurrentWeather(item.current);
    //                 setDailyWeather(item.daily);
    //             }
    //         }
    //     })
    // }, []);

    return (
        <SafeAreaView style={{ flex: 1, marginTop: '7.5%' }}>
            <Image
                source={require('../../assets/images/bg.png')}
                blurRadius={40}
                style={{ width: '100%', height: '200%', position: 'absolute' }}
            />
            <View>
                <Pressable
                    style={appStyles.button}
                    onPress={handleWeather}
                >
                    {loading ?
                        <ActivityIndicator size='large' color={appStyles.buttonLabel.color} />
                        :
                        <Text style={appStyles.buttonLabel}>{message}</Text>
                    }
                </Pressable>
                {weather != null ?
                    <>
                        <CurrentCard current={weather.current} />
                        <FlatList
                            data={weather.daily}
                            renderItem={({ item, index }) => <DailyCard daily={item} />}
                        />
                    </>
                    : null
                }

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
