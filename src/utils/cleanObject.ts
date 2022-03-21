import { cloneDeep, forOwn, isEmpty, isObject, isString } from 'lodash';

/**
 * Helper function to convert all empty strings to null
 * in a nested object. This is a workaround to handle AppSync's
 * inability to support empty strings with DynamoDB.
 * @param obj - object to have falsy values removed.
 */
export function cleanObject<T extends { [key: string]: any }>(obj: T) {
  const cloneObj = cloneDeep(obj); // Clone original object
  const pruneNested = (obj: T) => {
    forOwn(obj, (value, key) => {
      if ((isString(value) && isEmpty(value)) || (isObject(value) && isEmpty(pruneNested(value)))) {
        // See https://github.com/microsoft/TypeScript/issues/32704
        // @ts-ignore: Type 'string' cannot be used to index type 'T'
        obj[key] = null;
      }
    });
    return obj;
  };
  return pruneNested(cloneObj);
}
