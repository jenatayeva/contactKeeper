import React, {useReducer} from "react";
import contactContext from "./contactContext";
import contactReducer from "./contactReducer";
import axios from 'axios'
import {
  ADD_CONTACT,
  GET_CONTACT,
  CLEAR_CONTACTS,
  CONTACT_ERROR,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types' 


const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  //Get Contacts
  const getContact = async contact => {
    try {
      const res = await axios.get('/api/contacts')
      dispatch({ type: GET_CONTACT, payload: res.data })
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg
      })
    }
  }

  // Add contact
  const addContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.post('/api/contacts', contact, config)
      dispatch({ type: ADD_CONTACT, payload: res.data })
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg
      })
    }
  }
  //Clear contacts
  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS })
  }
  // Delete contact
  const deleteContact = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`)
      dispatch({ type: DELETE_CONTACT, payload: id })
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg
      })
    }
  }

  // Update  Contact
  const updateContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.put(`/api/contacts/${contact._id}`, contact, config)
      dispatch({ type: UPDATE_CONTACT, payload: res.data })

    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg
      })
    }
  }

  // Set current contact
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact })
  }
  // Clear current contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT })
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
        error: state.error,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact, 
        filterContact,
        clearFilter,
        getContact,
        clearContacts
      }}
    >
      {props.children} 
    {/*ichine goyulyan componentlary pass edyar*/}
    </contactContext.Provider>
  )
}

export default ContactState