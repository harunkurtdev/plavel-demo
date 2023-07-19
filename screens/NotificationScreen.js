import React, { useEffect, useState } from 'react';
import { Image, Button, Text, View, StyleSheet, ActivityIndicator, FlatList, Pressable, ScrollView } from 'react-native';
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
        // const updatedPosts = posts.filter(post => post.id !== id);
        // setPosts(updatedPosts);
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
                image: "https://picsum.photos/200/300?random=" + i.toString(),
                date: new Date().toISOString(),
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
        <ScrollView>
            <View style={styles.rootColumn}>
                <View style={styles.rootContainer}>
                    <Text style={styles.title}>Today</Text>
                    <FlatList
                        data={generateFakeUsers(3)}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            console.log(item.name),
                            <GestureHandlerRootView key={item.id} style={{ flex: 1 }}>
                                <DismissibleItem widget={CardView(item)} handleDelete={() => handleDelete(item.id)} />
                            </GestureHandlerRootView>
                        )}
                    />
                </View>
                <View style={styles.rootContainer}>
                    <Text style={styles.title}>Yesterday</Text>
                    <FlatList
                        data={generateFakeUsers(2)}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            console.log(item.name),
                            <GestureHandlerRootView key={item.id} style={{ flex: 1 }}>
                                <View style={styles.listContainer}>
                                    <View style={styles.listItemContainer}>
                                        <Pressable onPress={() => { console.log(item.name); }}><Image source={{ uri: item.image }} style={styles.avatar} /></Pressable>

                                        <View marginLeft={8}>
                                            <Text style={styles.primaryText}>{item.name}</Text>
                                            <Text style={styles.secondaryText}>{item.email}</Text>
                                            <Text style={styles.secondaryText}>{item.date}</Text>
                                        </View>

                                        <Image source={{ uri: item.image }} style={styles.avatar} />
                                    </View>
                                    {/* <View style={styles.divider} /> */}
                                </View>
                            </GestureHandlerRootView>
                        )}
                    />
                </View>
            </View>
        </ScrollView>
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
        paddingTop: 10,
        paddingLeft: 32,
        paddingRight: 32,
    },
    rootColumn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        // padding: 32,
        flexDirection: 'column',
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
        alignItems: 'center',
        padding: 16,
        borderRadius: 8,
        backgroundColor: 'white',
        width: 350,
        elevation: 2, // Add elevation for shadow effect (Android)
        shadowColor: '#000000', // Add shadow color (iOS)
        shadowOffset: { width: 5, height: 5 }, // Add shadow offset (iOS)
        shadowOpacity: 0.45, // Add shadow opacity (iOS)
        shadowRadius: 8, // Add shadow radius (iOS)
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        margin: 5
    },
    cardContent: {
        marginLeft: 8,
    },
    // textContainer: {
    //     marginLeft: 16,
    //     flex: 1,
    // },
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
function CardView(item) {
    return <View style={styles.listContainer}>
        <Pressable onPress={() => { console.log(item.name); }} style={styles.listItemContainer}>
            <Image source={{ uri: item.image }} style={styles.avatar} />
            <View style={styles.cardContent}>
                <Text style={styles.primaryText}>{item.name}</Text>
                <Text style={styles.secondaryText}>{item.email}</Text>
                <Text style={styles.secondaryText}>{item.date}</Text>
            </View>
            <Image source={{ uri: item.image }} style={styles.avatar} />
            <Image source={{ uri: item.image }} style={styles.avatar} />
        </Pressable>
        {/* <View style={styles.divider} /> */}
    </View>;
}

