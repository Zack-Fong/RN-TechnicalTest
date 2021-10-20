import React from 'react';
import { Text, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ScreenOne from '../screens/ScreenOne';
import ScreenTwo from '../screens/ScreenTwo';

import { COLORS } from '../common/colors';
import { TEXT_CONSTANTS } from '../common/constants';
import { images } from '../assets/assets';

const MainStack = createNativeStackNavigator();

class MainNavigator extends React.PureComponent {
    render() {
        return (
            <MainStack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#EFEFEF'
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center'
                }}
            >
                <MainStack.Screen
                    name="ScreenOne"
                    component={ScreenOne}
                    options={{
                        title: TEXT_CONSTANTS.SCREEN_ONE_TITLE,
                        headerRight: () => (
                            <Image
                                style={{
                                    tintColor: COLORS.ORANGE,
                                    width: 25,
                                    height: 25
                                }}
                                source={images.plus}
                            />
                        ),
                        headerLeft: () => (
                            <Image
                                style={{
                                    tintColor: COLORS.ORANGE,
                                    width: 25,
                                    height: 25
                                }}
                                source={images.search}
                            />
                        )
                    }}
                />
                <MainStack.Screen
                    name="ScreenTwo"
                    component={ScreenTwo}
                    options={({ navigation, route }) => ({
                        title: 'Contacts',
                        headerLeft: () => (
                            <Text style={{ color: COLORS.ORANGE }} onPress={() => {
                                navigation.goBack();
                            }}>
                                {TEXT_CONSTANTS.CANCEL}
                            </Text>
                        )
                    })}
                />
            </MainStack.Navigator>
        )
    }
}
export default MainNavigator;