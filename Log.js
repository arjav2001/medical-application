import React from 'react'
import {View, Text, Button, ScrollView, TouchableOpacity, StyleSheet} from 'react-native'
import { log } from 'react-native-reanimated'

export class Log extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            log: props.log
        }
    }

    render() {
        return (
            <TouchableOpacity style={styles.listItem} onPress={() => {this.props.onPress(this.state.log)}}>
                <Text>{this.state.log.created_on.substring(0, 10)}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    listItem: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#5effea',
      borderWidth: 1,
      padding: 20
    }
});