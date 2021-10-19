import React from 'react';
import { SafeAreaView, Alert, View, Text, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { TEXT_CONSTANTS } from '../common/constants';
import { isObjectEmpty, isNumberEmpty, isStringEmpty, shadowCopyObject, isEqual } from '../common/commonFunctions';
import { COLORS } from '../common/colors';

import ActivityIndicatorComponent from '../components/activityIndicator';
import CircleComponent from "../components/circle";
import LineComponent from "../components/line";

class ScreenTwo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,

            contact: this.props.route.params?.contact,
            contactIndex: this.props.route.params?.contactIndex,

            tempFirstName: null,
            tempLastName: null,
            tempEmail: null,
            tempPhone: null
        }
    }

    componentDidMount() {
        if (isObjectEmpty(this.state.contact) || isNumberEmpty(this.state.contactIndex)) {
            Alert.alert(
                TEXT_CONSTANTS.OOPS,
                TEXT_CONSTANTS.LOAD_CONTACT_INFORMATION_ERROR,
                [
                    {
                        text: "Ok",
                        onPress: () => {
                            this.props.navigation.goBack();
                        },
                        style: "cancel",
                    },
                ])
        }
    }

    ////
    //Lack Validations, submit, update///
    ////

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss()
            }}>
                <KeyboardAwareScrollView
                    innerRef={ref => {
                        this.scroll = ref
                    }}
                    enableOnAndroid={true}
                    keyboardShouldPersistTaps={"handled"}
                    enableResetScrollToCoords={false}
                    contentContainerStyle={{ flex: 1 }}>
                    <SafeAreaView style={{ flex: 1 }}>
                        <ActivityIndicatorComponent
                            isShow={this.state.isLoading}
                        />

                        <View style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                            <CircleComponent
                                size={100}
                            />
                        </View>

                        <Text style={{ fontWeight: "700", margin: 10 }}>
                            {TEXT_CONSTANTS.MAIN_INFORMATION}
                        </Text>

                        <View style={{ backgroundColor: "white", marginTop: 10 }}>
                            <View style={{ flexDirection: "row", alignItems: 'center', margin: 5 }}>
                                <Text style={{ marginLeft: 10, width: '20%' }}>
                                    {TEXT_CONSTANTS.FIRST_NAME}
                                </Text>
                                <TextInput
                                    returnKeyType={"next"}
                                    style={{ borderWidth: 1, marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom: 5, height: 30, flex: 1, borderColor: COLORS.LIGHT_GRAY }}
                                    value={!isStringEmpty(this.state.tempFirstName) ? this.state.tempFirstName : (!isObjectEmpty(this.state.contact) ? " " + this.state.contact.firstName : "")}
                                    onChangeText={(firstName) => {
                                        this.setState({
                                            tempFirstName: firstName
                                        })
                                    }}
                                    onSubmitEditing={() => {
                                        this.lastNameTextInput.focus();
                                    }}
                                    onBlur={() => {
                                        if (!isEqual(this.state.tempFirstName, null)) {
                                            let contact = shadowCopyObject(this.state.contact);
                                            contact.firstName = !isStringEmpty(this.state.tempFirstName) ? this.state.tempFirstName.substring(1) : "";

                                            this.setState({
                                                contact: contact,
                                                tempFirstName: null
                                            })
                                        }
                                    }}
                                    blurOnSubmit={false}
                                />
                            </View>
                            <LineComponent />
                            <View style={{ flexDirection: "row", alignItems: 'center', margin: 5 }}>
                                <Text style={{ marginLeft: 10, width: '20%' }}>
                                    {TEXT_CONSTANTS.LAST_NAME}
                                </Text>
                                <TextInput
                                    returnKeyType={'next'}
                                    ref={(input) => { this.lastNameTextInput = input; }}
                                    style={{ borderWidth: 1, marginLeft: 10, marginRight: 10, marginTop: 5, marginBottom: 10, height: 30, flex: 1, borderColor: COLORS.LIGHT_GRAY }}
                                    value={!isStringEmpty(this.state.tempLastName) ? this.state.tempLastName : (!isObjectEmpty(this.state.contact) ? " " + this.state.contact.lastName : "")}
                                    onChangeText={(lastName) => {
                                        this.setState({
                                            tempLastName: lastName
                                        })
                                    }}
                                    onSubmitEditing={() => {
                                        this.emailTextInput.focus();
                                    }}
                                    onBlur={() => {
                                        if (!isEqual(this.state.tempLastName, null)) {
                                            let contact = shadowCopyObject(this.state.contact);
                                            contact.lastName = !isStringEmpty(this.state.tempLastName) ? this.state.tempLastName.substring(1) : "";

                                            this.setState({
                                                contact: contact,
                                                tempLastName: null
                                            })
                                        }
                                    }}
                                    blurOnSubmit={false}
                                />
                            </View>
                        </View>

                        <Text style={{ fontWeight: "700", margin: 10 }}>
                            {TEXT_CONSTANTS.SUB_INFORMATION}
                        </Text>

                        <View style={{ backgroundColor: "white", marginTop: 10 }}>
                            <View style={{ flexDirection: "row", alignItems: 'center', margin: 5 }}>
                                <Text style={{ marginLeft: 10, width: '20%' }}>
                                    {TEXT_CONSTANTS.EMAIL}
                                </Text>
                                <TextInput
                                    returnKeyType={"next"}
                                    ref={(input) => { this.emailTextInput = input; }}
                                    style={{ borderWidth: 1, marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom: 5, height: 30, flex: 1, borderColor: COLORS.LIGHT_GRAY }}
                                    value={!isStringEmpty(this.state.tempEmail) ? this.state.tempEmail : (!isObjectEmpty(this.state.contact) && !isStringEmpty(this.state.contact.email) ? " " + this.state.contact.email : "")}
                                    onChangeText={(email) => {
                                        this.setState({
                                            tempEmail: email
                                        })
                                    }}
                                    onSubmitEditing={() => {
                                        this.phoneTextInput.focus();
                                    }}
                                    onBlur={() => {
                                        if (!isEqual(this.state.tempEmail, null)) {
                                            let contact = shadowCopyObject(this.state.contact);
                                            contact.email = !isStringEmpty(this.state.tempEmail) ? this.state.tempEmail.substring(1) : "";
                                            this.setState({
                                                contact: contact,
                                                tempEmail: null
                                            })
                                        }
                                    }}
                                    blurOnSubmit={false}
                                />
                            </View>
                            <LineComponent />
                            <View style={{ flexDirection: "row", alignItems: 'center', margin: 5 }}>
                                <Text style={{ marginLeft: 10, width: '20%' }}>
                                    {TEXT_CONSTANTS.PHONE}
                                </Text>
                                <TextInput
                                    ref={(input) => { this.phoneTextInput = input; }}
                                    style={{ borderWidth: 1, marginLeft: 10, marginRight: 10, marginTop: 5, marginBottom: 10, height: 30, flex: 1, borderColor: COLORS.LIGHT_GRAY }}
                                    value={!isStringEmpty(this.state.tempPhone) ? this.state.tempPhone : (!isObjectEmpty(this.state.contact) && !isStringEmpty(this.state.contact.phone) ? " " + this.state.contact.phone : "")}
                                    onChangeText={(phone) => {
                                        this.setState({
                                            tempPhone: phone
                                        })
                                    }}
                                    onBlur={() => {
                                        if (!isEqual(this.state.tempPhone, null)) {
                                            let contact = shadowCopyObject(this.state.contact);
                                            contact.phone = !isStringEmpty(this.state.tempPhone) ? this.state.tempPhone.substring(1) : "";

                                            this.setState({
                                                contact: contact,
                                                tempPhone: null
                                            })
                                        }
                                    }}
                                />
                            </View>
                        </View>
                    </SafeAreaView>
                </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>
        )
    }
}
export default ScreenTwo;