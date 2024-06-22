import AsyncStorage from "@react-native-async-storage/async-storage"


// Функция для очистки хранилища
const cleanStorage = async () => {
  await AsyncStorage.removeItem("data")
}

export default cleanStorage;
