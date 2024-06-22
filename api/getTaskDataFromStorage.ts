import AsyncStorage from "@react-native-async-storage/async-storage"
import { TaskI } from "../components/Task"


// Функция для получения данных из хранилища 
const getTaskDataFromStorage = async (taskId: number) => {
  try {
    const data = await AsyncStorage.getItem('data')
    if (data !== null) {
      const parsedData: TaskI[] = JSON.parse(data)
      // Поиск необходимой задачи среди всех задач по ее id
      const taskData = parsedData.find((taskItem: TaskI) => taskItem.id === taskId)
      return taskData;
    }
  } catch (err) {
    console.log(err)
  }
}

export default getTaskDataFromStorage;
