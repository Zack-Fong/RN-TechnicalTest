import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import LineComponent from './line';
import CircleComponent from './circle';

class Contact extends React.PureComponent {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPressContact}>
                <View style={{ margin: 5, marginLeft: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <CircleComponent />
                    <Text style={{ marginLeft: 5 }}>
                        {this.props.item.firstName + " " + this.props.item.lastName}
                    </Text>
                </View>

                {this.props.showLine ? <LineComponent /> : null}
            </TouchableOpacity>
        )
    }
}
export default Contact;