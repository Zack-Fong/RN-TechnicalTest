import * as types from "./contactActionTypes";

export const saveInitialContactsList = (initialContactsList) => (
    {
        type: types.SAVE_INITIAL_CONTACTS_LIST,
        initialContactsList: initialContactsList
    }
)

export const updateContactsList = (contactIndex, contactToBeUpdated) => (
    {
        type: types.UPDATE_CONTACTS_LIST,
        contactIndex,
        contactToBeUpdated
    }
)