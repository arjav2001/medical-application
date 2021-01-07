import React from 'react'
import {View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet} from 'react-native'
import * as SQLite from 'expo-sqlite';
import Button from '../Button.js'
import { getPatientByID, getPatientsByName } from '../databaseStuff.js'
// import CalendarPicker from 'react-native-calendar-picker'

const db = SQLite.openDatabase("Registry.db")

export default class PatientSearch extends React.Component {

    state = {
        id:"",
        patient:{},
        error:"",
        forgotID:false,
        name:"",
        potentialPatients:[],
        // todayPatients: []
    }

    onClick = async () => {
        if (this.state.forgotID) {
            const potentialPatients = await getPatientsByName(this.state.name)
            this.setState({potentialPatients})
            // console.log(patients)
            //console.log(patients)
            // db.transaction(tx => {
            //     tx.executeSql(
            //         "select * from Patients where name like ?",
            //         ["%" + this.state.name + "%"],
            //         (tx, results) => {
            //             console.log(results)
            //             let potentialPatients = results.rows._array
            //             this.setState({
            //                 potentialPatients
            //             })
            //         }
            //     )
            // })
        }
        else if (this.state.id > 0 && !isNaN(this.state.id)) {
            const patient = await getPatientByID(this.state.id)
            // console.log(patient)
            if (patient) {
                this.props.navigation.navigate("Meds", {
                    patient: patient
                })
            } else {
                this.setState({
                    error: "No such patient"
                })
            }
            // db.transaction(tx => {
            //     tx.executeSql(
            //         "select * from Patients where id=?",
            //         [parseInt(this.state.id)],
            //         (tx, results) => {
            //             console.log(results)
            //             let patient = results.rows._array[0]
            //             this.setState({
            //                 id: "",
            //             })
            //             if (patient) {
            //                 this.props.navigation.navigate("Meds", {
            //                     patient
            //                 })
            //             } else {
            //                 this.setState({
            //                     error: "No such patient."
            //                 })
            //             }
            //         }
            //     )
            // })
        }
    }

    render() {
        //console.log(this.state.todayPatients)
        return (
            <View style={styles.screen}>
                <View style={{flex: 1}}>
                    <View style={styles.row}>
                        <Text style={styles.text}>Enter Patient's ID: </Text>
                        <TextInput
                            value={this.state.id}
                            onChangeText={(id) => this.setState({id})}
                            style={styles.textInput}
                        />
                    </View>
                    <View style={styles.row}>
                        <Button title="Find" onPress={() => this.onClick()}/>
                        {this.state.error !== "" && <Text>{this.state.error}</Text>}
                        <Button title="Forgot ID?" onPress={() => 
                            this.setState(prevState => ({
                                forgotID: !prevState.forgotID
                            })
                        )} />
                    </View>
                </View>
                {this.state.forgotID &&
                    <View style={{flex: 1}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginBottom: 10}}>
                            <Text style={styles.text}>Enter Patient's Name: </Text>
                            <TextInput
                                value={this.state.name}
                                onChangeText={(name) => this.setState({name})}
                                style={styles.textInput}
                            />
                        </View>
                        <ScrollView>
                            {this.state.potentialPatients.map(patient => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate("Meds", {
                                            patient
                                        })}
                                        style={styles.rowItem}
                                        key={patient.patient_id}
                                    >
                                        <Text style={{fontSize: 13}}>Name: {patient.name}, Age: {patient.age}, Address: {patient.address} </Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </ScrollView>
                    </View>
                }
                {/* <CalendarPicker onDateChange={(date) => this.onDateChange(date)}/>
                {this.state.todayPatients.length > 0 &&
                    <View>
                        <Text>Patients on This Day:</Text>
                        {this.state.todayPatients.map(patient => {
                            return (
                                <Text key={patient.id}>Name: {patient.name}, ID: {patient.id}</Text>
                            )
                        })}
                    </View>
                } */}
                <View style={styles.row}>
                    <Button title="Stores" onPress={() => this.props.navigation.navigate("Stores")} />
                    <Button title="Calendar" onPress={() => this.props.navigation.navigate("Calendar")} />
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    rowItem: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5effea',
        borderWidth: 1,
        padding: 20
    },
    screen: {
        flex: 1,
        justifyContent: 'space-evenly',
        backgroundColor: '#5effea'
    },
    textInput:{
        borderWidth:1,
        borderColor:'black',
        padding: 5,
        minWidth: 40
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flex: 1
    },
    text: {
        fontWeight: 'bold',
        fontFamily: Platform.OS === 'ios' ? 'Arial' : 'Roboto',
        fontSize: 15
    }
})