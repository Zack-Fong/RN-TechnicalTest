import React from 'react';
import { View } from 'react-native';

import { COLORS } from '../common/colors';

class LineComponent extends React.PureComponent {
    render() {
        return (
            <View
                style={{
                    borderBottomColor: COLORS.LIGHT_GRAY,
                    borderBottomWidth: 1,
                    margin: 10
                }}
            />
        )
    }
}
export default LineComponent;