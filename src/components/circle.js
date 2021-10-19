import React from 'react';
import { View } from 'react-native';

import { COLORS } from '../common/colors';
import { isNumberEmpty } from '../common/commonFunctions';

class CircleComponent extends React.PureComponent {
    render() {
        return (
            <View style={{ height: !isNumberEmpty(this.props.size) ? this.props.size : 40, width: !isNumberEmpty(this.props.size) ? this.props.size : 40, borderRadius: (!isNumberEmpty(this.props.size) ? this.props.size : 40) / 2, backgroundColor: COLORS.ORANGE, borderColor: COLORS.ORANGE }} />
        )
    }
}
export default CircleComponent;