"use client"

import '@radix-ui/themes/styles.css';
import Map from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import {LineLayer} from '@deck.gl/layers';
import { Flex, Button, Text, Box  } from '@radix-ui/themes';

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

export const Maps = () => {
  const layers = [
    new LineLayer({id: 'line-layer', data})
  ];

  return (
    <Box width={'100%'} height={'100%'}>
      <DeckGL 
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
      >
        <Map
          {...INITIAL_VIEW_STATE}
          mapboxAccessToken='pk.eyJ1IjoieXV5YWZ1amltb3RvIiwiYSI6ImNsbm5wNXVwMzA3Y3Iya3Ftd2c1MW92djkifQ.gJHn2MuzuWqhlTnVg018Eg'
          mapStyle="mapbox://styles/mapbox/dark-v11"
        />
      </DeckGL>
    </Box>
  )
}