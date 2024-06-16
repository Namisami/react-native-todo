import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './screens/MainScreen';
import TaskScreen from './screens/TaskScreen';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Main' component={MainScreen} options={{ title: "Список задач" }} />
                <Stack.Screen 
                    name='Task' 
                    component={TaskScreen} 
                    options={{title: "Задача"}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
