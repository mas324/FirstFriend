// import * as React from 'react';
import React, { useContext, useState } from 'react';
import { View, FlatList, TextInput, Pressable, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Text } from '../../components/TextFix';
import { jobStyles } from '../../components/JobStyles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AppContext from '../../utils/AppContext';
import { getJob, postJob } from '../../utils/Firestore';
import { Job } from '../../components/Types';
import { useFocusEffect, useRoute } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const definePosting = {
    position: '',
    recruiter: '',
    description: '',
    salary: '',
}

function DetailedListing({ route }) {
    const item = route.params as Job;
    //console.log(item);
    return (
        <SafeAreaView style={{ marginTop: 0, marginBottom: 6, paddingHorizontal: 8, flex: 1, backgroundColor: '#FFFFE9' }}>
            <ScrollView>
                <Text style={[jobStyles.jobTitle, { textAlign: 'center', fontSize: 24 }]}>{item.position}</Text>
                <Text style={[jobStyles.jobTitle, { fontSize: 20 }]}>{item.recruiter}</Text>
                <Text style={[jobStyles.jobSection, { fontSize: 14 }]}>{item.description}</Text>
                <Text style={[jobStyles.jobSection, { fontWeight: 'bold', fontSize: 18, textAlign: 'center' }]}>Salary: {
                    <Text style={[jobStyles.jobSection, { fontSize: 16 }]}>{item.salary}</Text>
                }</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

function JobsApplication({ route, navigation }) {
    const user = route.params;
    const applyPositions = ['Teacher Aid', 'Research Aid', 'Cashier', 'Librarian', 'IT Intern', 'Accountant', 'Tutor'];
    const [position, setPosition] = useState(applyPositions[Math.floor(Math.random() * applyPositions.length)]);
    const [salary, setSalary] = useState("$" + (Math.random() * 10000).toFixed(2));
    const [description, setDescription] = useState('');

    const [error, setError] = useState('');

    return (
        <SafeAreaView style={{ marginTop: 0, flex: 1, backgroundColor: '#860038' }}>
            <View style={{ paddingTop: 25, backgroundColor: '#860038' }}>
                <TextInput
                    placeholder='Position'
                    style={jobStyles.jobAppInput}
                    onChangeText={text => setPosition(text)}
                    defaultValue={position}
                />
                <TextInput
                    placeholder='Salary'
                    style={jobStyles.jobAppInput}
                    onChangeText={text => setSalary(text)}
                    defaultValue={salary}
                />
                <TextInput
                    placeholder='Description'
                    onChangeText={text => setDescription(text)}
                    style={jobStyles.inputDescription}
                    multiline={true}
                    numberOfLines={10}
                    defaultValue={description}
                />
                <TouchableOpacity
                    onPress={() => {
                        definePosting.recruiter = user.firstname + ' ' + user.lastname;
                        definePosting.position = position;
                        definePosting.description = description;
                        definePosting.salary = salary;
                        const postID = Date.now().toString() + '_' + user.id;
                        postJob(definePosting, postID).then(posted => {
                            if (posted) {
                                navigation.popToTop();
                            } else {
                                setError('Error in application submittion');
                            }
                        })

                    }}
                >
                    <Text style={jobStyles.textButton}>Submit</Text>
                </TouchableOpacity>
                <Text>{error}</Text>
            </View>

        </SafeAreaView>

    )
}

// search, setSearch Search should only show search array
function JobMain({ navigation }) {
    const [data, setData] = useState(Array<Job>());
    const [search, setSearch] = useState([]);
    const [searchWord, setSearchWord] = useState("");
    const { user, setJobs } = useContext(AppContext);

    const route = useRoute()
    const [loading, setLoading] = useState(false);

    useFocusEffect(React.useCallback(() => {
        console.log('Job: focus event');
        refreshListing();
    }, [route]))

    // useEffect(() => {
    //     console.log('Job: effect start');
    //     refreshListing();
    // }, []);

    function searching() {
        console.log('Job: search for', searchWord);
        if (searchWord.length === 0) {
            setSearch([]);
            onClickHandler();
            return;
        }
        const searchArray = data.filter(post => {
            return post.position.toLowerCase().includes(searchWord.toLowerCase());
        });
        setSearch(searchArray);
    }

    const refreshListing = () => {
        console.log('Job: loading data');
        setLoading(true)
        getJob().then(jobs => {
            console.log('Job: data got');
            setJobs(jobs);
            setData(jobs);
            setLoading(false);
        });
    }

    const onClickHandler = () => {
        // console.log('Job: resetting state');
        // deleteItem('@jobs').then(() => {
        //     setData([])
        // });
        //setLoading(!loading);
    };

    const JobListing = ({ listing }) => {
        //console.log(listing)
        const recruiter = listing.recruiter;
        const desc = listing.description;
        const position = listing.position;
        const salary = listing.salary;
        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('JobsDetail', listing);
                }}
            >
                <View style={{ backgroundColor: '#FFFFE9', marginVertical: 4, paddingBottom: 10, paddingTop: 2, paddingHorizontal: 6, borderRadius: 10 }}>
                    <Text style={[jobStyles.jobTitle, { textAlign: 'center', fontSize: 20 }]}>{position}</Text>
                    <Text style={jobStyles.jobTitle}>Posted by: {recruiter}</Text>
                    <Text style={jobStyles.jobSection} numberOfLines={4}>{desc}</Text>
                    <Text style={[jobStyles.jobSection, { fontWeight: 'bold' }]}>Salary: {
                        <Text style={jobStyles.jobSection}>{salary}</Text>
                    }</Text>

                </View>
            </TouchableOpacity>
        );
    }

    return (
        <SafeAreaView style={{ marginTop: 0, flex: 1, justifyContent: 'flex-start', paddingBottom: 20, backgroundColor: '#860038' }}>
            {loading ?
                <View style={{ position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                    <ActivityIndicator size={80} color='blue' />
                </View>
                :
                null
            }
            <View style={[jobStyles.Main, { flexDirection: 'row', marginHorizontal: 4 }]}>
                <TextInput
                    style={[jobStyles.input, { marginLeft: 10, marginRight: 10, width: '70%' }]}
                    placeholder="Search"
                    value={searchWord}
                    onChangeText={(value) => setSearchWord(value)}
                />
                <Pressable
                    style={[jobStyles.button, { margin: 6, minWidth: '20%' }]}
                    onPress={() => searching()}
                >
                    {/* <Icon name="search" size={20} color="grey" style={{ marginLeft: 38 }} /> */}
                    <FontAwesome name='search' size={20} color={'gray'} style={{ marginLeft: 38 }} />
                </Pressable>

            </View>
            <View style={{ height: '100%', paddingHorizontal: 8, paddingBottom: 48 }}>
                <FlatList
                    data={search.length > 0 ? search : data}
                    renderItem={({ item }) => <JobListing listing={item} />}
                    contentContainerStyle={{
                        flexGrow: 1,
                    }}
                />
                {user.type === 'staff' ?
                    <TouchableOpacity
                        onPress={() => navigation.navigate('JobsApplication', user)}
                        style={jobStyles.fab}
                    >
                        {/* <Icon name="plus" style={jobStyles.plusr} /> */}
                        <FontAwesome name='plus' size={16} style={jobStyles.plusr} />
                    </TouchableOpacity> : null
                }
            </View>
        </SafeAreaView>
    );

}

export function Jobs() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='JobsHome' component={JobMain} />
            <Stack.Screen name='JobsDetail' component={DetailedListing} />
            <Stack.Screen name='JobsApplication' component={JobsApplication} />
        </Stack.Navigator>
    )
};
