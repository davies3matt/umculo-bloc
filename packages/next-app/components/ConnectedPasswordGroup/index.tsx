/* istanbul ignore file */
import {
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  Text
} from '@chakra-ui/react'
import { useField } from 'formik'
import * as React from 'react'
import { Eye, EyeOff } from 'react-feather'
import { LabelProps } from "../../types";

export type ConnectedPasswordGroupProps = LabelProps &
  InputProps & {
    label?: string
    name: string
  }

const ConnectedPasswordGroup: React.FC<ConnectedPasswordGroupProps> = ({
  label,
  type,
  ...rest
}) => {
  const [field, meta] = useField(rest.name)
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  return (
    <Flex flexDirection="column" width="100%" mr={rest.mr} ml={rest.ml} mt={rest.mt} mb={rest.mb}>
      <FormControl>
        {label && (
          <FormLabel htmlFor={field.name} fontWeight="normal" fontSize={14}>
            {label}
          </FormLabel>
        )}
        <InputGroup size="md">
          <Input
            bgColor="white"
            border="1px solid black"
            color="black"
            _placeholder={{ color: 'neutral.100' }}
            _focus={{ bgColor: 'white', border: 'none' }}
            type={show ? 'text' : type}
            {...field}
            {...rest}
            id={field.name}
            {...rest}
          />
          <InputRightElement>
            <Icon color="black" size="20px" onClick={handleClick} as={show ? EyeOff : Eye} />
          </InputRightElement>
        </InputGroup>
        {meta.touched && meta.error ? (
          <Text fontSize="10px" color="red.500" textAlign="right">
            {meta.error}
          </Text>
        ) : null}
      </FormControl>
    </Flex>
  )
}

export default ConnectedPasswordGroup

ConnectedPasswordGroup.defaultProps = {
  mb: 2,
  type: 'password'
}
