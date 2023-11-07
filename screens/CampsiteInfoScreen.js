import { FlatList, StyleSheet, Text, View, Button, Modal } from 'react-native';
import { useState } from 'react';
import { Rating, Input } from 'react-native-elements';
import RenderCampsite from '../features/campsites/RenderCampsite';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { postComment } from '../features/comments/commentsSlice';

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
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    }


})


const renderCommentItem = ({ item }) => {
    return (
        <View styles={styles.commentItem}>
            <Text style={{fontSize: 14}}>{item.text}</Text>
            <Rating 
            startingValue={item.rating}
            imageSize={10}
            style={{
                alignItems: 'flex-start',
                paddingVertical: '5%'
            }}
            readonly
            />
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
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(5);
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');

    const handleSubmit = () => {
        const newComment = {
            author,
            rating,
            text,
            campsiteId: campsite.id
        }

        dispatch(postComment(newComment))
        setShowModal(!showModal)
    }

    const resetForm = () => {
        setRating(5);
        setAuthor('');
        setText('');
    }

    return (
        <>
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
                            onShowModal={() => setShowModal(!showModal)}
                        />
                        <Text style={styles.commentsTitle}>Comments</Text>
                    </>
                }
            />

            <Modal
                animationType='slide'
                transparent={false}
                visible={showModal}
                onRequestClose={() => setShowModal(!showModal)}
            >
                <View style={styles.modal}>
                    <Rating 
                        showRating={5}
                        imageSize={40}
                        onFinishRating={(rating)=> setRating(rating)} 
                        style={{paddingVertical: 10}}
                    />
                    <Input
                        placeholder='Author'
                        leftIcon='user-o'
                        leftIconContainerStyle={{paddingRight:10}}
                        onChangeText={text => setAuthor(text)}
                    />
                    <Input
                        placeholder='Comment'
                        leftIcon='comment-o'
                        leftIconContainerStyle={{paddingRight:10}}
                        onChangeText={text => setText(text)}
                    />

                    <Button 
                        title='Submit'
                        onPress={() => {
                            handleSubmit();
                            resetForm();
                        }}
                    />

                    
                    <View style={{margin: 10}}>
                        <Button
                            onPress={() => {
                                setShowModal(!showModal);
                            }}
                            color='#808080'
                            title='Cancel'
                        />
                    </View>
                    
                </View>
            </Modal>
        </>
        
    )

};



export default CampsiteInfoScreen;