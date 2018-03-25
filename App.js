import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import Directions from 'react-native-maps-directions';
import Gps from './src/utils/Gps';

const directionsAPI ='AIzaSyA98lgVgXep3eAhAmuUTUyNyHEHbwySbQs';
//0:新宿オークタワー 1:新宿駅　デバッグ時のダミーデータ
const coordinates = [{ latitude: 35.694125, longitude: 139.690486,}, { latitude: 35.689179, longitude: 139.701038,},];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { delta: { latitude: 0.025, longitude: 0.02,}, startPoint: null, endPoint: null,};
    this._setCoords();
  }

  async _setCoords() {
    try {
      let _gps = new Gps();
      _gps.position = await _gps.getCurrentPosition(5000);
      this.setState({
        //現在地
        startPoint: { latitude: _gps.position.coords.latitude, longitude: _gps.position.coords.longitude,},
        //新宿駅
        endPoint: { latitude: 35.689179, longitude: 139.701038,},
      });
    } catch(event) {
      console.log(event.message);
    }
  }

  render() {
    if(this.state.startPoint == null) {
      return (
        <View style ={styles.container}>
        <Text>Now loading...</Text>
        </View>
      );
    } else {
      return (
        <View style ={styles.container}>
          <MapView
            provider={'google'}
            style={styles.map}
            initialRegion={{
              latitude: this.state.startPoint.latitude,
              longitude: this.state.startPoint.longitude,
              latitudeDelta: this.state.delta.latitude,
              longitudeDelta: this.state.delta.longitude
            }}
          >
            <MapView.Marker
              title="出発地点"
              description="現在地"
              coordinate={this.state.startPoint}
            />
            <MapView.Marker
             title="目的地"
             description="新宿駅"
             coordinate={this.state.endPoint}
           />
           <Directions
             origin={this.state.startPoint}
             destination={this.state.endPoint}
             apikey={directionsAPI}
             strokeWidth={5}
             strokeColor="hotpink"
           />
          </MapView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
