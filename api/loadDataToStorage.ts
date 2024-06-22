import AsyncStorage from "@react-native-async-storage/async-storage"
import { TaskI } from "../components/Task"


// Функция для загрузки данных в хранилище
const loadDataToStorage = async (response: { "data": TaskI[] }) => {
  try {
      const data = JSON.stringify(response.data)
      await AsyncStorage.setItem('data', data)
  } catch (err) {
      console.log(err)
  }
}

export default loadDataToStorage
