import * as React from 'react';
import { View, Text, StyleSheet, VirtualizedList} from 'react-native';

const Page = StyleSheet.create({
    pageBG: {
        backgroundColor: '#E6EBEB',
        alignSelf: 'stretch',
        textAlign: 'left',
        paddingLeft: 30,
        paddingRight: 30,
        padding: 20,
        justifyContent: 'top',
        flex:1,
    },

    jobTitle: {
        fontWeight: 'bold',
        fontSize: 30,
        paddingBottom: 10,
    },

    jobSection:{
        paddingTop: 10,
        fontSize: 15,
        fontWeight: 'bold',
    },

    item: {
        backgroundColor: '#E6EBEB',
        height: 150,
        justifyContent: 'center',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 20
    }
});

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    item: {
        backgroundColor: '#f9c2ff',
        height: 150,
        justifyContent: 'center',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 20,
    },
    title: {
        fontSize: 32
    },
})
/* 
    GetJob will have an API parameter to get said job information.
    Then call API methods to retrieve data
*/
const getCard = (title, description, qualifications, salary) => {
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'top'}}>
            <View style={Page.pageBG}>
                <Text style={Page.jobTitle}>default Title</Text>
                <Text style={Page.jobSection}>Description</Text>
                <Text>• default description...</Text>
                <Text>• default description...</Text>
                <Text style={Page.jobSection}>Qualifications</Text>
                <Text>default qualifications</Text>
                <Text style={Page.jobSection}>Salary</Text>
                <Text>$10def</Text>
            </View>
        </View>
    );
}



// DEMO ONLY
const DemoCard= () => {
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'top'}}>
            <View style={Page.pageBG}>
                <Text style={Page.jobTitle}>Intern Front End Developer</Text>
                <Text style={Page.jobSection}>Description</Text>
                <Text>• Development and design of Web based UI solutions to deliver an intuitive user experience</Text>
                <Text>• Collaborate with users, technical, and architecture teams to solve complex user interface problems</Text>
                <Text style={Page.jobSection}>Qualifications</Text>
                <Text>Bachelor, Master or Doctorate of Science degree from an accredited course of study, in engineering, computer science, mathematics, physics or chemistry.</Text>
                <Text style={Page.jobSection}>Salary</Text>
                <Text>$20 per hour</Text>
            </View>
        </View>
    );
}

const DATA = []

const Item = ({title}) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
)

export function Jobs({navigator}) {

    // const renderItem = ({item, index}) => {
    //     return (
    //         <View key={index} style={styles.item}>
    //             <Text style={styles.title}>{item.title}</Text>
    //         </View>
    //     )
    // }
    return (
        // <SafeAreaView style={styles.container}>
        //     <VirtualizedList
        //     data={DATA}
        //     initialNumRender={1}
        //     renderItem={renderItem}
        //     />
        // </SafeAreaView>
        

        DemoCard()
    )
}