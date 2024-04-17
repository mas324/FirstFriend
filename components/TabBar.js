import { Image, TouchableOpacity, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons'
import { Text } from "./TextFix";

function BottomTab({ state, descriptors, navigation }) {
    return (
        <View style={{ flexDirection: 'row', height: 50, alignItems: 'center' }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label = options.tabBarLabel !== undefined ?
                    options.tabBarLabel : options.title !== undefined ?
                        options.title : route.name;
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                const resource = ['server', 'black'];
                switch (route.name) {
                    case 'Home':
                        resource[0] = 'home';
                        resource[1] = 'maroon';
                        break;
                    case 'Jobs':
                        resource[0] = 'search';
                        resource[1] = 'blue';
                        break;
                    case 'Messages':
                        resource[0] = 'chatbubbles';
                        resource[1] = 'orange';
                        break;
                }

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1 }}
                        key={index}
                    >
                        <Ionicons
                            style={{
                                alignSelf: 'center'
                            }}
                            name={resource[0]}
                            color={resource[1]}
                            size={20}
                        />
                        <Text style={{
                            color: isFocused ? '#50a0ff' : 'black',
                            textAlign: 'center'
                        }}
                        >
                            {label}
                        </Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default BottomTab;
