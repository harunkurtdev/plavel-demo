import React from 'react';
import { View, Text } from 'react-native';

const AppBar = ({ title }) => {
    return (
        <View style={styles.appBar}>
            <Text style={styles.appBarTitle}>{title}</Text>
        </View>
    );
};

const BottomAppBar = ({ children }) => {
    return <View style={styles.bottomAppBar}>{children}</View>;
};

const FloatingActionButton = ({ onPress, children }) => {
    return (
        <TouchableOpacity style={styles.fab} onPress={onPress}>
            {children}
        </TouchableOpacity>
    );
};

const Drawer = ({ children }) => {
    return <View style={styles.drawer}>{children}</View>;
};

const BottomNavigationBar = ({ children }) => {
    return <View style={styles.bottomNavigationBar}>{children}</View>;
};

const BottomSheet = ({ children }) => {
    return <View style={styles.bottomSheet}>{children}</View>;
};

const SnackBar = ({ message, action }) => {
    return (
        <View style={styles.snackBar}>
            <Text style={styles.snackBarText}>{message}</Text>
            {action && <TouchableOpacity onPress={action}>{action}</TouchableOpacity>}
        </View>
    );
};

const MaterialBanner = ({ message }) => {
    return (
        <View style={styles.materialBanner}>
            <Text style={styles.materialBannerText}>{message}</Text>
        </View>
    );
};

const Scaffold = ({ appBarTitle, appBarContent, body, bottomBarContent }) => {
    return (
        <View style={styles.container}>
            {/* App Bar */}
            <AppBar title={"appBarTitle"} />

            {/* Body */}
            <View style={styles.body}><Text> Hello</Text></View>

            {/* Bottom Bar */}
            <BottomAppBar>{bottomBarContent}</BottomAppBar>
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
    },
    appBar: {
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    appBarTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    body: {
        flex: 1,
        padding: 16,
    },
    bottomAppBar: {
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    fab: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
    },
    drawer: {
        // Styles for the drawer
    },
    bottomNavigationBar: {
        // Styles for the bottom navigation bar
    },
    bottomSheet: {
        // Styles for the bottom sheet
    },
    snackBar: {
        // Styles for the snack bar
    },
    snackBarText: {
        // Styles for the snack bar text
    },
    materialBanner: {
        // Styles for the material banner
    },
    materialBannerText: {
        // Styles for the material banner text
    },
};

export default Scaffold;
