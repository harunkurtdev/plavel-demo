import { StyleSheet, Text, View, Button, Animated } from 'react-native';

import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';  // Choose the appropriate icon set




const DismissibleItem = ({ widget, handleDelete }) => {
    const renderRightActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [0, 50, 100],
            outputRange: [0, -0.5, -1],
        });
        return (
            <View style={stylesx.rightAction}>
                <Animated.View style={[stylesx.actionView, { transform: [{ scale: trans }] }]}>
                    <Icon name="add" size={30} color="#fff" />
                    <Text style={stylesx.actionText}>Add</Text>
                </Animated.View>
            </View>
        );
    };


    const renderLeftActions = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [-1, 0],
            // extrapolate: 'clamp',
        });

        return (
            <View style={stylesx.leftAction}>
                <Animated.View style={[stylesx.actionView, { transform: [{ scale: scale }] }]}>
                    <Icon name="trash-bin-outline" size={30} color="#fff" />
                    <Text style={stylesx.actionText}>Delete</Text>
                </Animated.View>
            </View>
        );
    };

    return (
        <Swipeable renderRightActions={renderRightActions} renderLeftActions={renderLeftActions}

            onSwipeableRightOpen={handleDelete}
            onSwipeableLeftOpen={() => console.log("Swiped Left - Deleted")}
        >

            <View style={stylesx.listItem}>
                {/* <Text style={stylesx.listItemText}> {item.email}</Text> */}
                {widget}
                {/* <Text style={stylesx.listItemText}>{item.body}</Text> */}
            </View>
        </Swipeable>
    );
};

export default DismissibleItem;


const stylesx = StyleSheet.create({
    listItem: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    listItemText: {
        fontSize: 18,
    },
    rightAction: {
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    leftAction: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    actionView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 100,
        paddingHorizontal: 20,
    },
    actionText: {
        color: 'white',
        fontWeight: '600',
        paddingLeft: 10,
    },
});