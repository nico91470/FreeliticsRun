import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import MapView, { Marker, Polyline } from 'react-native-maps'
import * as Location from 'expo-location'
import * as Turf from '@turf/turf'

import Monitor from './Monitor'

export default function Run({ location }) {
    const [position, setPosition] = useState([])
    const [currentPosition, setCurrentPosition] = useState(null)
    const [distance, setDistance] = useState(0)

    useEffect(() => {
        Location.watchPositionAsync(
            { enableHighAccuracy: true, timeInterval: 1000, distanceInterval: 1 },
            onPositionChange
        )

        if (position.length > 2) {
            const lastPosition = position[position.length - 2]
            setDistance(distance + distanceBetween(lastPosition, currentPosition))
        }

    }, [])

    const distanceBetween = (from, to) => {
        return Turf.distance(from.coords, to.coords)
    }

    const onPositionChange = (item) => {
        const tabs = position
        tabs.push(item)
        setPosition(tabs)
        setCurrentPosition(item)
    }

    return (
        <View style={styles.container}>
            <Monitor distance={distance} />
            <MapView
                provider='google'
                style={styles.map}
                initialRegion={{
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
                    />
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