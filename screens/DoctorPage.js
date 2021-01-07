import React from 'react'
import {View, Text, ScrollView, StyleSheet} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import * as SQLite from 'expo-sqlite'
import DropDownPicker from 'react-native-dropdown-picker'
import Medicine from '../Medicine.js'
import Button from '../Button.js'
import Complaints from '../Complaints.js'
import { getHistory, addComplaint } from '../databaseStuff.js'
import MedDisplay from '../MedDisplay.js'

// const db = SQLite.openDatabase("Registry.db")
// const d = new Date()
// const today = d.getDate() + '-' + parseInt(d.getMonth()+1) + '-' + d.getFullYear()

export default class DoctorPage extends React.Component {

    state = {
        id: this.props.route.params.patient.patient_id,
        patient_name: this.props.route.params.patient.name,
        complaint: "",
        meds: [],
        labTest: "",
        provD: "",
        refer: "",
        history: {},
        showHistory: false,
        medicines: []
    }

    async componentDidMount() {
        // db.transaction(tx => {
        //     tx.executeSql(
        //         "select * from Complaints where patient_id=?",
        //         [this.state.id],
        //         (tx, requests) => {
        //             let history = requests.rows._array
        //             this.setState({history})
        //         }
        //     )
        // })

        const history = await getHistory(this.state.id)
        // console.log(history.length)
        this.setState({history})

        // db.transaction(tx => {
        //     tx.executeSql(
        //         "select name from Medicines",
        //         [],
        //         (tx, requests) => {
        //             let meds = requests.rows._array
        //             let medicines = []
        //             meds.map(med => {
        //                 medicines.push({label: med.name, value: med.name})
        //             })
        //             this.setState({medicines})
        //         }
        //     )
        // })
    }

    submission = async () => {
        // db.transaction(tx => {
        //     tx.executeSql(
        //         "insert into Complaints (patient_id, complaint, meds, labTest, provD, refer, date) values (?, ?, ?, ?, ?, ?, ?)",
        //         [this.state.id, this.state.complaint, JSON.stringify(this.state.meds), this.state.labTest, this.state.provD, this.state.refer, today]
        //     )
        // })
        let complaint = await addComplaint(this.state.id, this.state.complaint, this.state.meds, this.state.labTest, this.state.provD, this.state.refer)
        this.props.navigation.navigate("PatientSearch")
    }

    handleMedicine = (med) => {
        console.log(med)
        if (med.medicine !== "") {
            let newMeds = Object.assign([], this.state.meds)
            newMeds.push(med)
            this.setState({
                meds: newMeds
            })
        }
    }

    deleteMedicine = med => {
        let index = this.state.meds.indexOf(med)
        let newMeds = Object.assign([], this.state.meds)
        newMeds.splice(index, 1)
        this.setState({
            meds: newMeds
        })
    }

    render() {
        //console.log(this.state.medicines)
        return (
            <View style={styles.screen}>
                <ScrollView>
                    <Text style={styles.header}>Patient's Name: {this.state.patient_name}</Text>
                    <Text style={{alignSelf: 'center'}}>Complaints: </Text>
                    <Complaints />
                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text>Chief Complaint: </Text>
                            <Text>Provisional Diagnosis: </Text>
                            <Text>Lab Tests: </Text>
                            <Text>Refer To: </Text>
                        </View>
                        <View style={styles.column}>
                            <TextInput
                                style={styles.textInput}
                                multiline
                                value={this.state.complaint}
                                onChangeText={(complaint) => this.setState({complaint})}
                            />
                            <TextInput
                                style={styles.textInput}
                                value={this.state.provD}
                                onChangeText={(provD) => this.setState({provD})}
                            />
                            <TextInput
                                style={styles.textInput}
                                value={this.state.labTest}
                                onChangeText={(labTest) => this.setState({labTest})}
                            />
                            <TextInput
                                style={styles.textInput}
                                value={this.state.refer}
                                onChangeText={(refer) => this.setState({refer})}
                            />
                        </View>
                    </View>
                    <Text style={{alignSelf: 'center'}}>Prescribed Medicines: </Text>
                    <Medicine handler={(med) => this.handleMedicine(med)}/>
                    {this.state.meds.map(med => {
                        return (
                            <View style={styles.rowItem}>
                                <Text>{med.medicine}: {(parseInt(med.breakfast)+parseInt(med.lunch)+parseInt(med.dinner))*med.days}</Text>
                                <Button title="Delete" onPress={() => {this.deleteMedicine(med)}} />
                            </View>
                        )
                    })}
                    <View style={{flexDirection: 'row', margin: 20, justifyContent: 'space-evenly'}}>
                        <Button title="Submit"
                            onPress={() => this.submission()}
                        />
                        <Button 
                            title="Recent History"
                            onPress={() => this.setState(prevState => ({showHistory:!prevState.showHistory}))}
                        />
                    </View>
    
                    {this.state.showHistory &&
                        <View>
                            <ScrollView>
                                {this.state.history.map(log => {
                                    if (true) {
                                        return (
                                            <View style={styles.rowItem} key={log.id}>
                                                <Text>{log.created_on.substring(0, 10)}: </Text>
                                                <View>
                                                    <Text>Complaint: {log.complaint}</Text>
                                                    <Text>Medicine: </Text>
                                                    <MedDisplay meds={log.meds} hideDetails />
                                                    <Text>Diagnosis: {log.provD}</Text>
                                                </View>
                                            </View>
                                        )
                                    }
                                })}
                            </ScrollView>
                            <View style={{margin: 20}}>
                                <Button
                                    title="Show All History"
                                    onPress={() => this.props.navigation.navigate("History", {id: this.state.id})}
                                />
                            </View>
                        </View>
                    }
                </ScrollView>
            </View>
            // <Text style={styles.header}>Patient's Name: {this.state.patient_name}</Text>
            // <ScrollView>
            //     <View style={styles.row}>
            //         <Text>Chief Complaint: </Text>
            //         <TextInput
            //             style={styles.textInput}
            //             multiline
            //             value={this.state.complaint}
            //             onChangeText={(complaint) => this.setState({complaint})}
            //         />
            //     </View>
            //     <Text>Prescribed Medicines: </Text>
            //     <Medicine handler={(med) => this.handleMedicine(med)}/>
            //     {this.state.meds.map(med => {
            //         return (
            //             <View style={styles.row}>
            //                 <Text>{med.medicine}: {(parseInt(med.breakfast)+parseInt(med.lunch)+parseInt(med.dinner))*med.days}</Text>
            //                 <Button title="Delete" onPress={() => {this.deleteMedicine(med)}} />
            //             </View>
            //         )
            //     })}
            //     <View style={styles.row}>
            //         <Text>Provisional Diagnosis: </Text>
            //         <TextInput
            //             style={styles.textInput}
            //             value={this.state.provD}
            //             onChangeText={(provD) => this.setState({provD})}
            //         />
            //     </View>
            //     <View style={styles.row}>
            //         <Text>Lab Tests: </Text>
            //         <TextInput
            //             style={styles.textInput}
            //             value={this.state.labTest}
            //             onChangeText={(labTest) => this.setState({labTest})}
            //         />
            //     </View>
            //     <View style={styles.row}>
            //         <Text>Refer To: </Text>
            //         <TextInput
            //             style={styles.textInput}
            //             value={this.state.refer}
            //             onChangeText={(refer) => this.setState({refer})}
            //         />
            //     </View>
            // </ScrollView>
        )
    }
}

const styles=StyleSheet.create({
    row:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'stretch'
    },
    textInput:{
        borderWidth:1,
        borderColor:'black',
        width:200,
        height: 100,
        flexWrap: 'wrap',
        marginVertical:20
    },
    screen: {
        backgroundColor: "#5effea",
        flex: 1
    },
    header: {
        fontWeight: 'bold',
        fontSize: 20,
        alignSelf: 'center'
    },
    column: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    rowItem: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#5effea',
        borderWidth: 1,
        padding: 10,
        flexDirection: 'row'
    }
})

const withinAMonth = (date) => {
    let d = new Date()
    let month = date.split("-")[1]
    let year = date.split("-")[2]
    if (year > d.getFullYear()) {
        if (d.getMonth() - month === 12) {
            return true
        }
    } else if (year < d.getFullYear()) {
        if (month - d.getMonth() === 12) {
            return true
        }
    } else {
        if (Math.abs(month - d.getMonth()) <= 2) {
            return true
        }
    }
    return false
}
