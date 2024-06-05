import React, { useState } from 'react';
import {
    TouchableOpacity,
    Pressable,
    StyleSheet,
    View,
    Text,
} from 'react-native';
// import CheckBox from 'expo-checkbox';
import CheckBox from '@react-native-community/checkbox';

interface TaskProps {
    children: ReactNode
}
// Компонент отдельной задачи
const Task = ({
    children
}) => {
    // Состояние (выполнено ли)
    const [isChecked, setIsChecked] = useState(false);
    // Функция для изменения состояния
    const toggleCheck = () => {
        setIsChecked(!isChecked)
    }

    // Pressable Необходимо, чтобы можно было изменять состояние по клику в любое место в задаче
    // CheckBox Для отметки выполненности
    // Text для отображения текста задачи
    return (
        <View>
            <Pressable style={ styles.task } onPress={ toggleCheck }>
                 <CheckBox
                     value={ isChecked }
                     onValueChange={ toggleCheck }
                 />
                <Text style={ isChecked ? styles.taskTextCrossed : '' }>
                   { children }
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
    taskTextCrossed: {
        textDecorationLine: 'line-through'
    }
})

export default Task;
