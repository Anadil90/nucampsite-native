import { Platform, View, StyleSheet, Image, Text } from 'react-native';
import Constants from 'expo-constants';
import CampsiteInfoScreen from './CampsiteInfoScreen';
import DirectoryScreen from './DirectoryScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';
import ContactScreen from './ContactScreen';
import { Icon } from 'react-native-elements';
import logo from '../assets/images/logo.png';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPartners } from '../features/partners/partnersSlice';
import { fetchComments } from '../features/comments/commentsSlice';
import { fetchPromotions } from '../features/promotions/promotionsSlice';
import { fetchCampsites } from '../features/campsites/campsiteSlice';

const AppDrawer = createDrawerNavigator();

const screenOptions = {
    headerTintColor: '#ffc',
    headerStyle: { backgroundColor: '#5b338a'}
}

const styles = StyleSheet.create({
    stackIcon: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 24
    },
    drawerHeader: {
        backgroundColor: '#5637DD',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        height: 60,
        width: 60
    }
})

const HomeNavigator = () => {
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name='Home'
                component={HomeScreen}
                options={
                    ({ navigation }) => ({
                        headerLeft: () => (
                            <Icon
                                name='list'
                                type='font-awesome'
                                iconStyle={styles.stackIcon}
                                onPress={() => {navigation.toggleDrawer()}}
                            />
                        )
                    })
                }
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
                options={
                    ({ navigation }) => ({
                        title: 'Campsite Directory',
                        headerLeft: () => (
                            <Icon
                                name='list'
                                type='font-awesome'
                                iconStyle={styles.stackIcon}
                                onPress={() => {navigation.toggleDrawer()}}
                            />
                        )
                    })
                }
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
            name='Contact'
            initialRouteName='Contact Us'
            component={ContactScreen}
            options={
                ({ navigation }) => ({
                    title: 'Contact Us',
                    headerLeft: () => (
                        <Icon
                            name='address-card'
                            type='font-awesome'
                            iconStyle={styles.stackIcon}
                            onPress={() => {navigation.toggleDrawer()}}
                        />
                    )
                })
            }
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
            options={
                ({ navigation }) => ({
                    headerLeft: () => (
                        <Icon
                            name='info-circle'
                            type='font-awesome'
                            iconStyle={styles.stackIcon}
                            onPress={() => {navigation.toggleDrawer()}}
                        />
                    )
                })
            }
            >
            </Stack.Screen>
        </Stack.Navigator>
    )
}

const customDrawerContent = (props) => {
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.drawerHeader}>
                <View style={{flex: 1}}>
                    <Image source={logo} style={styles.drawerImage}></Image>
                </View>

                <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>Nucamp</Text>
                </View>
            </View>
            
            <DrawerItemList {...props} labelStyle={{ fontWeight: 'bold'}} />
        </DrawerContentScrollView>
    )
}

const Main = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCampsites())
        dispatch(fetchPromotions())
        dispatch(fetchPartners())
        dispatch(fetchComments())
    }, [dispatch])


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
                drawerContent={customDrawerContent}
            >
                <AppDrawer.Screen
                    name='Home'
                    component={HomeNavigator}
                    options={{
                        title: 'Home',
                        drawerIcon: ({ color }) => (
                            <Icon
                                name='home'
                                type='font-awesome'
                                size={24}
                                iconStyle={{width: 24}}
                                color={color}
                            />
                        )
                
                    }}
                />

                <AppDrawer.Screen
                    name='Directory'
                    component={DirectoryNavigator}
                    options={{
                        title: 'Campsite Directory',
                        drawerIcon: ({ color }) => (
                            <Icon
                                name='list'
                                type='font-awesome'
                                size={24}
                                iconStyle={{width: 24}}
                                color={color}
                            />
                        )
                    }}
                    
                />

                <AppDrawer.Screen
                    name='About'
                    component={AboutScreenNavigator}
                    options={{
                        title: 'About',
                        drawerIcon: ({ color }) => (
                            <Icon
                                name='info-circle'
                                type='font-awesome'
                                size={24}
                                iconStyle={{width: 24}}
                                color={color}
                            />
                        )
                    }}
                />

                <AppDrawer.Screen
                    name='Contact Us'
                    component={ContactScreenNavigator}
                    options={{
                        title: 'Contact Us',
                        drawerIcon: ({ color }) => (
                            <Icon
                                name='address-card'
                                type='font-awesome'
                                size={24}
                                iconStyle={{width: 24}}
                                color={color}
                            />
                        )
                    }}
                />
                </AppDrawer.Navigator>
        </View>
    );
};

export default Main;