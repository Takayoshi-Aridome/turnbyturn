//import React, { Component } from 'react';
//import { Platform, PermissionsAndroid } from 'react-native';

export default class Directions {

  static async routeRequests(origin, destination) {
    let url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=AIzaSyAW28155WiKQTyepSQxwI6-QlmKNs9UsRg&language=ja`;

    return fetch(url)
    .then((response) => response.json())
    .then((responseJSON) => {
      console.log('_route :', responseJSON);
      return {
        geocoded_waypoints: responseJSON.geocoded_waypoints,
        routes: responseJSON.routes,
        status: responseJSON.status,
      };
    })
    .catch((error) => {
      console.error(error);
    });
  }
}
