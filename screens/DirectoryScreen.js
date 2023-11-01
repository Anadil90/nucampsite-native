import { useSelector } from 'react-redux';
import { FlatList, Text, View } from 'react-native';
import { Tile } from 'react-native-elements'; 
import { baseUrl } from '../shared/baseUrl';
import Loading from '../components/LoadingComponent';

const DirectoryScreen = ({ navigation }) => {
    const campsites = useSelector((state) => state.campsites)

    if(campsites.isLoading) {
        return (
            <Loading />
        )
    }
    if(campsites.errMsg) {
        return (
            <View>
                <Text>{campsites.errMsg}</Text>
            </View>
        )
    }
    const renderDirectoryItem = ({ item: campsite }) => {
        return (
            <Tile
                title={campsite.name}
                caption={campsite.description}
                featured
                onPress={() =>
                    navigation.navigate('CampsiteInfo', { campsite })
                }
                imageSrc={{uri: baseUrl + campsite.image}}
            />
        );
    };
    return (
        <FlatList
            data={campsites.campsitesArray}
            renderItem={renderDirectoryItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

export default DirectoryScreen;
