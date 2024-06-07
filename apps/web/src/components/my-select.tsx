/* eslint-disable @typescript-eslint/no-explicit-any */

import { GroupBase, OptionsOrGroups } from 'react-select'

import { ReactSelect } from './Select'

interface MySelectProps<Option, Group extends GroupBase<Option>> {
  options: OptionsOrGroups<Option, Group>

  value: string[] | string | null | undefined

  onChange: (value: string[] | string | null) => void

  disabled?: boolean

  isMulti?: boolean

  className?: string

  placeholder?: string
}

export function MySelect({
  options,
  value,
  onChange,
  disabled,
  isMulti,
  className,
  placeholder,
}: MySelectProps<any, any>) {
  return (
    <ReactSelect
      className={className}
      defaultValue={options.filter((option) => value?.includes(option.value))}
      value={options.filter((option) => value?.includes(option.value))}
      onChange={(v: any) => {
        // console.log(v); // eslint-disable-line no-console

        isMulti ? onChange(v.map((vv: any) => vv.value)) : onChange(v.value)
      }}
      options={options}
      isDisabled={disabled}
      closeMenuOnSelect
      isMulti={isMulti}
      placeholder={placeholder ?? 'Select...'}
    />
  )
}
