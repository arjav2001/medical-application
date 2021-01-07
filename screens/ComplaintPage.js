import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Button from '../Button.js'
import { getComplaintByID } from '../databaseStuff.js'

export default class ComplaintPage extends React.Component {

    constructor(props) {
        super(props)
        const { complaint, patient } = this.props.route.params
        this.state = {
            id: complaint,
            complaint: null,
            patient
        }
    }

    async componentDidMount() {
        const complaint = await getComplaintByID(this.state.id)
        this.setState({complaint})
    }

    render() {
        console.log(this.state.complaint)
        return (
            <View style={styles.screen}>
                {this.state.complaint !== null &&
                    <View>
                        <Text>Patient's Name: {this.state.patient.name}</Text>
                        <Text>This ID: {this.state.patient.patient_id}</Text>
                        <Text>Complaint: {this.state.complaint.complaint}</Text>
                    </View>
                }
                {/* {(this.state.meds.length > 0 && 
                    <View>
                        <Text>Medicine Prescribed: </Text>
                        {this.state.meds.map(med => {
                            return (
                                <View>
                                    <Text>{med.medicine}</Text>
                                    <Text>      Breakfast: {med.breakfast}</Text>
                                    <Text>      Lunch: {med.lunch}</Text>
                                    <Text>      Dinner: {med.dinner}</Text>
                                    <Text>      Days: {med.days}</Text>
                                    <Text>      Total: {(parseInt(med.breakfast) + parseInt(med.lunch) + parseInt(med.dinner))*med.days} </Text>
                                </View>
                            )
                        })}
                    </View>
                )
                || <Text>No medicine has been prescribed yet.</Text>} */}
                <Button title="Go Back"
                    onPress={() => this.props.navigation.goBack()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#5effea',
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    }
})