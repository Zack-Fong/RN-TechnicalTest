import React from 'react';
import { RefreshControl, SafeAreaView, FlatList } from 'react-native';
import { connect } from 'react-redux';

import store from '../redux/store';
import { saveInitialContactsList } from '../redux/contact/contactActions';

import { isArrayEmpty, isEqual } from '../common/commonFunctions';

import ActivityIndicatorComponent from '../components/activityIndicator';
import Contact from '../components/contact';

const mapStateToProps = state => {
    return {
        contactsList: state.contactReducer.contactsList
    };
};
const contactsListData = require("../../json/data.json");

class ScreenOne extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isRefreshing: false
        }
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        }, () => {
            store.dispatch(saveInitialContactsList(contactsListData));

            this.setState({
                isLoading: false
            })
        })
    }

    handleRefresh = () => {
        this.setState({
            isLoading: true,
            isRefreshing: true
        }, () => {
            store.dispatch(saveInitialContactsList(contactsListData));

            this.setState({
                isLoading: false,
                isRefreshing: false
            })
        })
    }

    renderContactsList = ({ item, index }) => {
        return (
            <Contact
                item={item}
                firstContact={isEqual(index, 0)}
                showLine={!isArrayEmpty(this.props.contactsList) && this.props.contactsList.length > 1 && !isEqual(this.props.contactsList.length - 1, index)}
                onPressContact={() => {
                    this.props.navigation.navigate("ScreenTwo", {
                        contact: item,
                        contactIndex: index
                    });
                }}
            />
        )
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <ActivityIndicatorComponent
                    isShow={this.state.isLoading}
                />

                <FlatList
                    data={this.props.contactsList}
                    renderItem={this.renderContactsList}
                    keyExtractor={item => item.id}
                    refreshControl={
                        <RefreshControl
                            onRefresh={() => {
                                this.handleRefresh()
                            }}
                            refreshing={this.state.isRefreshing}
                            enabled={true}
                            title={"Release to refresh"}
                        />
                    }
                />
            </SafeAreaView>
        )
    }
}
export default connect(mapStateToProps)(ScreenOne);