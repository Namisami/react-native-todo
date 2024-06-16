import { useEffect, useState } from "react";
import { View, TextInput, Text, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import response from "../response/response";
import { TaskI } from "../components/Task";


interface TaskScreenProps {
  route: any
  navigation: any
}

const TaskScreen = ({
  route,
  navigation
}: TaskScreenProps) => {
  const { taskId } = route.params;

  // Объявление хранилища задач с использованием хука useState
  const [task, setTask] = useState<TaskI>({
    id: taskId,
    text: "",
    completed: false,
    notes: "",
  })

  useEffect(() => {
    (async function () {
      await getTaskDataFromStorage();
    })();
  }, [])

  useEffect(() => {
    setNewDataToStorage();
  }, [task])

  // Функция для загрузки данных из хранилища в состояние
  const getTaskDataFromStorage = async () => {
    try {
      const data = await AsyncStorage.getItem('data')
      if (data !== null) {
        const parsedData: TaskI[] = JSON.parse(data)
        const taskData = parsedData.find((taskItem: TaskI) => taskItem.id === taskId)
        if (taskData) {
          setTask(taskData)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  const setNewDataToStorage = async () => {
    try {
      const data = await AsyncStorage.getItem('data')
      if (data !== null) {
        const parsedData: TaskI[] = JSON.parse(data)
        parsedData.sort((a, b) => {
          if (a.id < b.id) return -1
          if (a.id > b.id) return 1
          return 0
        })

        const newData = parsedData.map((taskItem: TaskI) => {
          if (taskItem.id === taskId) {
            return task
          }
          return taskItem
        })

        await AsyncStorage.setItem("data", JSON.stringify(newData))
      }
    } catch (err) {
      console.log(err)
    }
  }

  const textChangeHandle = (text: string) => {
    setTask({...task, text: text})
  }

  const notesChangeHandle = (text: string) => {
    setTask({...task, notes: text})
  }

  return (
    <View style={styles.container}>
      <Text>Задача</Text>
      <TextInput 
        placeholder="Введите задачу"
        onChangeText={ textChangeHandle }
      >
        {task.text}
      </TextInput>
      <Text style={styles.notes}>Замечания</Text>
      <TextInput 
        placeholder="Введите замечания"
        onChangeText={ notesChangeHandle }
      >
        {task.notes}
      </TextInput>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  notes: {
    marginTop: 16,
  }
});

export default TaskScreen;
