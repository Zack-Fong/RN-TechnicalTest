import React from 'react';
import { SafeAreaView, Alert, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { TEXT_CONSTANTS } from '../common/constants';
import { isObjectEmpty, isNumberEmpty, isStringEmpty, shadowCopyObject, isEqual, validateEmail, validatePhone } from '../common/commonFunctions';
import { COLORS } from '../common/colors';

import ActivityIndicatorComponent from '../components/activityIndicator';
import CircleComponent from "../components/circle";
import LineComponent from "../components/line";
import ErrorMessageComponent from "../components/errorMessage";

import store from '../redux/store';
import { updateContactsList } from '../redux/contact/contactActions';

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
            tempPhone: null,

            firstNameError: false,
            lastNameError: false,
            emailError: false,
            phoneError: false
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
        else {
            this.props.navigation.setOptions({
                headerRight: () => (
                    <Text style={{ color: COLORS.ORANGE }} onPress={this.onPressSaveButton}>
                        {TEXT_CONSTANTS.SAVE}
                    </Text>
                ),
            })
        }
    }

    validate = () => {
        let validationErrorsPresent = false;

        let firstNameError = isStringEmpty(this.state.contact.firstName);
        let lastNameError = isStringEmpty(this.state.contact.lastName);
        let emailError = !isStringEmpty(this.state.contact.email) ? !validateEmail(this.state.contact.email) : false;
        let phoneError = !isStringEmpty(this.state.contact.phone) ? !validatePhone(this.state.contact.phone) : false;

        if (firstNameError || lastNameError || emailError || phoneError) {
            validationErrorsPresent = true;
        }

        this.setState({
            isLoading: validationErrorsPresent ? false : true,

            firstNameError: firstNameError,
            lastNameError: lastNameError,
            emailError: emailError,
            phoneError: phoneError
        })
        return;
    }

    onPressSaveButton = () => {
        this.setState({
            isLoading: true
        }, () => {
            let validationErrors = this.validate();
            if (validationErrors) {
                return;
            }

            store.dispatch(updateContactsList(this.state.contactIndex, this.state.contact));
            this.props.navigation.goBack();
        })
    }

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
                                <View style={{ flexDirection: 'column', flex: 1 }}>
                                    <TextInput
                                        returnKeyType={"next"}
                                        editable={!this.state.isLoading}
                                        selectTextOnFocus={!this.state.isLoading}
                                        style={{ borderWidth: 1, marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom: 5, height: 50, borderColor: COLORS.LIGHT_GRAY }}
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
                                                    tempFirstName: null,

                                                    firstNameError: isStringEmpty(contact.firstName)
                                                })
                                            } else {
                                                this.setState({
                                                    firstNameError: isStringEmpty(this.state.contact.firstName)
                                                })
                                            }
                                        }}
                                        blurOnSubmit={false}
                                    />
                                    {this.state.firstNameError ?
                                        <ErrorMessageComponent
                                            forOtherInputComponent
                                            type={TEXT_CONSTANTS.FIRST_NAME} /> : null}
                                </View>
                            </View>
                            <LineComponent />
                            <View style={{ flexDirection: "row", alignItems: 'center', margin: 5 }}>
                                <Text style={{ marginLeft: 10, width: '20%' }}>
                                    {TEXT_CONSTANTS.LAST_NAME}
                                </Text>


                                <View style={{ flexDirection: 'column', flex: 1 }}>
                                    <TextInput
                                        returnKeyType={'next'}
                                        editable={!this.state.isLoading}
                                        selectTextOnFocus={!this.state.isLoading}
                                        ref={(input) => { this.lastNameTextInput = input; }}
                                        style={{ borderWidth: 1, marginLeft: 10, marginRight: 10, marginTop: 5, marginBottom: 10, height: 50, borderColor: COLORS.LIGHT_GRAY }}
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
                                                    tempLastName: null,

                                                    lastNameError: isStringEmpty(contact.lastName)
                                                })
                                            } else {
                                                this.setState({
                                                    lastNameError: isStringEmpty(this.state.contact.lastName)
                                                })
                                            }
                                        }}
                                        blurOnSubmit={false}
                                    />
                                    {this.state.lastNameError ?
                                        <ErrorMessageComponent
                                            type={TEXT_CONSTANTS.LAST_NAME} /> : null}
                                </View>
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

                                <View style={{ flexDirection: 'column', flex: 1 }}>
                                    <TextInput
                                        returnKeyType={"next"}
                                        editable={!this.state.isLoading}
                                        selectTextOnFocus={!this.state.isLoading}
                                        ref={(input) => { this.emailTextInput = input; }}
                                        style={{ borderWidth: 1, marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom: 5, height: 50, borderColor: COLORS.LIGHT_GRAY }}
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
                                                    tempEmail: null,

                                                    emailError: !isStringEmpty(contact.email) ? !validateEmail(contact.email) : false
                                                })
                                            } else {
                                                this.setState({
                                                    emailError: !isStringEmpty(this.state.contact.email) ? !validateEmail(this.state.contact.email) : false
                                                })
                                            }
                                        }}
                                        blurOnSubmit={false}
                                    />
                                    {this.state.emailError ?
                                        <ErrorMessageComponent
                                            forOtherInputComponent
                                            type={TEXT_CONSTANTS.EMAIL} /> : null}
                                </View>
                            </View>

                            <LineComponent />

                            <View style={{ flexDirection: "row", alignItems: 'center', margin: 5 }}>
                                <Text style={{ marginLeft: 10, width: '20%' }}>
                                    {TEXT_CONSTANTS.PHONE}
                                </Text>

                                <View style={{ flexDirection: 'column', flex: 1 }}>
                                    <TextInput
                                        ref={(input) => { this.phoneTextInput = input; }}
                                        editable={!this.state.isLoading}
                                        selectTextOnFocus={!this.state.isLoading}
                                        style={{ borderWidth: 1, marginLeft: 10, marginRight: 10, marginTop: 5, marginBottom: 10, height: 50, borderColor: COLORS.LIGHT_GRAY }}
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
                                                    tempPhone: null,

                                                    phoneError: !isStringEmpty(contact.phone) ? !validatePhone(contact.phone) : false
                                                })
                                            } else {
                                                this.setState({
                                                    phoneError: !isStringEmpty(this.state.contact.phone) ? !validatePhone(this.state.contact.phone) : false
                                                })
                                            }
                                        }}
                                    />

                                    {this.state.phoneError ?
                                        <ErrorMessageComponent
                                            type={TEXT_CONSTANTS.PHONE} /> : null}
                                </View>

                            </View>
                        </View>
                    </SafeAreaView>
                </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>
        )
    }
}
export default ScreenTwo;