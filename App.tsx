import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MD3LightTheme as DefaultTheme, MD3DarkTheme as DarkTheme, PaperProvider } from 'react-native-paper';
import MainScreen from './screens/MainScreen';
import TaskScreen from './screens/TaskScreen';

const Stack = createNativeStackNavigator();

const commonTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#9DC8FF',
        secondary: '#264F85',
        background: '#FFFFFF',
    },
};

const darkTheme = {
    ...DarkTheme,
    dark: true,
    colors: {
        ...DarkTheme.colors,
        primary: '#9DC8FF',
        secondary: '#264F85',
        background: '#FFFFFF',
    },
};

const App = () => {
    return (
        <PaperProvider theme={commonTheme}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name='Main' component={MainScreen} options={{ title: "Список задач" }} />
                    <Stack.Screen
                        name='Task'
                        component={TaskScreen}
                        options={{ title: "Задача" }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
};

export default App;
