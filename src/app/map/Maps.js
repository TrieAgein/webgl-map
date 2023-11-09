"use client"

import '@radix-ui/themes/styles.css';
import Map from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { Flex, Button, Text, Box  } from '@radix-ui/themes';
import { useState, useEffect } from 'react'
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

const NYCTree1995 = {
  id: 'NYCTree1995',
  displayName: '1995 Street Tree Census'
}

const NYCTree2015 = {
  id: 'NYCTree2015',
  displayName: '2015 Street Tree Census'
}
const LAActiveBusiness = {
  id: 'LAActiveBusiness',
  displayName: 'Active Business'
}

const LAMyLA311 = {
  id: 'LAMyLA311',
  displayName: 'MyLA311 Service Request'
}

const datasetOptions = {
  NYC: [NYCTree1995.displayName, NYCTree2015.displayName],
  LA: [LAActiveBusiness.displayName, LAMyLA311.displayName]
}

// const scatterplot = {
//   id:'scatterplot',
//   displayName: 'Scatterplot Visual'
// }

// const hexagon = {
//   id:'hexagon',
//   displayName: 'Hexagon Visual'
// }

// const visualOptions = {
//   scatterplot: [scatterplot.displayName],
//   hexagon: [hexagon.displayName]
// };

const laScatterLayer = (datasetId) => new ScatterplotLayer({
    id: 'scatterplot-layer',
    data: datasetId === LAActiveBusiness.id ? 'https://data.lacity.org/resource/6rrh-rzua.json?$limit=150000&$WHERE=within_box(location_1, 33.7035, -118.6682, 34.8233, -117.6464) AND location_1 IS NOT NULL' : 'https://data.lacity.org/resource/rq3b-xjk8.json',
    getPosition: datasetId === LAActiveBusiness.id ?  d => [ parseFloat(d.location_1.longitude),parseFloat(d.location_1.latitude)] : d => [ parseFloat(d.longitude),parseFloat(d.latitude)],
    getRadius: d => Math.sqrt(d.exits),
    pickable: true,
    opacity: 0.2,
    stroked: true,
    filled: true,
    radiusScale: 6,
    radiusMinPixels: 1,
    radiusMaxPixels: 100,
    lineWidthMinPixels: 1,
    getFillColor: d => [255, 240, 255],
    getLineColor: d => [255, 0, 0],
  })


const nycScatterLayer = (datasetId) => new ScatterplotLayer({
  id: 'scatterplot-layer',
  data: datasetId === NYCTree1995.id ? 'https://data.cityofnewyork.us/resource/kyad-zm4j.json' : 'https://data.cityofnewyork.us/resource/5rq2-4hqu.json?$limit=50000&boroname=Manhattan',
  getPosition: d => [ parseFloat(d.longitude),parseFloat(d.latitude)],
  getRadius: d => Math.sqrt(d.exits),
  pickable: true,
  opacity: 0.8,
  stroked: true,
  filled: true,
  radiusScale: 6,
  radiusMinPixels: 1,
  radiusMaxPixels: 100,
  lineWidthMinPixels: 1,
  getFillColor: d => [255, 140, 255],
  getLineColor: d => [255, 0, 0]
})

const laHexLayer = (datasetId) => new HexagonLayer({
  id: 'hexagon-layer',
  data: datasetId === LAActiveBusiness.id ? 'https://data.lacity.org/resource/6rrh-rzua.json?$limit=150000&$WHERE=within_box(location_1, 33.7035, -118.6682, 34.8233, -117.6464) AND location_1 IS NOT NULL' : 'https://data.lacity.org/resource/rq3b-xjk8.json',
  getPosition: datasetId === LAActiveBusiness.id ?  d => [ parseFloat(d.location_1.longitude),parseFloat(d.location_1.latitude)] : d => [ parseFloat(d.longitude),parseFloat(d.latitude)],
  getRadius: d => Math.sqrt(d.exits),
  pickable: true,
  extruded: true,
  radius: 100,
  elevationRange: [0, 100],
  elevationScale: 50
})

const nycHexLayer = (datasetId) => new HexagonLayer({
  id: 'hexagon-layer',
  data: datasetId === NYCTree1995.id ? 'https://data.cityofnewyork.us/resource/kyad-zm4j.json' : 'https://data.cityofnewyork.us/resource/5rq2-4hqu.json?$limit=50000&boroname=Manhattan',
  getPosition: d => [ parseFloat(d.longitude),parseFloat(d.latitude)],
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

const scatterLayers = {
  NYC: {
    [NYCTree1995.displayName]: nycScatterLayer(NYCTree1995.id),
    [NYCTree2015.displayName]: nycScatterLayer(NYCTree2015.id)
  },
  LA: {
    [LAActiveBusiness.displayName]: laScatterLayer(LAActiveBusiness.id),
    [LAMyLA311.displayName]: laScatterLayer(LAMyLA311.id)
  }
}

const hexLayers = {
  NYC: {
    [NYCTree1995.displayName]: nycHexLayer(NYCTree1995.id),
    [NYCTree2015.displayName]: nycHexLayer(NYCTree2015.id)
  },
  LA: {
    [LAActiveBusiness.displayName]: laHexLayer(LAActiveBusiness.id),
    [LAMyLA311.displayName]: laHexLayer(LAMyLA311.id)
  }
}

const getLayer = (visual, city, dataset) => {
  switch (visual) {
    case 'scatterplot':
      return(
        scatterLayers[city][dataset]
      )
    case 'hexagon':
      return(
        hexLayers[city][dataset]
      )
    default:
      return(
        null
      )
  }
}

// const layers = {
//   NYC: {
//     [NYCTree1995.displayName]: {
//       [scatterplot.displayName]: nycScatterLayer(NYCTree1995.id),
//       [hexagon.displayName]: nycHexLayer(NYCTree1995.id)
//     },
//     [NYCTree2015.displayName]: {
//       [scatterplot.displayName]: nycScatterLayer(NYCTree2015.id),
//       [hexagon.displayName]: nycHexLayer(NYCTree2015.id)
//     }
//   },
//   LA: {
//     [LAActiveBusiness.displayName]: {
//       [scatterplot.displayName]: laScatterLayer(LAActiveBusiness.id),
//       [hexagon.displayName]: laHexLayer(LAActiveBusiness.id)
//     },
//     [LAMyLA311.displayName]: {
//       [scatterplot.displayName]: laScatterLayer(LAMyLA311.id),
//       [hexagon.displayName]: laHexLayer(LAMyLA311.id)
//     }
//   }
// };

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
          //visualOptions={visualOptions}
          visualizationType={visualizationType}
          setVisualizationType={setVisualizationType}
        />
        <Map
          {...INITIAL_VIEW_STATE}
          mapboxAccessToken="pk.eyJ1IjoieXV5YWZ1amltb3RvIiwiYSI6ImNsbm5wNXVwMzA3Y3Iya3Ftd2c1MW92djkifQ.gJHn2MuzuWqhlTnVg018Eg"
          mapStyle="mapbox://styles/mapbox/dark-v11"
        />
      </DeckGL>
    </Box>
  );
};