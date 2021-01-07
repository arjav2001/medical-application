import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Button from '../Button.js'
import MedDisplay from '../MedDisplay.js'
import { getComplaintByID } from '../databaseStuff.js'

export default class Log extends React.Component {
    state = {
        log: this.props.route.params.log ? this.props.route.params.log : null,
        logId: this.props.route.params.logId ? this.props.route.params.logId : null
    }

    async componentDidMount() {
        if (this.state.logId !== null) {
            const log = await getComplaintByID(this.state.logId)
            console.log(log)
            this.setState({log})
        }
    }

    render() {
        //console.log(this.state.log)
        if (this.state.log) {
            return (
                <View style={styles.screen}>
                    <Text>Complaint: {this.state.log.complaint}</Text>
                    <View>
                        <Text>Medicine Prescribed: </Text>
                        <MedDisplay meds={this.state.log.meds} />
                    </View>
                    <Text>Diagnosis: {this.state.log.provd}</Text>
                    {this.state.log.labtest !== "NA" && <Text>Lab Tests: {this.state.log.labtest} </Text>}
                    {this.state.log.refer !== "NA" && <Text>Referred To: {this.state.log.refer} </Text>}
                    {/* <Button title="Go Back"
                        onPress={() => this.props.navigation.navigate("Registration")}
                    /> */}
                    <Button title="Go Back" onPress={() => this.props.navigation.goBack()}/>
                </View>
            )
        } else {
            return (
                <View></View>
            )
        }
    }
}

const styles= StyleSheet.create({
    screen: {
        backgroundColor: '#5effea',
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    }
})