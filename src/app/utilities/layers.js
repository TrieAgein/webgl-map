import { ScatterplotLayer} from '@deck.gl/layers';
import { HexagonLayer } from '@deck.gl/aggregation-layers';

import {
    NYCTree1995,
    NYCTree2015,
    LAActiveBusiness,
    LAMyLA311,
  } from "./datasets";

export const laScatterLayer = (datasetId) => new ScatterplotLayer({
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


export const nycScatterLayer = (datasetId) => new ScatterplotLayer({
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

export const laHexLayer = (datasetId) => new HexagonLayer({
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

export const nycHexLayer = (datasetId) => new HexagonLayer({
  id: 'hexagon-layer',
  data: datasetId === NYCTree1995.id ? 'https://data.cityofnewyork.us/resource/kyad-zm4j.json' : 'https://data.cityofnewyork.us/resource/5rq2-4hqu.json?$limit=50000&boroname=Manhattan',
  getPosition: d => [ parseFloat(d.longitude),parseFloat(d.latitude)],
  pickable: true,
  extruded: true,
  radius: 100,
  elevationRange: [0, 100],
  elevationScale: 50,
})

export const scatterLayers = {
    NYC: {
      [NYCTree1995.displayName]: nycScatterLayer(NYCTree1995.id),
      [NYCTree2015.displayName]: nycScatterLayer(NYCTree2015.id)
    },
    LA: {
      [LAActiveBusiness.displayName]: laScatterLayer(LAActiveBusiness.id),
      [LAMyLA311.displayName]: laScatterLayer(LAMyLA311.id)
    }
}
  
export const hexLayers = {
    NYC: {
      [NYCTree1995.displayName]: nycHexLayer(NYCTree1995.id),
      [NYCTree2015.displayName]: nycHexLayer(NYCTree2015.id)
    },
    LA: {
      [LAActiveBusiness.displayName]: laHexLayer(LAActiveBusiness.id),
      [LAMyLA311.displayName]: laHexLayer(LAMyLA311.id)
    }
}
  
export const getLayer = (visual, city, dataset) => {
    switch (visual) {
      case 'Scatterplot':
        return(
          scatterLayers[city][dataset]
        )
      case 'Hexagon':
        return(
          hexLayers[city][dataset]
        )
      default:
        return(
          null
        )
    }
}
  