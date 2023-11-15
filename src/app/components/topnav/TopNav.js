import { Flex, Text } from '@radix-ui/themes';
import { SelectComp } from '../select'
import { useEffect } from 'react'

export const TopNav = ({
    city,
    setCity,
    dataset,
    datasetOptions,
    setDataset,
    visualOptions,
    visualizationType,
    setVisualizationType
}) => {

    useEffect(() => {
        // Set the initial value for the dataset based on datasetOptions
        if (datasetOptions.length > 0) {
          setDataset(datasetOptions[0]);
        }
      }, [city, datasetOptions, setDataset]);
    
    return (
        <Flex
          direction="row"
          align="center"
          justify="between"
          width={'100%'}
          style={{ backgroundColor: 'purple', height: 60, borderBottomWidth: 1, borderColor: 'gray' }}
        >
          <Text size="3" weight="bold" ml="3">
            WebGL Visualization App
          </Text>
          <Flex direction="row">
            <Text style={{ padding: 5 }}>Select Your Dataset:</Text>
            <SelectComp
              options={['LA', 'NYC']}
              title="Cities"
              defaultValue="LA"
              value={city}
              onChange={setCity}
            />
            <SelectComp
              options={['Scatterplot', 'Hexagon']}
              title="Visual"
              defaultValue="Scatterplot"
              value={visualizationType}
              onChange={setVisualizationType}
            />
            <SelectComp
              options={datasetOptions}
              title="Dataset"
              value={dataset}
              onChange={setDataset}
            />
          </Flex>
        </Flex>
      );
};
