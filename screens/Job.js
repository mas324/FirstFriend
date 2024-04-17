// import * as React from 'react';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList, TextInput, SafeAreaView, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from '../components/TextFix';
import { jobStyles } from '../components/JobStyles';
import Axios from 'axios';
import { appStyles } from '../components/AppStyles';
import { deleteItem, getItem, setItem } from '../utils/Authentication/LocalStore';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function DetailedListing({ route }) {
    const item = route.params;
    return (
        <ScrollView>
            <Text style={[jobStyles.jobTitle, { textAlign: 'center', fontSize: 20 }, item.company == undefined ? { height: 0 } : {}]}>{item.company}</Text>
            <Text style={jobStyles.jobTitle}>{item.title}</Text>
            <Text style={jobStyles.jobSection}>{item.desc}</Text>
            <Text style={jobStyles.jobSection}>Salary</Text>
            <Text style={jobStyles.jobSection}>{item.salary}</Text>
        </ScrollView>
    )
}

function JobMain({ navigation }) {
    const [data, setData] = useState([]);
    const [searchWord, setSearchWord] = useState("");

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

    const JobListing = ({ title, desc, company, salary }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('JobsDetail', { title: title, desc: desc, company: company, salary: salary });
                }}
            >
                <View style={{ backgroundColor: 'lightgray', marginVertical: 4, paddingBottom: 10 }}>
                    <Text style={[jobStyles.jobTitle, { textAlign: 'center', fontSize: 20 }, company == undefined ? { height: 0 } : {}]}>{company}</Text>
                    <Text style={jobStyles.jobTitle}>{title}</Text>
                    <Text style={jobStyles.jobSection} numberOfLines={4}>{desc}</Text>
                    <Text style={jobStyles.jobSection}>Salary</Text>
                    <Text style={jobStyles.jobSection}>{salary}</Text>
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

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'top' }}>
            <View style={[jobStyles.Main, { flexDirection: 'row' }]}>
                <TextInput
                    style={[appStyles.input, { marginLeft: 10, marginRight: 10, width: '70%' }]}
                    placeholder="Search"
                    value={searchWord}
                    onChangeText={(value) => setSearchWord(value)}
                />
                <Pressable
                    style={[appStyles.button, { margin: 0, minWidth: '20%' }]}
                    onPress={() => onClickHandler()}
                >
                    <Text style={appStyles.buttonLabel}>Search</Text>
                </Pressable>
            </View>
            <View style={{ height: '100%', paddingHorizontal: 4 }}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => <JobListing company={item.company_name} title={item.title} desc={item.description} salary={item.salary} />}
                    contentContainerStyle={{
                        flexGrow: 1,
                    }}
                />
            </View>
        </SafeAreaView>
    );
}

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
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='JobsHome' component={JobMain} />
            <Stack.Screen name='JobsDetail' component={DetailedListing} />
        </Stack.Navigator>
    )
};
