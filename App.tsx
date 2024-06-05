import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TextInput,
    Button,
    FlatList,
} from 'react-native';
import Task from './components/Task'
// Стартовое значение списка задач
const tasksInitial = [
    { text: "Сделать первую лабу" },
    { text: `Здесь очень много текстаЗдесь очень много текстаЗдесь очень много текста
    Здесь очень много текстаЗдесь очень много текстаЗдесь очень много текста` },
]

const App = () => {
    // Объявление состояния списка задач
    const [tasks, setTasks] = useState(tasksInitial)
    // Функция добавления задачи (пока статика)
    const addTask = () => {
        setTasks([...tasks, { text: "Сделать первую лабу" }])
    }
    // Первый View общий, второй для хедера
    // ScrollView для прокручиваемого списка задач
    // FlatList непосредственно для рендера списка задач
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
                    tasks.map((item, index) => <Task key={ index }>{ item.text }</Task>)
                }
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginVertical: 8,
    },
    taskList: {
        marginTop: 16,
    }
});

export default App;
