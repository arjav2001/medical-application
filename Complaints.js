import React from 'react'
import { View, Text, TextInput } from 'react-native'
import Button from './Button.js'
import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase("Registry.db")

export default class Complaints extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            complaints: [],
            complaint: "",
            handler: props.handler
        }
    }

    componentDidMount() {
        db.transaction(tx => {
            tx.executeSql(
                "select name from Symptoms",
                [],
                (tx, requests) => {
                    let comps = requests.rows._array
                    let complaints = []
                    comps.map(complaint => {
                        complaints.push({label: complaint.name, value: complaint.name})
                    })
                    this.setState({complaints})
                }
            )
        })
    }

    finalize() {
        if (this.state.complaint.length > 0) {
            db.transaction(tx => {
                tx.executeSql(
                    "insert into Symptoms (name) values ?",
                    [this.state.complaint],
                    (tx, requests) => {
                        let complaints = Object.assign([], this.state.complaints)
                        console.log(requests)
                        complaints.push({label: this.state.complaint, value: this.state.complaint})
                        console.log(complaints)
                        this.setState({
                            complaints,
                            complaint: ""
                        })
                    }
                )
            })
        }
    }

    render() {
        console.log(this.state.complaints)
        return (
            <View style={{margin: 15}}>
                {this.state.complaints.length > 0 && <DropDownPicker
                    items={this.state.complaints}
                    searchable
                    dropDownMaxHeight={90}
                    defaultValue={this.state.complaint}
                    containerStyle={{height: 40, width: 150}}
                    style={{backgroundColor: '#5effea'}}
                    dropDownStyle={{backgroundColor: '#5effea'}}
                    onChangeItem={item => this.setState({
                        complaint: item.value
                    })}
                />}
                <TextInput
                    value={this.state.complaint}
                    onChangeText={complaint => this.setState({complaint})}
                />
                <Button title="Add Complaint" onPress={() => this.finalize()} />
            </View>
        )
    }
}