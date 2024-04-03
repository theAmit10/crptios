import AsyncStorage from '@react-native-async-storage/async-storage';

// storing data
export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    
  } catch (error) {
    console.log(error);
  }
};

export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log("error" +error);
  }
};

// // storing data
// export let storeData = async (key, value) => {
//   try {
//     await AsyncStorage.setItem(key, JSON.stringify(value));
//     console.log('FROM THEME SLICE');
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getData = async value => {
//   try {
//     const userData = await AsyncStorage.getItem(value);
//     console.log('ASYNC: ' + userData);

//     return userData !== null ? userData : null;
//   } catch (error) {
//     console.log(error);
//   }
// };
