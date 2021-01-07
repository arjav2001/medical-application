import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import * as SQLite from 'expo-sqlite'
import Button from '../Button.js'
import { updateAmount } from '../databaseStuff.js'

const db = SQLite.openDatabase("Registry.db")

export default class ChangeStores extends React.Component {

    state = {
        medicine: this.props.route.params.medicine,
        newAmount: 0
    }

    newAmountHandler = newAmount => {
        if (!isNaN(newAmount) && newAmount >= 0) {
            this.setState({newAmount})
        }
    }

    submit = async () => {
        // db.transaction(tx => {
        //     tx.executeSql(
        //         "update Medicines set amount=? where id=?",
        //         [this.state.newAmount, this.state.medicine.id],
        //         (tx, results) => {
        //             this.props.navigation.navigate("PatientSearch")
        //         }
        //     )
        // })
        const attempt = await updateAmount(this.state.medicine.medicine_id, this.state.newAmount,
            this.state.medicine.amount, this.state.medicine.total)
        this.props.navigation.goBack()
    }
 
    render () {
        return (
            <View style={styles.screen}>
                <Text style={styles.header}>{this.state.medicine.name}</Text>
                <Text style={styles.text}>Old Amount: {this.state.medicine.amount}</Text>
                <View style={styles.row}>
                    <Text style={styles.text}>New Amount: </Text>
                    <TextInput
                        value={this.state.newAmount.toString()}
                        onChangeText={newAmount => this.newAmountHandler(newAmount)}
                        style={styles.textInput}
                    />
                </View>
                <Button title="Submit" onPress={() => this.submit()} />
            </View>
        )
    }
}

const styles=StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#5effea',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    textInput:{
        borderWidth:1,
        borderColor:'black',
        padding: 10,
        minWidth: 40,
        maxWidth: 100
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    text: {
        fontWeight: 'bold',
        fontFamily: Platform.OS === 'ios' ? 'Arial' : 'Roboto',
        fontSize: 15
    },
    header: {
        fontWeight: 'bold',
        fontFamily: Platform.OS === 'ios' ? 'Arial' : 'Roboto',
        fontSize: 40
    }
})