/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MapView from 'react-native-maps';
import Directions from 'react-native-maps-directions';

const directionsAPI ='AIzaSyA98lgVgXep3eAhAmuUTUyNyHEHbwySbQs';

const coordinates = [
  {
    latitude: 35.694125,
    longitude: 139.690486,
  },
  {
    latitude: 35.689179,
    longitude: 139.701038,
  },
];

export default class App extends React.Component {
  render() {
    const { region } = this.props;
    console.log(region);

    let _region = {
      latitude: (coordinates[0].latitude+coordinates[1].latitude)/2,
      longitude: (coordinates[0].longitude+coordinates[1].longitude)/2,
      latitudeDelta: 0.025,
      longitudeDelta: 0.02,
    };

    return (
      <View style ={styles.container}>
        <MapView
          provider={'google'}
          style={styles.map}
          initialRegion={_region}
        >
          <MapView.Marker
            title="新宿オークタワー"
            description="25F"
            coordinate={coordinates[0]}
          />
          <MapView.Marker
            title="新宿駅"
            description="東口"
            coordinate={coordinates[1]}
          />
          <Directions
            origin={coordinates[0]}
            destination={coordinates[1]}
            apikey={directionsAPI}
            strokeWidth={5}
            strokeColor="hotpink"
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    //height: 400,
    //width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
