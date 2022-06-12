import jwtDecode from "jwt-decode"
import { Area } from "../generated/graphql"
import {
  FRUIT_TYPES,
  MEAT_TYPES,
  MILK_TYPES,
  VEGETABLE_TYPES,
} from "./constants"

// format to south african international mobile number
export const formatPhoneNumber = (phoneNum: any) => {
  if (
    (phoneNum.substring(0, 3) === "+27" && phoneNum.length !== 13) ||
    (phoneNum[0] === "0" && phoneNum.length !== 10)
  ) {
    return phoneNum
  }
  if (phoneNum[0] === "0") {
    let phoneArray = phoneNum.split("")
    phoneArray.splice(0, 1, "+27")
    phoneNum = phoneArray.join("")
  }
  return phoneNum
}

/**
 * helper method to validate  user token
 *
 * @param {*} token
 * @returns {boolean}
 */
export const validateToken = (token: any): boolean => {
  if (!token) {
    return false
  }
  try {
    // @ts-ignore
    const decodedJwt: any = jwtDecode(token)
    return decodedJwt.exp >= Date.now() / 1000
  } catch (e) {
    return false
  }
}

/**
 * Description: Formats out _ from enum labels.
 *
 * @param  {string} label
 * @returns string
 */
export const formatEnums = (label: string): string => label.replace(/_/g, " ")

/**
 * helper function for formatting words into title case
 *
 * @param {string} text
 * @returns {string}
 */
export const toTitleCase = (str: string) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

/**
 * helper function that returns a randomly generated hexcode
 *
 * @returns {string}
 */
export const randomHexCode = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`
}

/**
 * helper function that returns a list of possible options based on selected area
 *
 * @param {Area} area
 * @returns {string}
 */
export const getAreaSelectOptions = (area: Area) => {
  const mapCategoryType = (list: string[]) => {
    return list.map((item, index) => {
      return {
        id: index,
        name: toTitleCase(item),
      }
    })
  }
  switch (area) {
    case Area.Drinks:
      return mapCategoryType(MILK_TYPES)
    case Area.Food:
      return mapCategoryType([
        ...VEGETABLE_TYPES,
        ...MEAT_TYPES,
        ...FRUIT_TYPES,
      ])
    case Area.Drinks:
      return mapCategoryType(MILK_TYPES)
    default:
      return []
  }
}

/** ----------------------------------------------------------------------------------------- */
/** ----------------------------------------------------------------------------------------- */
/** ---------------------------------- TODO ------------------------------------------------- */
/** ----------------------------------------------------------------------------------------- */
/** ----------------------------------------------------------------------------------------- */
/**
 *
 * helper function for turning an array of enums into an array of strings based on the enum
 */
