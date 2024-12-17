// utils/AsyncStorage.ts

import AsyncStorage from "@react-native-async-storage/async-storage";

// Type for any serializable data
export type StorageValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | object
  | Array<any>;

// Error handling type
interface StorageError extends Error {
  code?: string;
}

export const setItem = async (
  key: string,
  value: StorageValue
): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting item:", error as StorageError);
  }
};

export const getItem = async <T extends StorageValue>(
  key: string
): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? (JSON.parse(value) as T) : null;
  } catch (error) {
    console.error("Error getting item:", error as StorageError);
    return null;
  }
};

export const removeItem = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing item:", error as StorageError);
  }
};

export const mergeItem = async (
  key: string,
  value: StorageValue
): Promise<void> => {
  try {
    await AsyncStorage.mergeItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error merging item:", error as StorageError);
  }
};

export const clear = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Error clearing AsyncStorage:", error as StorageError);
  }
};

export const getAllKeys = async (): Promise<string[]> => {
  try {
    return (await AsyncStorage.getAllKeys()).slice();
  } catch (error) {
    console.error("Error getting all keys:", error as StorageError);
    return [];
  }
};

export const getAllItems = async (): Promise<Record<string, StorageValue>> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);
    return items.reduce<Record<string, StorageValue>>(
      (accumulator, [key, value]) => {
        accumulator[key] = value ? JSON.parse(value) : null;
        return accumulator;
      },
      {}
    );
  } catch (error) {
    console.error("Error getting all items:", error as StorageError);
    return {};
  }
};
