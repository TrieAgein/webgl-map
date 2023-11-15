"use client";
import { Select } from "@radix-ui/themes";
import React from "react";

export const SelectComp = ({ options, title, value, onChange }) => {
  if (!Array.isArray(options)) {
    options = [];
  }

  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger color="indigo" variant="soft" mr="2" />
      <Select.Content color="indigo">
        <Select.Group>
          <Select.Label>{title}</Select.Label>
          {options.map((option) => (
            <Select.Item key={option} value={option}>
              {option}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};
