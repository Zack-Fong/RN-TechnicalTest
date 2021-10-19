import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

class ActivityIndicatorComponent extends React.PureComponent {
    render() {
        if (this.props.isShow) {
            return (
                <View style={styles.container}>
                    <View style={styles.indicator} />
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            zIndex: 2000,
                            alignItems: "center"
                        }}
                    >
                        <ActivityIndicator size="large" color="white" />
                    </View>
                </View>
            );
        }
        return null;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center"
    },
    indicator: {
        flex: 1,
        position: "absolute",
        zIndex: 1000,
        backgroundColor: "black",
        opacity: 0.3,
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    }
});

export default ActivityIndicatorComponent;