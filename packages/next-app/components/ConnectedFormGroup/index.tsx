import * as React from 'react'
import { Flex, FormControl, FormLabel, Input, StyleProps, InputProps, Text } from '@chakra-ui/react'
import { useField } from 'formik'
import { LabelProps} from "../../types";

export type ConnectedFormGroupProps = InputProps &
  LabelProps &
  StyleProps & {
    placeholder?: string
    label?: string | React.ReactNode
    name: string
    formatInput?: (value: string) => string
    moreInfo?: string | JSX.Element
    bgColor?: string
    handleChange?: (value?: string) => void
    onBlur?: () => void
    disabled?: boolean
    type?: string
    testId?: string
  }

const ConnectedFormGroup: React.FC<ConnectedFormGroupProps> = ({
  label,
  moreInfo,
  formatInput,
  placeholder,
  testId,
  ...rest
}) => {
  const [field, meta] = useField(rest.name)
  return (
    <Flex flexDirection="column" width="100%" mr={rest.mr} ml={rest.ml} mt={rest.mt} mb={rest.mb}>
      <FormControl>
        {(label || moreInfo) && (
          <FormLabel mb={1} width="100%" fontWeight="normal" fontSize={14} htmlFor={field.name}>
            <Flex justifyContent="space-between" alignItems="center" mb={moreInfo ? 1 : 0}>
              {label} {moreInfo}
            </Flex>
          </FormLabel>
        )}
        <Input
          type={rest?.type || 'text'}
          id={field.name}
          bgColor="white"
          color="black"
          border="1px solid black"
          value={formatInput ? formatInput(field.value) : field.value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value
            field.onChange(e)
            rest.handleChange && rest.handleChange(value)
          }}
          onBlur={field.onBlur} // update the touched on individual input
          _placeholder={{ color: '#DCDCDB' }}
          placeholder={placeholder}
          disabled={rest.disabled}
          data-testid={testId}
        />
        {meta.touched && meta.error ? (
          <Text fontSize="10px" color="red.500" textAlign="left">
            {meta.error}
          </Text>
        ) : null}
      </FormControl>
    </Flex>
  )
}

export default ConnectedFormGroup

ConnectedFormGroup.defaultProps = {
  mb: 2,
  bgColor: 'brand.50'
}
