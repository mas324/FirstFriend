import { useContext, useEffect, useState } from "react";
import AppContext from "../utils/AppContext";
import { View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from "./TextFix";

function TabNotif({ resource }: { resource: Array<any> }) {
    const { user, message } = useContext(AppContext);
    const [unread, setUnread] = useState(0);
    const [newMess, setNewMess] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (loading) {
            return;
        }
        setLoading(true)
        console.log('TabBar: effect');
        let count = 0;
        if (message !== undefined && message !== null && message.length > 0) {
            message.forEach(contact => {
                if (contact.history.length > 0) {
                    contact.history.forEach(chat => {
                        if (chat.userIDSender === user.id) {
                            return;
                        }
                            count += chat.read ? 0 : 1;
                    });
                }
            });
        }
        if (count > 0) {
            setNewMess(true);
        }
        setUnread(count);
        setLoading(false);
    }, [message]);

    return (
        <View style={{ position: 'relative', alignSelf: 'center' }}>
            <Ionicons
                style={{
                    alignSelf: 'center',
                    position: 'relative'
                }}
                name={resource[0]}
                color={resource[1]}
                size={20}
            />
            {resource[0] === 'chatbubbles' && newMess ? (
                <View style={{ position: 'absolute', backgroundColor: 'red', borderRadius: 999, marginLeft: 16, minWidth: 14, minHeight: 14, alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 10 }}>{unread}</Text>
                </View>)
                :
                null
            }
        </View>
    )
}

export default TabNotif;