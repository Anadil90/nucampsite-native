import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    loadingView: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    loadingText: {
        color: '5637DD',
        fontweight: 'bold',
        fontSize: 14
    }
})

const Loading = () => {
    return (
        <View styles={styles.loadingView}>
            <ActivityIndicator size='large' color='#5637DD'/>
            <Text styles={styles.loadingText}>Loading...</Text>
        </View>
    )
}



export default Loading;