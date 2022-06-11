import styled from '@emotion/styled'
import {
  color,
  ColorProps,
  fontSize,
  FontSizeProps,
  fontWeight,
  FontWeightProps,
  space,
  SpaceProps,
  textAlign,
  TextAlignProps
} from 'styled-system'

export type ObjectMap<T> = { [key: string]: T }

export type Maybe<T> = T | null

export type LoginDetails = {
  username: string
  password: string
}

export type AuthData = {
  token: string
  username: string
}

export type LabelProps = SpaceProps &
  ColorProps &
  TextAlignProps &
  FontSizeProps &
  FontWeightProps & { color?: string }

export type UserStorage = { auth: AuthData; data: any }
