import React from 'react'
import {View, Text, StyleSheet, Platform} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import * as SQLite from 'expo-sqlite';
import Button from '../Button.js'

const db = SQLite.openDatabase("Registry.db")

export default class LoginPage extends React.Component {

    state = {
        fighter: "Nurse"
    }

    wipeEverything = () => {
        db.transaction(tx => {
            tx.executeSql(
                "delete * from Patients",
                []
            )
            tx.executeSql(
                "delete * from Complaints",
                []
            )
            tx.executeSql(
                "delete * from Medicines",
                []
            )
            tx.executeSql(
                "delete * from Symptoms",
                []
            )
            // tx.executeSql(
            //     "create table if not exists Patients (id integer primary key autoincrement, name varchar not null, age int not null, address varchar);",
            //     []
            // )
            // tx.executeSql(
            //     "create table if not exists Complaints (id integer primary key, patient_id integer not null, complaint text not null, meds text not null, labTest text not null, provD text not null, refer text not null, date varchar not null);",
            //     []
            // )
            // tx.executeSql(
            //     "create table if not exists Medicines (id integer primary key, name text not null, amount integer not null);",
            //     []
            // )
        })
    }

    componentDidMount() {
        db.transaction(tx => {
            tx.executeSql(
                "create table if not exists Patients (id integer primary key autoincrement, name varchar not null, age int not null, address varchar);",
                []
            )
            tx.executeSql(
                "create table if not exists Complaints (id integer primary key, patient_id integer not null, complaint text not null, meds text not null, labTest text not null, provD text not null, refer text not null, date varchar not null);",
                []
            )
            tx.executeSql(
                "create table if not exists Medicines (id integer primary key, name text not null, amount integer not null)"
            )
            tx.executeSql(
                "create table if not exists Symptoms (id integer primary key, name text not null)"
            )
        })
    }

    render() {
        return (
            <View style={styles.screen}>
                <View style={styles.row}>
                    <Text style={styles.text}>Choose your role: </Text>
                    <DropDownPicker 
                        items={[
                            {label: 'Nurse', value: 'Nurse'},
                            {label: 'Doctor', value: 'Doctor'},
                            {label: 'Pharm', value: 'Pharm'},
                            {label: 'Analyst', value: 'Analyst'}
                        ]}
                        labelStyle={styles.text}
                        defaultValue={this.state.fighter}
                        containerStyle={{height: 40, width: 130}}
                        style={{backgroundColor: '#5effea'}}
                        dropDownStyle={{backgroundColor: '#5effea'}}
                        onChangeItem={item => this.setState({
                            fighter: item.value
                        })}
                    />
                </View>
                <View style={styles.row}>
                    <Button title="Go Forward"
                        onPress={() => this.props.navigation.navigate(this.state.fighter)}
                    />
                    <Button title="Wipe Everything"
                        onPress={() => this.wipeEverything()}
                    />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'space-evenly',
        backgroundColor: '#5effea'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    text: {
        fontFamily: Platform.OS === 'ios' ? 'Arial' : 'Roboto',
        fontWeight: 'bold',
        fontSize: 19
    }
})