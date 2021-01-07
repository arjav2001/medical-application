import React from 'react'
import { View, Text, StyleSheet} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { TextInput } from 'react-native-gesture-handler'
import * as SQLite from 'expo-sqlite'
import Button from './Button.js'
import { getMedicines } from './databaseStuff.js'

const db = SQLite.openDatabase("Registry.db")

export default class Medicine extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            medicines: [],
            breakfast: 0,
            lunch: 0,
            dinner: 0,
            days: 0,
            medicine: "",
            handler: props.handler
        }
    }

    async componentDidMount() {
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

        let allMedicines = await getMedicines()
        console.log(allMedicines)
        let medicines = []
        allMedicines.map(med => {
            medicines.push({label: med.name, value: med.name})
        })
        this.setState({medicines})
    }

    breakfastHandler = breakfast => {
        if (!isNaN(breakfast) && breakfast >= 0) {
            this.setState({breakfast})
        }
    }

    lunchHandler = lunch => {
        if (!isNaN(lunch) && lunch >= 0) {
            this.setState({lunch})
        }
    }

    dinnerHandler = dinner => {
        if (!isNaN(dinner) && dinner >= 0) {
            this.setState({dinner})
        }
    }

    daysHandler = days => {
        if (!isNaN(days) && days >= 0) {
            this.setState({days})
        }
    }

    finalize = () => {
        let med = {
            medicine: this.state.medicine,
            breakfast: this.state.breakfast,
            lunch: this.state.lunch,
            dinner: this.state.dinner,
            days: this.state.days
        }
        this.state.handler(med)
        this.setState({
            breakfast: 0,
            lunch: 0,
            dinner: 0,
            days: 0
        })
    }



    render() {
        return (
            <View style={{margin: 15}}>
                {this.state.medicines.length > 0 && <DropDownPicker
                    items={this.state.medicines}
                    searchable
                    dropDownMaxHeight={90}
                    defaultValue={this.state.medicine}
                    containerStyle={{height: 40, width: 150}}
                    style={{backgroundColor: '#5effea'}}
                    dropDownStyle={{backgroundColor: '#5effea'}}
                    onChangeItem={item => this.setState({
                    medicine: item.value
                    })}
                />}
                <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                    <TextInput style={styles.textInput} placeholder="Breakfast" value={this.state.breakfast === 0? "" : this.state.breakfast.toString()} onChangeText={(breakfast) => {this.breakfastHandler(breakfast)}}/>
                    <TextInput style={styles.textInput} placeholder="Lunch" value={this.state.lunch === 0? "" : this.state.lunch.toString()} onChangeText={(lunch) => {this.lunchHandler(lunch)}}/>
                    <TextInput style={styles.textInput} placeholder="Dinner" value={this.state.dinner === 0? "" : this.state.dinner.toString()} onChangeText={(dinner) => {this.dinnerHandler(dinner)}}/>
                    <TextInput style={styles.textInput} placeholder="Days" value={this.state.days === 0? "" : this.state.days.toString()} onChangeText={(days) => {this.daysHandler(days)}}/>
                </View>
                <Button title="Add Medicine" onPress={() => this.finalize()} />
            </View>
        )
    }
}

const styles=StyleSheet.create({
    textInput: {
        width: 80
    }
})