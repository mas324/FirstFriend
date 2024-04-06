// import * as React from 'react';
import React, {useEffect, useState} from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList, TextInput, SafeAreaView} from 'react-native';
import { Text } from '../components/TextFix';
import {jobStyles } from '../components/JobStyles';

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

const API_ENDPOINT = 'https://api.coresignal.com/cdapi/v1/linkedin/job/search/filter';

export function Jobs({navigator}) {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [fullData, setFullData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() =>{
        setIsLoading(true);
        fetchData(API_ENDPOINT);
    }, []);

    const fetchData = async(url) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                mode: 'CORS',
                headers: {
                    'Authorization': 'eyJhbGciOiJFZERTQSIsImtpZCI6IjY0NWVmNzg3LTZkNmMtZTQ2ZS1kNjRiLWQ0N2FkZWRkZGM4NSJ9.eyJhdWQiOiJ0b3JvbWFpbC5jc3VkaC5lZHUiLCJleHAiOjE3NDM2NDU5NjQsImlhdCI6MTcxMjA4OTAxMiwiaXNzIjoiaHR0cHM6Ly9vcHMuY29yZXNpZ25hbC5jb206ODMwMC92MS9pZGVudGl0eS9vaWRjIiwibmFtZXNwYWNlIjoicm9vdCIsInByZWZlcnJlZF91c2VybmFtZSI6InRvcm9tYWlsLmNzdWRoLmVkdSIsInN1YiI6ImZhMGM0YzljLWMyMWMtZmZkZi1jMGI5LTQ4YWVkNWFmOWMxNiIsInVzZXJpbmZvIjp7InNjb3BlcyI6ImNkYXBpIn19.npUu-sntifY5L1IdkUez1Lw_btDeSOoDyoFrJmZ0dYcK0jECdFa6RJrnHfp30WQVd36x02NTZtoJ59LMCHEUBg'
                }
                // body: JSON.stringify(data)
            });
            const json = await response.json();
            setData(json.results);

            console.log(json.results);

        }   catch(error) {
            
            setError(error);
            console.log(error);
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const demoBOOL = true; // TRUE WHILE API ISN'T WORKING

    return (
        <SafeAreaView style={{ padding: 10, flex: 1, alignContent: 'center', justifyContent: 'top'}}>
            <View style={jobStyles.pageBG}>
                {   
                    demoBOOL === true ? DemoCard() : 
                        <TextInput
                            placeholder="Search"
                            clearButtonMode="always"
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={searchQuery}
                            onChangeText={(query) => handleSearch(query)}
                        />
                }  
            </View>
        </SafeAreaView>
    );
};
