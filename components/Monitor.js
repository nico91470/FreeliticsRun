import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

export default function Monitor({ distance, pace }) {

    const [duration, setDuration] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setDuration(duration + 1)
        }, 1000)
    }, duration)

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{distance}</Text>
            <View style={styles.row}>
                <View>
                    <Feather name='watch' color='white' />
                    <Text>{pace}</Text>
                </View>
                <View>
                    <Feather name='clock' color='white' />
                    <Text>{duration}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 72,
        color: 'white'
    },
    container: {
        height: 380,
        backgroundColor: '#29252b'
    },
    row: {
        flexDirection: 'row'
    }
})
