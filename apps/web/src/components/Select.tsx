import { ChevronDownIcon, X } from 'lucide-react'
import Select, {
  ClearIndicatorProps,
  components,
  DropdownIndicatorProps,
  MultiValueRemoveProps,
  Props,
} from 'react-select'

import { cn } from '@/lib/utils'

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDownIcon />
    </components.DropdownIndicator>
  )
}

const ClearIndicator = (props: ClearIndicatorProps) => {
  return (
    <components.ClearIndicator {...props}>
      <X />
    </components.ClearIndicator>
  )
}

const MultiValueRemove = (props: MultiValueRemoveProps) => {
  return (
    <components.MultiValueRemove {...props}>
      <X />
    </components.MultiValueRemove>
  )
}

const controlStyles = {
  base: 'border rounded-lg bg-background hover:cursor-pointer',
  focus: 'ring-2 ring-ring',
  nonFocus: 'border-input hover:border-gray-400',
}
const placeholderStyles = 'text-gray-500 pl-1 py-0.5'
const selectInputStyles = 'pl-1 py-0.5 w-full'
const valueContainerStyles = 'p-1 gap-1'
const singleValueStyles = 'leading-7 ml-1'
const multiValueStyles =
  'bg-gray-100 dark:bg-zinc-700 rounded items-center py-0.5 pl-2 pr-1 gap-1.5'
const multiValueLabelStyles = 'leading-6 py-0.5'
const multiValueRemoveStyles =
  'border border-gray-200 bg-white dark:bg-zinc-300 hover:bg-red-50 hover:text-red-800 text-gray-500 hover:border-red-300 rounded-md'
const indicatorsContainerStyles = 'p-1 gap-1'
const clearIndicatorStyles =
  'text-gray-500 p-1 rounded-md hover:bg-red-50 hover:text-red-800'
const indicatorSeparatorStyles = 'bg-gray-300'
const dropdownIndicatorStyles =
  'p-1 hover:bg-zinc-800 text-gray-500 rounded-md hover:text-black'
const menuStyles = 'p-1 mt-2 border border-border bg-background rounded-lg'
const groupHeadingStyles = 'ml-3 mt-2 mb-1 text-gray-500 text-sm'
const optionStyles = {
  base: 'hover:cursor-pointer px-3 py-2 rounded',
  focus: 'bg-gray-100 dark:bg-zinc-700 active:bg-gray-200',
  selected:
    "after:content-['✔'] after:ml-2 after:text-green-500 text-gray-500",
}
const noOptionsMessageStyles =
  'text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm'

export const ReactSelect = (props: Props) => (
  <Select
    closeMenuOnSelect={false}
    hideSelectedOptions={false}
    unstyled
    styles={{
      input: (base) => ({
        ...base,
        'input:focus': {
          boxShadow: 'none',
        },
      }),
      // On mobile, the label will truncate automatically, so we want to
      // override that behaviour.
      multiValueLabel: (base) => ({
        ...base,
        whiteSpace: 'normal',
        overflow: 'visible',
      }),
      control: (base) => ({
        ...base,
        transition: 'none',
      }),
    }}
    components={{ DropdownIndicator, ClearIndicator, MultiValueRemove }}
    classNames={{
      control: ({ isFocused }) =>
        cn(
          isFocused ? controlStyles.focus : controlStyles.nonFocus,
          controlStyles.base,
        ),
      placeholder: () => placeholderStyles,
      input: () => selectInputStyles,
      valueContainer: () => valueContainerStyles,
      singleValue: () => singleValueStyles,
      multiValue: () => multiValueStyles,
      multiValueLabel: () => multiValueLabelStyles,
      multiValueRemove: () => multiValueRemoveStyles,
      indicatorsContainer: () => indicatorsContainerStyles,
      clearIndicator: () => clearIndicatorStyles,
      indicatorSeparator: () => indicatorSeparatorStyles,
      dropdownIndicator: () => dropdownIndicatorStyles,
      menu: () => menuStyles,
      groupHeading: () => groupHeadingStyles,
      option: ({ isFocused, isSelected }) =>
        cn(
          isFocused && optionStyles.focus,
          isSelected && optionStyles.selected,
          optionStyles.base,
        ),
      noOptionsMessage: () => noOptionsMessageStyles,
    }}
    {...props}
  />
)
