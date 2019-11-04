// map.js
Page({
  data: {
    markers: [{
      iconPath: "/image/location.png",
      id: 0,
      latitude: 38.0049054859,
      longitude: 114.4558448538,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 114.4558448538,
        latitude: 38.0049054859
      }, {
        longitude: 114.4558448538,
        latitude: 38.0049054859
      }],
      color:"#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '/image/location.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  }
})