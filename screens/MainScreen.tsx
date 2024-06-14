import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Button,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Task, { TaskI } from '../components/Task'
import response from '../response/response';


interface MainScreenProps {
  route: any
  navigation: any
}

const MainScreen = ({ 
  route,
  navigation 
}: MainScreenProps) => {
  // Объявление хранилища задач с использованием хука useState
  const [tasks, setTasks] = useState<TaskI[]>([])

  useEffect(() => {
      // Асинхронная функция, запускающаяся при монтировании приложения
      // предназначеннаяд для выгрузки данных в хранилище, а затем их
      // извлечение из хранилища в состояние
      (async function() {
          await loadDataToStorage(response);
          await getDataFromStorage();
      })();
      // Cleanup-функция, срабатывающая при размонтировании компонента.
      // Очищает хранилище
      return () => {
          (async function() {
              await cleanStorage()
          })()
      }
  }, [])
  
  // Функция для загрузки данных в хранилище
  const loadDataToStorage = async (response: object) => {
      try {
          const data = JSON.stringify(response)
          await AsyncStorage.setItem('data', data)
      } catch (err) {
          console.log(err)
      }
  }

  // Функция для загрузки данных из хранилища в состояние
  const getDataFromStorage = async () => {
      try {
          const data = await AsyncStorage.getItem('data')
          if (data !== null) {
              const parsedData = JSON.parse(data)
              setTasks(parsedData.data)
          }
      } catch (err) {
          console.log(err)
      }
  }

  // Функция для очистки хранилища
  const cleanStorage = async () => {
      await AsyncStorage.removeItem("data")
  }

  // Функция для добавления новой задачи (статичная)
  const addTask = () => {
      setTasks([...tasks, {
          id: tasks.pop()!!.id + 1, 
          text: "Сделать лабы",
          completed: false,
          userId: 1,
      }])
  }

  // Функция для изменения состояния выполненности задачи
  const checkTask = (id: number) => {
      const newTasks = tasks.map((task) => {
          if (task.id === id) {
              task.completed = !task.completed
          }
          return task
      })
      setTasks(newTasks);
  }

  return (
    <View style={ styles.container }>
      <View>
        <Button
          title="Создать"
          onPress={ addTask }
        />
      </View>
      <ScrollView style={ styles.taskList } contentContainerStyle={{ gap: 8 }}>
        {
          tasks.map((item: TaskI) => <Task key={ item.id } 
                                    id={ item.id }
                                    text={ item.text } 
                                    isCompleted={ item.completed } 
                                    onTaskClick={ checkTask }
                                    onTaskOpen={ () => navigation.navigate('Task') }
                                /> )
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      marginHorizontal: 16,
      marginVertical: 8,
  },
  taskList: {
      marginTop: 16,
  }
});

export default MainScreen
