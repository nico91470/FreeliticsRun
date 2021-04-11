import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'
import moment from 'moment'

const radius = 100

export default function Monitor({ distance, pace }) {

    const [duration, setDuration] = useState(0)
    const [formatedDuration, setFormatedDuration] = useState(null)

    useEffect(() => {
        let interval = null
        interval = setInterval(() => {
            setDuration(duration + 1)
            setFormatedDuration(moment.utc(duration * 1000).format('mm:ss'))
        }, 1000)

        return () => clearInterval(interval)

    }, [duration])

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{distance}</Text>
            <View style={styles.rows}>
                <View style={styles.rows}>
                    <Ionicons name='speedometer' color='white' size={28} />
                    <Text style={styles.label}>{pace}</Text>
                </View>
                <View style={styles.rows}>
                    <Feather name='clock' color='white' size={28} />
                    <Text style={styles.label}>{formatedDuration}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 72,
        color: 'white',
        textAlign: 'center'
    },
    container: {
        backgroundColor: '#29252b'
    },
    row: {
        flexDirection: 'row'
    },
    rows: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    label: {
        color: 'white',
        fontSize: 28,
        marginHorizontal: 10
    },
})
