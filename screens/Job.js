// import * as React from 'react';
import React, {useEffect, useState} from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList, TextInput, SafeAreaView, Pressable, TouchableOpacity} from 'react-native';
import { Text } from '../components/TextFix';
import { jobStyles } from '../components/JobStyles';
import Axios from 'axios';

// DEMO ONLY
const DemoCard= () => {
    return(
        <View>
            <Text style={jobStyles.jobTitle}>Intern Front End Developer</Text>
            <Text style={jobStyles.jobSection}>Description</Text>
            <Text>• Development and design of Web based UI solutions to deliver an intuitive user experience</Text>
            <Text>• Collaborate with users, technical, and architecture teams to solve complex user interface problems</Text>
            <Text style={jobStyles.jobSection}>Qualifications</Text>
            <Text>Bachelor, Master or Doctorate of Science degree from an accredited course of study, in engineering, computer science, mathematics, physics or chemistry.</Text>
            <Text style={jobStyles.jobSection}>Salary</Text>
            <Text>$20 per hour</Text>
        </View>
    );
}

const instance = Axios.create({
    baseURL: 'https://api.coresignal.com/cdapi/v1/linkedin/job/collect/',
    timeout: 1000,
    headers: {
        Authorization:'eyJhbGciOiJFZERTQSIsImtpZCI6IjY0NWVmNzg3LTZkNmMtZTQ2ZS1kNjRiLWQ0N2FkZWRkZGM4NSJ9.eyJhdWQiOiJ0b3JvbWFpbC5jc3VkaC5lZHUiLCJleHAiOjE3NDM2NDU5NjQsImlhdCI6MTcxMjA4OTAxMiwiaXNzIjoiaHR0cHM6Ly9vcHMuY29yZXNpZ25hbC5jb206ODMwMC92MS9pZGVudGl0eS9vaWRjIiwibmFtZXNwYWNlIjoicm9vdCIsInByZWZlcnJlZF91c2VybmFtZSI6InRvcm9tYWlsLmNzdWRoLmVkdSIsInN1YiI6ImZhMGM0YzljLWMyMWMtZmZkZi1jMGI5LTQ4YWVkNWFmOWMxNiIsInVzZXJpbmZvIjp7InNjb3BlcyI6ImNkYXBpIn19.npUu-sntifY5L1IdkUez1Lw_btDeSOoDyoFrJmZ0dYcK0jECdFa6RJrnHfp30WQVd36x02NTZtoJ59LMCHEUBg',
    }
})

const API_ENDPOINT = 'https://api.coresignal.com/cdapi/v1/linkedin/job/search/filter';

export function Jobs({navigator}) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [searchWord, setSearchWord] = useState("");

    useEffect(()=>{
        Axios.get(data)
        .then((response)=>console.log(response)).catch((err)=>console.log(err))
        .then((data) => {
            setData(data);
            console.log("TEST " + data);
        });
    },[]);
    
    const onClickHandler = () => {
        
    }

    return (
        <SafeAreaView style={{ padding: 10, flex: 1, justifyContent: 'top'}}>
            <View style={jobStyles.assembler}>
                <View style={jobStyles.Main}>
                    <TextInput
                        style={jobStyles.input}
                        placeholder="Search"
                        value={searchWord}
                        onChangeText={(value) => setSearchWord(value)}
                    />
                </View>
                <Pressable style={jobStyles.buttonP} 
                    onPress={(onClickHandler) => {console.log("Search Word = " + searchWord)}}>
                </Pressable>              
            </View>
        </SafeAreaView>
    );
};
// onPress={() => { (query) => handleSearch(query)}}