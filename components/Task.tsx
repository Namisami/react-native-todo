import React from 'react';
import {
    Pressable,
    StyleSheet,
    View,
    Text,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';


interface TaskProps {
    id: number
    text?: string 
    isCompleted: boolean
    onTaskClick: (id: number) => void
    onTaskOpen: (id: number) => void
}

export interface TaskI {
    id: number
    text?: string
    completed: boolean
    notes?: string
}

// Компонент отдельной задачи
const Task = ({
    id,
    text,
    isCompleted,
    onTaskClick,
    onTaskOpen,
}: TaskProps) => {
    // Функция для изменения состояния
    const toggleCheck = () => {
        onTaskClick(id)
    }

    // Pressable Необходимо, чтобы можно было изменять состояние по клику в любое место в задаче
    // CheckBox Для отметки выполненности
    // Text для отображения текста задачи
    return (
        <View style={ styles.task }>
            <Pressable onPress={ toggleCheck }>
                <CheckBox
                    value={ isCompleted }
                    onValueChange={ toggleCheck }
                />
            </Pressable>
            <Pressable onPress={ () => onTaskOpen(id) }>
                <Text style={ isCompleted ? styles.taskTextCrossed : styles.taskTextBase }>
                    { text }
                </Text>
            </Pressable>
        </View>
    )
};

const styles = StyleSheet.create({
    task: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    taskTextBase: {
        textAlign: 'justify'
    },
    taskTextCrossed: {
        textAlign: 'justify',
        textDecorationLine: 'line-through'
    }
})

export default Task;
