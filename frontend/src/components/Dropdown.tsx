import React from "react";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectGroup, SelectItem } from "../components/ui/select";
import { Label } from "../components/ui/label";

interface SelectOption {
  value: string;
  label: string;
}

interface DropdownProps {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ label, value = "", onChange, options, placeholder = '---' }) => {
  return (
    <div className="flex-1 space-y-1">
      <Label htmlFor="select-input">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} id="select-input" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Dropdown;