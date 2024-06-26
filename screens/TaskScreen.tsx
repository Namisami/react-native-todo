import { useEffect, useState } from "react";
import { 
  View,  
  StyleSheet, 
} from "react-native";
import { 
  Button,
  TextInput,
  Icon,
  useTheme
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import getTaskDataFromStorage from "../api/getTaskDataFromStorage";
import setNewDataToStorage from "../api/setNewDataToStorage";

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

  // Состояние, показывающее, загружаются ли данные
  const [isLoading, setIsLoading] = useState(true);

  // Получение темы через хук
  const theme = useTheme();
  
  useEffect(() => {
    // Самовызывающаяся асинхронная функция, которая извлекает данные
    // о задаче при запуске этого экрана.
    (async function () {
      setIsLoading(true);
      await setTaskData();
      setIsLoading(false);
    })();
  }, [])

  // useEffect, который при изменении состояния задания обновляет хранилище
  useEffect(() => {
    (async function () {
      await setNewDataToStorageCall();
    })()
  }, [task])

  // Функция для загрузки данных из хранилища в состояние
  const setTaskData = async () => {
    const taskData = await getTaskDataFromStorage(taskId);
    if (taskData) {
      setTask(taskData)
    }
  }

  // Функция, обновляющая данные в хранилище в соответствии с обновленным
  // значением задачи
  const setNewDataToStorageCall = async () => {
    try {
      const data = await AsyncStorage.getItem('data')
      if (data !== null) {
        const parsedData: TaskI[] = JSON.parse(data)
        parsedData.sort((a, b) => {
          if (a.id < b.id) return -1
          if (a.id > b.id) return 1
          return 0
        })
        
        const currentTask = parsedData.find((taskItem: TaskI) => taskItem.id === taskId);

        // Проверка, есть ли новая задача в списке задач
        // Если нет, то добавляет
        if (!currentTask) {
          parsedData.push(task);
        }

        // Построение нового состояния с использованием функции map, применяющей
        // определенную функцию ко всем элементам списка parsedData
        const newData = parsedData.map((taskItem: TaskI) => {
          if (taskItem.id === taskId) {
            if (task.text !== "") {
              return task
            }
            return null
          }
          return taskItem
        })

        // Применение отсеивания нулевых значений, которые могут возникнуть
        // в результате применения функции map выше
        const filteredData = newData.filter((taskItem: TaskI | null) => taskItem !== null)

        await setNewDataToStorage(filteredData);
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
    <View style={{...styles.container, backgroundColor: theme.colors.background}}>
      { isLoading 
        ? <Icon source="loading" size={ 20 }/>  
        : <>
            <TextInput 
              mode="outlined"
              label="Название"
              placeholder="Введите задачу"
              value={task.text}
              onChangeText={ textChangeHandle }
            />
            <TextInput
              multiline
              style={styles.notes} 
              mode="outlined"
              label="Заметки"
              placeholder="Введите заметки"
              value={task.notes}
              onChangeText={ notesChangeHandle }
            />
              {/* Иконка, которая меняется в зависимости от выполненности задачи (выполненность можно менять по клику) */}
            <Button 
              style={{...styles.checkedIconContainer, borderColor: theme.colors.primary}} 
              icon="check"
              textColor={ theme.dark ? "white" : "black"}
              mode={ task.completed ? "contained" : "outlined"}
              onPress={ checkTask }
            >
              Готово
            </Button>
            {/* <Pressable style={styles.checkedIconContainer} onPress={ checkTask }>
              <Image style={styles.checkedIcon} source={ task.completed ? require('../images/checked.png') : require('../images/unchecked.png') }/>
            </Pressable> */}
          </>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  checkedIcon: {
    width: 50,
    height: 50,
  },
  checkedIconContainer: {
    borderWidth: 1,
    position: 'absolute',
    bottom: 10,
    right: 10,
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
