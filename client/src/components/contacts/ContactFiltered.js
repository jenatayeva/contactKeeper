import React, { useContext, useRef, useEffect, useState } from 'react'
import ContactContext from '../../context/contact/contactContext'

const ContactFiltered = () => {
  const contactContext = useContext(ContactContext)
  const text = useRef(''); //elemnti baglayar 

  const {filterContact, clearFilter, filtered} = contactContext
  useEffect(() => {
    if(filtered === null){
      text.current.value = '';
    }
  }, [])

  const onChange = e => {
    if (text.current.value !== '') {
      filterContact(e.target.value)
    } else {
      clearFilter()
    }
  }
  return (
    <form>
      <input ref={text} type='text' placeholder="Filter Contacts..." onChange={onChange}/>
    </form>
  )
}

export default ContactFiltered