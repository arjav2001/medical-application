import React from 'react'
import {View, Text, TextInput, StyleSheet, Platform, ScrollView} from 'react-native'
import * as SQLite from 'expo-sqlite'
import Button from '../Button.js'
import { addPatient } from '../databaseStuff.js'

const db = SQLite.openDatabase("Registry.db")

const styles = StyleSheet.create({
    row:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        flex: 1,
    },
    textInput:{
        borderWidth:1,
        borderColor:'black',
        padding: 10
    },
    screen: {
        flex: 1,
        backgroundColor: '#5effea'
    },
    column: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    text: {
        fontWeight: 'bold',
        fontFamily: Platform.OS === 'ios' ? 'Arial' : 'Roboto',
        fontSize: 15
    }
})

export default class Registration extends React.Component {

    state = {
        serial: "",
        name: "",
        address: "",
        age: 0,
        todayPatients: []
    }

    insertPatient = async () => {

        let lastPatient = await addPatient(this.state.name, this.state.age, this.state.address)
        //console.log("insert")
        // db.transaction(tx => {
        //     tx.executeSql(
        //         "insert into Patients (name, age, address) values (?, ?, ?)",
        //         [this.state.name, this.state.age, this.state.address]
        //     );

        //     tx.executeSql(
        //         "select * from Patients where name=? and address=? and age=?",
        //         [this.state.name, this.state.address, this.state.age],
        //         (tx, results) => {
        //             let result = results.rows._array[0]
        //             let oldPatients = Object.assign([], this.state.todayPatients)
        //             oldPatients.push(result)
        //             this.setState({
        //                 name: "",
        //                 address: "",
        //                 age: 0,
        //                 serial: result.id,
        //                 todayPatients: oldPatients
        //             })
        //         }
        //     )
        // })
        
    }

    ageHandler = (age) => {
        if (!isNaN(age) && age >= 0) {
            this.setState({age})
        }
    }



    render() {
        return (
            <View style={styles.screen}>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.text}>Name: </Text>
                        <Text style={styles.text}>Adress: </Text>
                        <Text style={styles.text}>Age: </Text>
                    </View>
                    <View style={styles.column}>
                        <TextInput
                            style={styles.textInput}
                            placeholderTextColor="black"
                            value={this.state.name} placeholder="Insert Name Here"
                            onChangeText={(name) => {
                                this.setState({name})
                            }}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholderTextColor="black"
                            value={this.state.address} placeholder="Insert Address Here"
                            onChangeText={(address) => {
                                this.setState({address})
                            }}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholderTextColor="black"
                            value={this.state.age === 0 ? "" : this.state.age.toString()} placeholder="Insert Age Here"
                            onChangeText={(age) => this.ageHandler(age)}
                        />
                    </View>
                </View>
                {/* <View style={styles.row}>
                    
                    
                </View>
                <View style={styles.row}>
                    
                    
                </View>
                <View style={styles.row}>
                    
                    
                </View> */}
                <View style={{flex: 1}}>
                    <Button title="Submit"
                        onPress={() => this.insertPatient()}
                    />
                    <View style={{margin: 10}}></View>
                    <View style={styles.row}>
                        <Text style={styles.text}>The patient you just entered has the ID: </Text>
                        <Text>{this.state.serial}</Text>
                    </View>
                    <View style={styles.row}>
                        <View style={{margin: 12.5}}></View>
                        <Text style={styles.text}>Today's Patients:</Text>
                        <View style={{margin: 20}}></View>
                        <ScrollView>
                            {this.state.todayPatients.map(patient => {
                                return (
                                    <Text key={patient.id} style={styles.text}>{patient.name}, {patient.age}</Text>
                                )
                            })}
                        </ScrollView>
                    </View>
                </View>
                
            </View>
        )
    }
}