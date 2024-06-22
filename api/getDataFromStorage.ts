import AsyncStorage from '@react-native-async-storage/async-storage';

// Функция для получения данных из хранилища
const getDataFromStorage = async () => {
  try {
    const data = await AsyncStorage.getItem('data');
    if (data !== null) {
      const parsedData = JSON.parse(data);
      return parsedData;
    }
  } catch (err) {
    console.log(err);
  }
};

export default getDataFromStorage;
