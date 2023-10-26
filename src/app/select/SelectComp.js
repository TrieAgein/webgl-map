'use client'
import { Select } from '@radix-ui/themes';

export const SelectComp = ({options, title, defaultValue, value, onChange}) => {
    return(
        <Select.Root defaultValue={defaultValue}  value={value} onValueChange={onChange}>
            <Select.Trigger color="indigo" variant="soft" mr="2" />
            <Select.Content color="indigo">
                <Select.Group>
                    <Select.Label>{title}</Select.Label>
                    {options.map((option) => {
                        return(
                            <Select.Item value={option}>{option}</Select.Item>
                        )
                    })}
                </Select.Group>
            </Select.Content>
            </Select.Root>
    )
}