import AsyncStorage from "@react-native-async-storage/async-storage"
import { TaskI } from "../components/Task"


// Функция замены данных в хранилище на новые
const setNewDataToStorage = async (tasks: TaskI[]) => {
  if (tasks.length > 0) {
    await AsyncStorage.setItem("data", JSON.stringify(tasks))
  }
}

export default setNewDataToStorage;
