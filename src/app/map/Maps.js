"use client"

import '@radix-ui/themes/styles.css';
import Map from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { Flex, Button, Text, Box  } from '@radix-ui/themes';
import { useState } from 'react'
import { TopNav } from '../topnav';
import { ScatterplotLayer} from '@deck.gl/layers';
import { HexagonLayer } from '@deck.gl/aggregation-layers';

const INITIAL_VIEW_STATE = {
    longitude: -122.41669,
    latitude: 37.7853,
    zoom: 13,
    pitch: 0,
    bearing: 0,
    maxBounds: [
      [-125, 35],
      [-120, 40],
    ],
  };
  
const data = [
    {sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}
]

// const laScatterLayer = () => new ScatterplotLayer({
//     id: 'scatterplot-layer',
//     data: 'https://data.lacity.org/resource/6rrh-rzua.json?$limit=150000&$WHERE=within_box(location_1, 33.7035, -118.6682, 34.8233, -117.6464) AND location_1 IS NOT NULL',
//     getPosition: d => [ parseFloat(d.location_1.longitude),parseFloat(d.location_1.latitude)],
//     getRadius: d => Math.sqrt(d.exits),
//     pickable: true,
//     opacity: 0.2,
//     stroked: true,
//     filled: true,
//     radiusScale: 6,
//     radiusMinPixels: 1,
//     radiusMaxPixels: 100,
//     lineWidthMinPixels: 1,
//     getFillColor: d => [255, 240, 255],
//     getLineColor: d => [255, 0, 0],
//   })


// const nycScatterLayer = () => new ScatterplotLayer({
//   id: 'scatterplot-layer',
//   data: 'https://data.cityofnewyork.us/resource/5rq2-4hqu.json?$limit=50000&boroname=Manhattan',
//   getPosition: d => [ parseFloat(d.longitude),parseFloat(d.latitude)],
//   getRadius: d => Math.sqrt(d.exits),
//   pickable: true,
//   opacity: 0.8,
//   stroked: true,
//   filled: true,
//   radiusScale: 6,
//   radiusMinPixels: 1,
//   radiusMaxPixels: 100,
//   lineWidthMinPixels: 1,
//   getFillColor: d => [255, 140, 255],
//   getLineColor: d => [255, 0, 0]
// })

const laHexLayer = () => new HexagonLayer({
  id: 'hexagon-layer',
  data: 'https://data.lacity.org/resource/6rrh-rzua.json?$limit=150000&$WHERE=within_box(location_1, 33.7035, -118.6682, 34.8233, -117.6464) AND location_1 IS NOT NULL',
  getPosition: d => [ parseFloat(d.location_1.longitude),parseFloat(d.location_1.latitude)],
  getRadius: d => Math.sqrt(d.exits),
  pickable: true,
  pickable: true,
  extruded: true,
  radius: 100,
  elevationRange: [0, 100],
  elevationScale: 50
})

const nycHexLayer = () => new HexagonLayer({
  id: 'hexagon-layer',
  data: 'https://data.cityofnewyork.us/resource/5rq2-4hqu.json?$limit=50000&boroname=Manhattan',
  getPosition: d => [ parseFloat(d.location_1.longitude),parseFloat(d.location_1.latitude)],
  pickable: true,
  extruded: true,
  radius: 100,
  elevationRange: [0, 100],
  elevationScale: 50,
})

const getLocation = (city) => {
  switch (city) {
    case 'LA':
      return {
        latitude: 34.137197, 
        longitude: -118.347238,
        zoom: 13,
        pitch: 0,
        bearing: 0
      }
    case 'NYC':
      return {
        latitude: 40.712776, 
        longitude: -74.005974,
        zoom: 13,
        pitch: 0,
        bearing: 0
      }
    default:
      return {
        latitude: 40.712776, 
        longitude: -74.005974,
        zoom: 13,
        pitch: 0,
        bearing: 0
      }
  }
}

const getLayer = (city) => {
  switch (city){
    case "LA":
      return(
        laLayer()
      )
    case "NYC":
      return(
        nycLayer()
      )
  }
}

export const Maps = () => {
  const [city, setCity] = useState('NYC')
  const [dataset, setDataset] = useState('traffic')

  const location = getLocation(city)

  return (
    <Box width={'100%'} height={'100%'}>
      <DeckGL 
        initialViewState={location}
        controller={true}
        layers={laHexLayer()}
      >
        <TopNav
          city={city}
          setCity={setCity}
          dataset={dataset}
          setDataset={setDataset}
        />
        <Map
          {...INITIAL_VIEW_STATE}
          mapboxAccessToken='pk.eyJ1IjoieXV5YWZ1amltb3RvIiwiYSI6ImNsbm5wNXVwMzA3Y3Iya3Ftd2c1MW92djkifQ.gJHn2MuzuWqhlTnVg018Eg'
          mapStyle="mapbox://styles/mapbox/dark-v11"
        />
      </DeckGL>
    </Box>
  )
}