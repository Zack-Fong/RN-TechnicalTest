import * as types from "./contactActionTypes";

let INITIAL_STATE = {
    contactsList: []
}

let contactReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.SAVE_INITIAL_CONTACTS_LIST:
            return {
                ...state,
                contactsList: action.initialContactsList
            }

        case types.UPDATE_CONTACTS_LIST:
            let contactsList = [...state.contactsList];
            contactsList[action.contactIndex] = action.contactToBeUpdated;

            return {
                ...state,
                contactsList: contactsList
            }

        default:
            return state;
    }
}

export default contactReducer;