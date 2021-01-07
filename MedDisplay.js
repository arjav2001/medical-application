import React from 'react'
import { View, Text } from 'react-native'

export default class MedDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            meds : props.meds,
            hideDetails : props.hideDetails ? true : false
        }
    }


    render() {
        return (
            <View>
                {this.state.meds.map(med => {
                    let trueMed = JSON.parse(med)
                    return (
                        <View>
                            <Text>{trueMed.medicine}</Text>
                            {!this.state.hideDetails &&
                                <View>
                                    <Text>Breakfast: {trueMed.breakfast}</Text>
                                    <Text>Lunch: {trueMed.lunch}</Text>
                                    <Text>Dinner: {trueMed.dinner}</Text>
                                    <Text>Days: {trueMed.days}</Text>
                                </View>
                            }
                        </View>
                    )
                })}
            </View>
        )
    }
}