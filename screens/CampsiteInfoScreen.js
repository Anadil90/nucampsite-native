import { FlatList, StyleSheet, Text, View } from 'react-native';
import RenderCampsite from '../features/campsites/RenderCampsite';
import { COMMENTS } from '../shared/comments';
import { useState } from 'react';

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
    const [comments, setComments] = useState(COMMENTS);
    const { campsite } = route.params;
    const [favorite, setFavorite] =useState(false);

    return (
        <FlatList 
            data={comments.filter(
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
                        isFavorite={favorite}
                        markFavorite={()=> setFavorite(true)}
                    />
                    <Text style={styles.commentsTitle}>Comments</Text>
                </>
            }
        />
    )

};



export default CampsiteInfoScreen;