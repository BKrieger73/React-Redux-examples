import React, { Component } from 'react';

class GoogleMap extends Component{
  componentDidMount(){
    var latlng = { lat: this.props.lat, lng:this.props.lon }
    var map = new google.maps.Map(this.refs.map, {
      zoom: 12,
      center: latlng
    });

    var marker = new google.maps.Marker({
         position: latlng,
         map: map,
         title: this.props.name
       });
  }

  render(){
    return <div ref="map" />;
  }
}

export default GoogleMap;
