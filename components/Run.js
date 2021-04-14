import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import MapView, { Marker, Polyline } from 'react-native-maps'
import * as Location from 'expo-location'
import * as Turf from '@turf/turf'

import Monitor from './Monitor'
import Pin from './Icons/Pin'
import MapSigns from './Icons/MapSigns'

export default function Run({ location }) {
    const [position, setPosition] = useState([])
    const [currentPosition, setCurrentPosition] = useState(null)
    const [distance, setDistance] = useState(0)
    const [pace, setPace] = useState(0)

    useEffect(() => {
        Location.watchPositionAsync(
            { enableHighAccuracy: true, timeInterval: 1000, distanceInterval: 1 },
            onPositionChange
        )

    }, [])

    const distanceBetween = (from, to) => {
        if (from != null && to != null) {
            const options = { units: 'meters' };
            const origin = Turf.point([from.coords.longitude, from.coords.latitude]);
            const destination = Turf.point([to.coords.longitude, to.coords.latitude]);
            return Math.round(Turf.distance(origin, destination, options))
        }
    }

    const onPositionChange = (item) => {
        if (item != null) {
            const tabs = position
            tabs.push(item)
            setPosition(tabs)
            setPace(Math.round((item.coords.speed * 3.6) * 10) / 10)
            setCurrentPosition(item)

            console.log('nb position: ', position.length)
            if (position.length > 2) {
                const lastPosition = position[position.length - 2]
                setDistance(distance + distanceBetween(lastPosition, position[0]))
            }
        }
    }

    return (
        <View style={styles.container}>
            <Monitor distance={distance} pace={pace} />
            <MapView
                provider='google'
                style={styles.map}
                initialRegion={{
                    latitude: currentPosition != null ? currentPosition.coords.latitude : 0,
                    longitude: currentPosition != null ? currentPosition.coords.longitude : 0,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001
                }}
                region={{
                    latitude: currentPosition != null ? currentPosition.coords.latitude : 0,
                    longitude: currentPosition != null ? currentPosition.coords.longitude : 0,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001
                }}
            >
                <Polyline
                    coordinates={position.map((pos) => pos.coords)}
                    strokeWidth={10}
                    strokeColor='#f2b659'
                />
                {
                    currentPosition &&
                    <Marker
                        coordinate={currentPosition.coords}
                        anchor={{ x: 0.5, y: 0.5 }}
                    >
                        <MapSigns />
                    </Marker>
                }
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        flex: 1
    }
})

Run.propTypes = {
    location: PropTypes.object.isRequired,
    distance: PropTypes.number.isRequired
}