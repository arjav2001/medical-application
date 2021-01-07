import React from 'react'
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native'

export default class Button extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: props.title,
            onPress: props.onPress,
            style: props.style
        }
    }

    render () {
        return (
            <TouchableOpacity style={this.props.style? this.props.style : styles.button} onPress={() => this.state.onPress()}>
                <Text style={{color: 'white'}}>{this.state.title.toUpperCase()}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        borderColor: 'black',
        borderWidth: 1,
        alignSelf: 'center',
        backgroundColor: 'blue',
        padding: 10
    }
})