// import * as React from 'react';
import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, TextInput, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from '../components/TextFix';
import { jobStyles } from '../components/JobStyles';
import { appStyles } from '../components/AppStyles';
import { deleteItem, getItem, setItem } from '../utils/LocalStore';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppContext from '../utils/AppContext';
import { postJob } from '../utils/Firestore';

const Stack = createNativeStackNavigator();



function DetailedListing({ route }) {
    const item = route.params;
    return (
        <SafeAreaView style={{ marginTop: 8, marginBottom: 6, paddingHorizontal: 8 }}>
            <ScrollView>
                <Text style={[jobStyles.jobTitle, { textAlign: 'center', fontSize: 24 }, item.position == undefined ? { height: 0 } : {}]}>{item.position}</Text>
                <Text style={[jobStyles.jobTitle, { fontSize: 20 }]}>{item.recruiter}</Text>
                <Text style={[jobStyles.jobSection, { fontSize: 14 }]}>{item.desc}</Text>
                <Text style={[jobStyles.jobSection, { fontWeight: 'bold', fontSize: 18, textAlign: 'center' }]}>Salary: {
                    <Text style={[jobStyles.jobSection, { fontSize: 16 }]}>{item.salary}</Text>
                }</Text>
            </ScrollView>
        </SafeAreaView>
    )
}
// search, setSearch Search should only show search array
function JobMain({ navigation }) {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState([]);   
    const [searchWord, setSearchWord] = useState("");
    const {state} = useContext(AppContext);

    
    if (state.type === 'student'){
        // Hide button
    }

    const DATA = require('../assets/job_postings.json');
    //const DATA_EXTRA = require('../assets/job_postings_extra.json');

    //console.log(DATA);
    //console.log(DATA_EXTRA);

    useEffect(() => {
        //console.log('running effect job');
        getItem('@jobs').then(items => {
            setData(items);
        })
    }, []);

    const JobListing = ({ recruiter, desc, position, salary }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('JobsDetail', { recruiter: recruiter, desc: desc, position: position, salary: salary });
                }}
            > 
                <View style={{ backgroundColor: 'lightgray', marginVertical: 4, paddingBottom: 10, paddingTop: 2, paddingHorizontal: 6 }}>
                    <Text style={[jobStyles.jobTitle, { textAlign: 'center', fontSize: 20 } , position == undefined ? { height: 0 } : {}]}>{position}</Text>
                    <Text style={jobStyles.jobTitle}>{recruiter}</Text>
                    <Text style={jobStyles.jobSection} numberOfLines={4}>{desc}</Text>
                    <Text style={[jobStyles.jobSection, { fontWeight: 'bold' }]}>Salary: {
                        <Text style={jobStyles.jobSection}>{salary}</Text>
                    }</Text>

                </View>
            </TouchableOpacity>
        );
    }

    const onClickHandler = () => {
        if (searchWord.toLowerCase() === 'clear') {
            console.log('Removing data');
            deleteItem('@jobs');
            setData([]);
            return;
        }

        const searchRequest = {
            "experience_title": searchWord,
            "country": '(United States)',
            "location": 'Carson, California',
            "last_updated_gte": '2024-04-01 00:00:00'
        };
        getItem('@jobs').then(localJobs => {
            if (localJobs === null) {
                setItem('@jobs', DATA);
                setData(DATA);
            } else {
                setData(localJobs);
            }
        });
    };

    let definePosting = {
        position: '',
        recruiter: '',
        description: '',
    }

    // Make button work
    const addOnClickHandler = () => {
        if (state.type === 'staff'){
            postJob(definePosting, state.id)
            console.log("DEMO")
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'top' }}>
            <View style={[jobStyles.Main, { flexDirection: 'row', marginTop: -12, marginHorizontal: 5 }]}>
                <TextInput
                    style={[jobStyles.input, { marginLeft: 10, marginRight: 10, width: '70%' }]}
                    placeholder="Search"
                    value={searchWord}
                    onChangeText={(value) => setSearchWord(value)}
                />
                <Pressable
                    style={[jobStyles.button, { margin: 7, minWidth: '20%' }]}
                    onPress={() => onClickHandler()}
                >
                    <Icon name="search" size={20} color="grey" style={{marginLeft: 38}}/>
                    {/* <Text style={jobStyles.buttonLabel}>Search</Text> */}
                </Pressable>
                
            </View>
            <View style={{ height: '100%', paddingHorizontal: 7 }}>
                <FlatList
                    data={data != null ? data.slice(0,2):null}
                    renderItem={({ item }) => <JobListing position={item.company_name} recruiter={item.title} desc={item.description} salary={item.salary} />}
                    contentContainerStyle={{
                        flexGrow: 1,
                    }}
                />
                <TouchableOpacity onPress={() => addOnClickHandler()} style={jobStyles.fab}>
                    <Text>+</Text>
                 </TouchableOpacity>
            </View>
            
        </SafeAreaView>
    );

}


// <TouchableOpacity onPress={() => {navigation.navigate('SendMessageScreen'); deleteItem('@messages')}} style={styles.fab}>
//         <Text style={styles.fabIcon}>+</Text>
//       </TouchableOpacity>


// const instance = Axios.create({
//     //baseURL: 'https://api.coresignal.com/cdapi/v1/linkedin/job/collect/',
//     timeout: 1000,
//     headers: {
//         "Content-Type": 'application/json',
//         Authorization: 'Bearer eyJhbGciOiJFZERTQSIsImtpZCI6IjY0NWVmNzg3LTZkNmMtZTQ2ZS1kNjRiLWQ0N2FkZWRkZGM4NSJ9.eyJhdWQiOiJ0b3JvbWFpbC5jc3VkaC5lZHUiLCJleHAiOjE3NDM2NDU5NjQsImlhdCI6MTcxMjA4OTAxMiwiaXNzIjoiaHR0cHM6Ly9vcHMuY29yZXNpZ25hbC5jb206ODMwMC92MS9pZGVudGl0eS9vaWRjIiwibmFtZXNwYWNlIjoicm9vdCIsInByZWZlcnJlZF91c2VybmFtZSI6InRvcm9tYWlsLmNzdWRoLmVkdSIsInN1YiI6ImZhMGM0YzljLWMyMWMtZmZkZi1jMGI5LTQ4YWVkNWFmOWMxNiIsInVzZXJpbmZvIjp7InNjb3BlcyI6ImNkYXBpIn19.npUu-sntifY5L1IdkUez1Lw_btDeSOoDyoFrJmZ0dYcK0jECdFa6RJrnHfp30WQVd36x02NTZtoJ59LMCHEUBg',
//     }
// })

//const API_ENDPOINT = 'https://api.coresignal.com/cdapi/v1/linkedin/job/search/filter';

export function Jobs() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen name='JobsHome' component={JobMain} />
            <Stack.Screen name='JobsDetail' component={DetailedListing} />
            <Stack.Screen name='JobsApplication' component={DetailedListing} />
        </Stack.Navigator>
    )
};
