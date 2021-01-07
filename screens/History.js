import React from 'react'
import {View, Text, Button, StyleSheet, ScrollView} from 'react-native'
import * as SQLite from 'expo-sqlite'
import { ListLogs } from '../ListLogs.js'
import { getHistory } from '../databaseStuff.js'

const db = SQLite.openDatabase('Registry.db')

export default class History extends React.Component {
    state = {
        id: this.props.route.params.id,
        history: null
    }

    async componentDidMount() {
        // db.transaction(tx => {
        //     tx.executeSql(
        //         "select * from Complaints where patient_id=?",
        //         [this.state.id],
        //         (tx, results) => {
        //             let history = results.rows._array
        //             this.setState({
        //                 history
        //             })
        //         }
        //     )
        // })
        const history = await getHistory(this.state.id)
        this.setState({history})
    }

    render() {
        return (
            <View style={styles.screen}>
                <Text style={styles.header}>Patient's ID: {this.state.id}</Text>
                {/* <Button title="Go Back"
                    onPress={() => this.props.navigation.navigate("Registration")}
                /> */}
                <View>
                    {this.state.history && <ListLogs history={this.state.history}
                        onPress={(log) => this.props.navigation.navigate("Log", {log})}
                    />}
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    screen: {
        backgroundColor: "#5effea",
        flex: 1,
        justifyContent: 'space-evenly'
    },
    header: {
        fontWeight: 'bold',
        fontSize: 20,
        alignSelf: 'center'
    }
})