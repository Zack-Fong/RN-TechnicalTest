import { COLORS } from '../common/colors';
import { TEXT_CONSTANTS } from '../common/constants';

class ErrorMessage extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Text style={{
                color: COLORS.RED, marginTop: this.props.forOtherInputComponent ? -5 : -15, marginLeft: 15, fontSize: 10
            }}>
                {''}
            </Text>
        )
    }
}
export default ErrorMessage;