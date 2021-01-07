import React from 'react'
import {View, Text, Button, ScrollView} from 'react-native'
import { Log } from './Log.js'

export class ListLogs extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: props.history
        }
    }

    render() {
        //console.log(this.state.history)
        return (
            <ScrollView>
                {this.state.history.map(log => {
                    return (
                        <Log key={log.complaint_id} log={log} onPress={(thisLog) => this.props.onPress(thisLog)}/>
                    )
                })}
            </ScrollView>
        )
    }
}