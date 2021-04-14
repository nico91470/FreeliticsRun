import interpolate from '@turf/interpolate'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Animated, View } from 'react-native'

export default function Pin() {

    const scale = new Animated.Value(0)

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scale, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: false
                }),
                Animated.timing(scale, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: false
                })
            ]),
            { iterations: 1000 }
        ).start()
    }, [])

    return (
        <View style={styles.outerPin}>
            <View style={styles.pin}>
                <Animated.View style={[styles.innerPin, { transform: [{ scale }] }]} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    outerPin: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#f2b65925',
        justifyContent: 'center',
        alignItems: 'center'
    },
    pin: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerPin: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#f2b659',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
