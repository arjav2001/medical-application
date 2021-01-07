import React from 'react'
import { View, Text, StyleSheet, ScrollView} from 'react-native'
import CalendarPicker from 'react-native-calendar-picker'
import * as SQLite from 'expo-sqlite'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { getComplaintsByDate, getPatientByID } from '../databaseStuff.js'

const db = SQLite.openDatabase("Registry.db")

export default class Calender extends React.Component {
    state = {
        todayPatients: []
    }

    onDateChange = async (d) => {
        const oldDate = d ? d.toString() : ''
        const date = oldDate.split(" ")
        let day = date[2]

        let month = "12"
        if (date[1] === "Jan") {
            month = "01"
        } else if (date[1] === "Feb") {
            month = "02"
        } else if (date[1] === "Mar") {
            month = "03"
        } else if (date[1] === "Apr") {
            month = "04"
        } else if (date[1] === "May") {
            month = "05"
        } else if (date[1] === "Jun") {
            month = "06"
        } else if (date[1] === "Jul") {
            month = "07"
        } else if (date[1] === "Aug") {
            month = "08"
        } else if (date[1] === "Sep") {
            month = "09"
        } else if (date[1] === "Oct") {
            month = "10"
        } else if (date[1] === "Nov") {
            month = "11"
        }
        const year = date[3]
        const newDate = `${year}-${month}-${day}`
        // db.transaction(tx => {
        //     tx.executeSql(
        //         "select Patients.name, Patients.id, Patients.age, Complaints.complaint, Complaints.meds, Complaints.labTest, Complaints.provD, Complaints.refer from Patients join Complaints on Patients.id=Complaints.patient_id where Complaints.date=?",
        //         [newDate],
        //         (tx, results) => {
        //             let todayPatients = results.rows._array
        //             this.setState({
        //                 todayPatients
        //             })
        //         }
        //     )
        // })
        let todayComplaints = await getComplaintsByDate(newDate)
        let todayPatients = []
        todayComplaints.map( async complaint => {
            let patient = await getPatientByID(complaint.patient_id)
            patient.complaint_id = complaint.complaint_id
            // console.log(patient)
            todayPatients.push(patient)
            // console.log(todayPatients.length)
            this.setState({todayPatients})
        })
    }

    render() {
        console.log(this.state.todayPatients.length)
        return (
            <View style={styles.screen}>
                <View style={{flex: 1}}>
                    <CalendarPicker onDateChange={(date) => this.onDateChange(date)}/>
                </View>
                {this.state.todayPatients.length > 0 &&
                    <View style={{alignItems: 'center', flex: 1}}>
                        <Text style={styles.text}>Patients on This Day</Text>
                        <ScrollView>
                            {this.state.todayPatients.map(patient => {
                                return (
                                    <TouchableOpacity
                                        style={styles.rowItem}
                                        key={patient.patient_id}
                                        onPress={() => this.props.navigation.navigate("Log",{
                                            logId: patient.complaint_id
                                        })}
                                    >
                                        <Text>{patient.name}, {patient.age}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </ScrollView>
                    </View>
                }
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
        padding: 5
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