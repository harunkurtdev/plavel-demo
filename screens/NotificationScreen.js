import React, { useEffect, useState } from 'react';
import { Image, Button, Text, View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import IconButton from '../components/ui/IconButton';
import DismissibleItem from '../components/ui/Dissimible';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

function NotificationScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerStyle: { backgroundColor: 'white' },
            headerTitleAlign: "center",
            headerTitle: () => <Text style={{ color: 'black', fontSize: 20 }}>Notification</Text>,
            headerLeft: ({ tintColor }) =>
                navigation.canGoBack() ? (
                    <View style={styles.buttonContainer}>
                        <IconButton
                            icon="arrow-back"
                            color="black"
                            size={24}
                            onPress={() => {
                                navigation.goBack();
                            }}
                        />
                    </View>
                ) : null,
            headerRight: () => <View />,
        });
    }, [navigation]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const handleDelete = (id) => {
        // Handle delete action
    };

    const generateRandomNames = (count) => {
        const names = ['Alice', 'Bob', 'Charlie', 'David', 'Emma', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack'];
        const randomNames = [];
        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * names.length);
            randomNames.push(names[randomIndex]);
        }
        return randomNames;
    };

    const generateFakeUsers = (count) => {
        const fakeUsers = [];
        const names = generateRandomNames(count);
        for (let i = 0; i < count; i++) {
            const fakeUser = {
                id: i + 1,
                name: names[i],
                age: Math.floor(Math.random() * 50) + 18,
                email: `${names[i].toLowerCase()}@example.com`,
                image: "https://picsum.photos/200/300"
            };
            fakeUsers.push(fakeUser);
        }
        return JSON.parse(JSON.stringify(fakeUsers, null, 2));
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={styles.rootContainer}>
            <Text style={styles.title}>Today</Text>

            <FlatList
                data={generateFakeUsers(2)}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    console.log(item.name),
                    <GestureHandlerRootView key={item.id} style={{ flex: 1 }}>
                        <View style={styles.listContainer}>
                            <View style={styles.listItemContainer}>
                                <Image source={{ uri: item.image }} style={styles.avatar} />
                                <View style={styles.textContainer}>
                                    <Text style={styles.primaryText}>{item.name}</Text>
                                    <Text style={styles.secondaryText}>{item.email}</Text>
                                </View>
                            </View>
                            <View style={styles.divider} />
                        </View>
                    </GestureHandlerRootView>
                )}
            />
        </View>
    );
}

export default NotificationScreen;

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rootContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 32,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    listContainer: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: 'white',
    },
    listItemContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 16,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    textContainer: {
        marginLeft: 16,
        flex: 1,
    },
    primaryText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    secondaryText: {
        fontSize: 14,
        color: 'gray',
    },
    divider: {
        height: 1,
        backgroundColor: 'gray',
        marginLeft: 64,
    },
});
