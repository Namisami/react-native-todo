import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { 
    MD3LightTheme as DefaultTheme, 
    MD3DarkTheme as DarkTheme, 
    PaperProvider,
    IconButton,
} from 'react-native-paper';
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
        // background: '#FFFFFF',
    },
};

const App = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }

    return (
        <PaperProvider theme={theme === 'light' ? commonTheme : darkTheme}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen 
                        name='Main' 
                        component={MainScreen} 
                        options={{ 
                            title: "Список задач",
                            headerStyle: {
                                backgroundColor: theme === 'light' ? "white" : "black",
                            },
                            headerTitleStyle: {
                                color: theme === 'light' ? "black" : "white"
                            },
                            headerRight: () => (
                                <IconButton 
                                    icon="theme-light-dark"
                                    size={ 25 }
                                    onPress={ toggleTheme }
                                />
                            )
                        }} 
                    />
                    <Stack.Screen
                        name='Task'
                        component={TaskScreen}
                        options={{ 
                            title: "Задача", 
                            headerStyle: {
                                backgroundColor: theme === 'light' ? "white" : "black"
                            },
                            headerTitleStyle: {
                                color: theme === 'light' ? "black" : "white"
                            },
                            headerTintColor: theme === 'light' ? "black" : "white",
                            headerRight: () => (
                                <IconButton 
                                    icon="theme-light-dark"
                                    size={ 25 }
                                    onPress={ toggleTheme }
                                />
                            )
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
};

export default App;
