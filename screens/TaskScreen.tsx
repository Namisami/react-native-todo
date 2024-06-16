import { useEffect, useState } from "react";
import { View, TextInput, Text, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData, Image, Pressable } from "react-native";
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
    images: [],
  })
  
  useEffect(() => {
    // Самовызывающаяся асинхронная функция, которая извлекает данные
    // о задаче при запуске этого экрана.
    (async function () {
      await getTaskDataFromStorage();
    })();
  }, [])

  // useEffect, который при изменении состояния задания обновляет хранилище
  useEffect(() => {
    setNewDataToStorage();
  }, [task])

  // Функция для загрузки данных из хранилища в состояние
  const getTaskDataFromStorage = async () => {
    try {
      const data = await AsyncStorage.getItem('data')
      if (data !== null) {
        const parsedData: TaskI[] = JSON.parse(data)
        // Поиск необходимой задачи среди всех задач по ее id
        const taskData = parsedData.find((taskItem: TaskI) => taskItem.id === taskId)
        if (taskData) {
          setTask(taskData)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  // Функция, обновляющая данные в хранилище в соответствии с обновленным
  // значением задачи
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

        // Построение нового состояния с использованием функции map, применяющей
        // определенную функцию ко всем элементам списка parsedData
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

  // Функция для изменения состояния выполненности задачи
  const checkTask = () => {
    setTask({...task, completed: !task.completed});
  }

  // Функция, отвечающая за отлов события изменения текста задачи
  const textChangeHandle = (text: string) => {
    setTask({...task, text: text})
  }
  
  // Функция, отвечающая за отлов события изменения заметок к задаче
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
        {/* Иконка, которая меняется в зависимости от выполненности задачи (выполненность можно менять по клику) */}
      <Pressable style={styles.checkedIconContainer} onPress={ checkTask }>
        <Image style={styles.checkedIcon} source={ task.completed ? require('../images/checked.png') : require('../images/unchecked.png') }/>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  checkedIcon: {
    width: 50,
    height: 50,
  },
  checkedIconContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5
  },
  imageList: {
    display: 'flex'
  },
  image: {
    borderRadius: 5,
    height: 100,
    width: 100
  },
  notes: {
    marginTop: 16,
  }
});

export default TaskScreen;
