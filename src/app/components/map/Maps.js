"use client"

import '@radix-ui/themes/styles.css';
import Map from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { Flex, Button, Text, Box  } from '@radix-ui/themes';
import { useState, useEffect } from 'react'
import { TopNav } from '../topnav';
import { getLocation } from '@/app/utilities/locations';
import { getLayer } from '@/app/utilities/layers';
import { datasetOptions } from '@/app/utilities/datasets';


export const Maps = () => {
  const [city, setCity] = useState('NYC');
  const [dataset, setDataset] = useState('');
  const [visualizationType, setVisualizationType] = useState('');

  const location = getLocation(city);
  console.log('City:', city);
  console.log('Dataset:', dataset);
  console.log('Visualization Type:', visualizationType);

  return (
    <Box width={'100%'} height={'100%'}>
      <DeckGL initialViewState={location} controller={true} layers={getLayer(visualizationType, city, dataset)}>
        <TopNav
          city={city}
          setCity={setCity}
          datasetOptions={datasetOptions[city]}
          dataset={dataset}
          setDataset={setDataset}
          visualizationType={visualizationType}
          setVisualizationType={setVisualizationType}
        />
        <Map
          mapboxAccessToken="pk.eyJ1IjoieXV5YWZ1amltb3RvIiwiYSI6ImNsbm5wNXVwMzA3Y3Iya3Ftd2c1MW92djkifQ.gJHn2MuzuWqhlTnVg018Eg"
          mapStyle="mapbox://styles/mapbox/dark-v11"
        />
      </DeckGL>
    </Box>
  );
};