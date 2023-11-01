import { FlatList, StyleSheet, Text, View } from 'react-native';
import RenderCampsite from '../features/campsites/RenderCampsite';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../features/favorites/favoritesSlice';

const styles = StyleSheet.create({
    commentsTitle: {
        textAlign: 'center',
        backgroundColor: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#434840',
        padding: 10,
        paddingTop: 30
    },
    commentItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    }

})
const renderCommentItem = ({ item }) => {
    return (
        <View styles={styles.commentItem}>
            <Text style={{fontSize: 14}}>{item.text}</Text>
            <Text style={{fontSize: 12}}>{item.rating}</Text>
            <Text>
                {`--${item.author} ${item.date}`}
            </Text>
        </View>
    )
}

const CampsiteInfoScreen = ({ route }) => {
    const comments = useSelector((state) => state.comments)
    const { campsite } = route.params;
    const favorites = useSelector((state) => state.favorites)
    const dispatch = useDispatch();

    return (
        <FlatList 
            data={comments.commentsArray.filter(
                (comment) => comment.campsiteId === campsite.id
            )}
            renderItem={renderCommentItem}
            contentContainerStyle={{
                marginHorizontal: 20,
                paddingVertical: 20 
            }}
            ListHeaderComponent={
                <>
                    <RenderCampsite 
                        campsite={campsite} 
                        isFavorite={favorites.includes(campsite.id)}
                        markFavorite={()=> dispatch(toggleFavorite(campsite.id))}
                    />
                    <Text style={styles.commentsTitle}>Comments</Text>
                </>
            }
        />
    )

};



export default CampsiteInfoScreen;