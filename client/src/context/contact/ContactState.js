import React, {useReducer} from "react";
import { v4 } from 'uuid';
import contactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types' 

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Jill Johns",
        email: "Jill@gmail.com",
        phone: "111-111-111",
        type: "personal"
      },
      {
        id: 2,
        name: "Sara Watson",
        email: "Sahra@gmail.com",
        phone: "222-222-222",
        type: "personal"
      },
      {
        id: 3,
        name: "Hary White",
        email: "Hary@gmail.com",
        phone: "333-333-333",
        type: "professional"
      }
    ],
    current: null,
    filtered: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add contact
  const addContact = contact => {
    contact.id = v4();
    dispatch({ type: ADD_CONTACT, payload: contact })
  }

  // Delete contact
  const deleteContact = id => {
    dispatch({ type: DELETE_CONTACT, payload: id })
  }
  // Set current contact
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact })
  }
  // Clear current contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT })
  }
  // Update  Contact
  const updateContact = contact => {
    dispatch({ type: UPDATE_CONTACT, payload: contact })
  }
  // Filter Contacts
  const filterContact = text => {
    dispatch({ type: FILTER_CONTACTS, payload: text })
  }
  // Clear Filter
  const clearFilter = text => {
    dispatch({ type: CLEAR_FILTER, payload: text })
  }

  return(

    // entire app da stating accessible bolmasyny saglayar
    <contactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact, 
        filterContact,
        clearFilter
      }}
    >
      {props.children} 
    {/*ichine goyulyan componentlary pass edyar*/}
    </contactContext.Provider>
  )
}

export default ContactState