import React from "react";
import { Text } from "react-native";

import { COLORS } from '../common/colors';
import { TEXT_CONSTANTS } from '../common/constants';
import { isEqual } from "../common/commonFunctions";

class ErrorMessageComponent extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Text style={{
                color: COLORS.RED, marginTop: this.props.forOtherInputComponent ? -5 : -10, marginLeft: 10, marginBottom: 5, fontSize: 10
            }}>
                {isEqual(this.props.type, TEXT_CONSTANTS.FIRST_NAME) ? TEXT_CONSTANTS.EMPTY_FIRST_NAME_ERROR :
                    isEqual(this.props.type, TEXT_CONSTANTS.LAST_NAME) ? TEXT_CONSTANTS.EMPTY_LAST_NAME_ERROR :
                        isEqual(this.props.type, TEXT_CONSTANTS.EMAIL) ? TEXT_CONSTANTS.INVALID_EMAIL_ERROR :
                            isEqual(this.props.type, TEXT_CONSTANTS.PHONE) ? TEXT_CONSTANTS.INVALID_PHONE_ERROR :
                                ''}
            </Text>
        )
    }
}
export default ErrorMessageComponent;