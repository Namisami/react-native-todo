import React from 'react';
import {
    Pressable,
    StyleSheet,
    View,
} from 'react-native';
import { Checkbox, Text } from 'react-native-paper';


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
                <Checkbox
                    status={ isCompleted ? 'checked' : 'unchecked' }
                    onPress={ toggleCheck }
                />
            </Pressable>
            <Pressable
                style={styles.taskTextLink}
                onPress={ () => onTaskOpen(id) }
            >
                <Text variant='bodyMedium' style={ isCompleted ? styles.taskTextCrossed : styles.taskTextBase }>
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
    taskTextLink: {
        flex: 1,
    },
    taskTextBase: {
        flex: 1,
        verticalAlign: 'middle',
        textAlign: 'justify'
    },
    taskTextCrossed: {
        flex: 1,
        verticalAlign: 'middle',
        textAlign: 'justify',
        textDecorationLine: 'line-through'
    }
})

export default Task;
