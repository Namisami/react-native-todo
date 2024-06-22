import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme, Button, Snackbar } from 'react-native-paper';
import Task, { TaskI } from '../components/Task'

import response from '../api/response';
import loadDataToStorage from '../api/loadDataToStorage';
import getDataFromStorage from '../api/getDataFromStorage';
import setNewDataToStorage from '../api/setNewDataToStorage';
import cleanStorage from '../api/cleanStorage';

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
    // Объявление временного хранилища задач с использованием хука useState
    const [tempTasks, setTempTasks] = useState<TaskI[]>([])
    // Состояние, показывающее видно ли снэкбар
    const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);

    // Получение темы через хук
    const theme = useTheme();

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
            await setNewDataToStorage(tasks)
        })()
    }, [tasks])

    // Кастомный хук, который работает как setInterval, но позволяет
    // обходить ограничения касательно использования state внутри setInterval.
    // Обновляет данные в соответствии с хранилищем каждую секунду.
    useInterval(async () => await setTasksFromStorage(), 1000)

    // Функция для загрузки данных из хранилища в состояние
    const setTasksFromStorage = async () => {
        const parsedData = await getDataFromStorage();
        // Utility-функция, проверяющая, что новые значения
        // отличаются от предыдущих.
        if (!arraysEquality(tasks, parsedData)) {
            if (parsedData.length < tasks.length) {
                setIsSnackbarVisible(true)
            }
            setTasks(parsedData)
        }
    }

    // Функция для добавления новой задачи (статичная)
    const addTask = () => {
        const newTaskId = tasks.slice(-1).at(0)!.id + 1;
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

    // Функция, которая отвечает за отключение видимости снэкбара
    const onSnackBarDismiss = () => {
        setIsSnackbarVisible(false);
    }

    // Функция, отменяющая удаление задачи
    const returnDeletedTask = () => {
        setTasks(tempTasks)
    }

    // Функция, открывающая отдельный экран с подробно описаннной задачей
    // Сохраняет состояние задач на время открытия.
    const openTaskScreen = (id: number) => {
        setTempTasks(tasks)
        navigation.navigate('Task', { taskId: id })
    }

    return (
        <View style={styles.screen}>
            <Button
                icon="plus"
                mode="contained-tonal"
                style={ styles.addBtn }
                onPress={addTask}
            >
                Создать
            </Button>
            <View style={{...styles.container, backgroundColor: theme.colors.background}}>
                <ScrollView style={styles.taskList} contentContainerStyle={{ gap: 8 }}>
                    {
                        tasks.map((item: TaskI) => <Task key={item.id}
                            id={item.id}
                            text={item.text}
                            isCompleted={item.completed}
                            onTaskClick={checkTask}
                            onTaskOpen={(id) => openTaskScreen(id)}
                        />)
                    }
                </ScrollView>
            </View>
            {/* Использует снэкбар, если устройство пользователя - Android */}
            { Platform.OS === 'android' && 
                <Snackbar
                    style={styles.snackbar}
                    icon='close'
                    visible={isSnackbarVisible}
                    onDismiss={ onSnackBarDismiss }
                    action={{
                        label: "Отменить",
                        onPress: returnDeletedTask
                    }}
                >
                    Задача была удалена
                </Snackbar>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    taskList: {
    },
    addBtn: {
        position: 'absolute',
        zIndex: 2,
        bottom: 10,
        right: 10,
    },
    snackbar: {
        zIndex: 1000,
    }
});

export default MainScreen
