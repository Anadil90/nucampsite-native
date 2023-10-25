import { Platform, View } from 'react-native';
import Constants from 'expo-constants';
import CampsiteInfoScreen from './CampsiteInfoScreen';
import DirectoryScreen from './DirectoryScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';
import ContactScreen from './ContactScreen';

const AppDrawer = createDrawerNavigator();

const screenOptions = {
    headerTintColor: '#ffc',
    headerStyle: { backgroundColor: '#5b338a'}
}

const HomeNavigator = () => {
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name='Home'
                component={HomeScreen}
                options={{title: 'Home'}}
            />
        </Stack.Navigator>
    )
}

const DirectoryNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            initialRouteName='Directory'
            screenOptions={screenOptions}
        >
            <Stack.Screen
                name='Directory'
                component={DirectoryScreen}
                options={{ title: 'Campsite Directory' }}
            />
            <Stack.Screen
                name='CampsiteInfo'
                component={CampsiteInfoScreen}
                options={({ route }) => ({
                    title: route.params.campsite.name
                })}
            />
        </Stack.Navigator>
    );
};

const ContactScreenNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
        screenOptions={screenOptions}
        >
            <Stack.Screen
            name='Contact Us'
            initialRouteName='Contact Us'
            component={ContactScreen}
            >
            </Stack.Screen>
        </Stack.Navigator>
    )
}

const AboutScreenNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
        screenOptions={screenOptions}
        >
            <Stack.Screen
            name='About'
            initialRouteName='About'
            component={AboutScreen}
            >
            </Stack.Screen>
        </Stack.Navigator>
    )
}

const Main = () => {
    return (
        <View
            style={{
                flex: 1,
                paddingTop:
                    Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
            }}
        >
            <AppDrawer.Navigator
                initialRouteName='Home'
                drawerStyle={{backgroundColor: '#294294'}}
            >
                <AppDrawer.Screen
                    name='Home'
                    component={HomeNavigator}
                    options={{title: 'Home'}}
                />

                <AppDrawer.Screen
                    name='Directory'
                    component={DirectoryNavigator}
                    options={{title: 'Directory'}}
                />

                <AppDrawer.Screen
                    name='About'
                    component={AboutScreenNavigator}
                />

                <AppDrawer.Screen
                    name='Contact Us'
                    component={ContactScreenNavigator}
                />
                </AppDrawer.Navigator>
        </View>
    );
};

export default Main;