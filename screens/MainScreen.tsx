import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Task, { TaskI } from '../components/Task'
import response from '../response/response';
import arraysEquality from '../utils/arraysEquality';
import useInterval from '../hooks/useInterval';


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
        (async function () {
            await loadDataToStorage(response);
        })();
        // Cleanup-функция, срабатывающая при размонтировании компонента.
        // Очищает хранилище
        return () => {
            (async function () {
                await cleanStorage()
            })()
        }
    }, [])
    
    useEffect(() => {
        // Асинхронная функция, срабатывающая при изменении задач.
        // Добавляет новые данные в хранилище
        (async function () {
            if (tasks.length > 0) {
                await setNewDataToStorage()
            }
        })()
    }, [tasks])

    useInterval(async () => await getDataFromStorage(), 1000)

    // Функция для загрузки данных в хранилище
    const loadDataToStorage = async (response: { "data": TaskI[] }) => {
        try {
            const data = JSON.stringify(response.data)
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
                if (!arraysEquality(tasks, parsedData)) {
                    setTasks(parsedData)
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    const setNewDataToStorage = async () => {
        await AsyncStorage.setItem("data", JSON.stringify(tasks))
    }

    // Функция для очистки хранилища
    const cleanStorage = async () => {
        await AsyncStorage.removeItem("data")
    }

    // Функция для добавления новой задачи (статичная)
    const addTask = () => {
        const newTaskId = tasks.slice(-1).at(0)!.id + 1;
        setTasks([...tasks, {
            id: newTaskId,
            text: "Сделать лабы",
            completed: false,
            notes: "",
        }])
        navigation.navigate('Task', { taskId: newTaskId })
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
        <View style={styles.container}>
            <View>
                <Button
                    title="Создать"
                    onPress={addTask}
                />
            </View>
            <ScrollView style={styles.taskList} contentContainerStyle={{ gap: 8 }}>
                {
                    tasks.map((item: TaskI) => <Task key={item.id}
                        id={item.id}
                        text={item.text}
                        isCompleted={item.completed}
                        onTaskClick={checkTask}
                        onTaskOpen={(id) => navigation.navigate('Task', { taskId: id })}
                    />)
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
        marginVertical: 8,
    },
    taskList: {
        marginTop: 16,
    }
});

export default MainScreen
