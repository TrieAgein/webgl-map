import { Flex, Text } from '@radix-ui/themes';
import { SelectComp } from '../select'

export const TopNav = ({
    city,
    setCity,
    dataset,
    setDataset
}) => {
    return(
        <Flex direction="row" align="center" justify="between" width={'100%'} style={{backgroundColor: 'purple', height: 60, borderBottomWidth: 1, borderColor: 'gray'}}>
            <Text size="3" weight="bold" ml="3">WebGL Visualization App</Text>
            <Flex direction="row">
                <Text style={{padding:5}}>Select Your Dataset:</Text>
                <SelectComp options={['LA', 'NYC']} title="Cities" defaultValue="LA" value={city} onChange={setCity} />
                <SelectComp options={['Tree', 'Active Businesses']} title="Dataset" defaultValue="Tree" value={dataset} onChange={setDataset} />
            </Flex>
        </Flex>
    )
}