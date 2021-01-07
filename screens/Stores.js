import React from 'react'
import {View, Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native'
import * as SQLite from 'expo-sqlite'
import { ThemeColors } from 'react-navigation'
import { TextInput } from 'react-native-gesture-handler'
import Button from '../Button.js'
import { getMedicines, addMedicine } from '../databaseStuff.js'
const db = SQLite.openDatabase("Registry.db")

export default class Stores extends React.Component {

    state = {
        medicines: [],
        addDrug: false,
        name: "",
        amount: 0
    }

    componentDidMount() {
        this.getMeds()
    }

    getMeds = async () => {
        // db.transaction(tx => {
        //     tx.executeSql(
        //         "select * from Medicines",
        //         [],
        //         (tx, results) => {
        //             let medicines=results.rows._array
        //             this.setState({medicines})
        //         }
        //     )
        // })
        let medicines = await getMedicines()
        this.setState({medicines})
    }

    addDrugHandler = () => {
        this.setState(prevState => ({
            addDrug: !prevState.addDrug
        }))
    }

    nameHandler = name => {
        this.setState({name})
    }

    amountHandler = amount => {
        if (!isNaN(amount)) {
            this.setState({amount})
        }
    }

    addDrug = async () => {
        if (this.state.name.length > 0) {
            let attempt = await addMedicine(this.state.name, this.state.amount)
            console.log(attempt)
            let medicines = await getMedicines()
            this.setState({
                addDrug: false,
                name: "",
                amount: 0,
                medicines
            })
            // db.transaction(tx => {
            //     tx.executeSql(
            //         "insert into Medicines (name, amount) values (?, ?)",
            //         [this.state.name, this.state.amount],
            //         (tx, results) => {
            //             this.getMeds()
            //             this.setState({
            //                 addDrug: false,
            //                 name: "",
            //                 amount: 0
            //             })
            //         }
            //     )
            // })
        }
    }

    changeStores = medicine => {
        this.props.navigation.navigate("Change", {medicine})
    }

    render() {
        console.log(this.state.medicines)
        return (
            <View style={styles.screen}>
                <View style={{flex: 1}}>
                    <ScrollView>
                        {this.state.medicines.map(medicine => {
                            return (
                                <TouchableOpacity
                                    style={{flexDirection: 'row'}}
                                    key={medicine.id}
                                    onPress={() => this.changeStores(medicine)}
                                    style={styles.rowItem}
                                >
                                    <Text>{medicine.name}, Amount: {medicine.amount}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                </View>
                <View style={{flex: 1, justifyContent: 'space-evenly'}}>
                    <View style={styles.row}>
                        <Button title="Add Drug" onPress={() => this.addDrugHandler()}/>
                        <Button title="Submit" onPress={() => this.addDrug()} />
                    </View>
                    {this.state.addDrug && 
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <View style={styles.row}>
                                <Text>Name: </Text>
                                <TextInput
                                    value={this.state.name}
                                    onChangeText={name => this.nameHandler(name)}
                                    style={styles.textInput}
                                />
                            </View>
                            <View style={{margin: 10}}></View>
                            <View style={styles.row}>
                                <Text>Amount: </Text>
                                <TextInput
                                    value={(this.state.amount).toString()}
                                    onChangeText={amount => this.amountHandler(amount)}
                                    style={styles.textInput}
                                />
                            </View>
                        </View>
                    }
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#5effea'
    },
    rowItem: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5effea',
        borderWidth: 1,
        padding: 20
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
    }
})