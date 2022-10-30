import React, { useContext, useState, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const ContactForm = () => {
  const contactContext = useContext(ContactContext)
	const { addContact, clearCurrent, updateContact, current } = contactContext;
 
	useEffect(() => {
		if(current !== null){
			setContact(current)//setContact - fill the form with whatever we want
												// current - object complete contact whatever want i click for edit 
		}else{
			setContact ({
				name: "",
				email: "",
				phone: "",
				type: "personal"
			})
		}
	}, [contactContext, current])

	const [contact, setContact] = useState({
		name: "",
		email: "",
		phone: "",
		type: "personal",
	});

	const { name, email, phone, type } = contact;

  const onChange = e => setContact({ ...contact, [e.target.name]: e.target.value});

  const onSubmit = e => {
    e.preventDefault();
		// Validate email
		const isValidEmail = validateEmail(contact.email);
		if(isValidEmail) {
			if(current === null){
				addContact(contact);
			}else{
				updateContact(contact)
			}
		 clearAll()
		} else {
			alert('Your email is invalid!');
		}
  }

	const clearAll = () => {
		clearCurrent();
	}

	return (
		<form onSubmit={onSubmit}>
			<h2 className='text-primary'>{current ? 'Edit Contact' : 'Add Contact'}</h2>
			<input
				type='text'
				placeholder='Name'
				name='name'
				value={name}
				onChange={onChange}
			/>
			<input
				type='text'
				placeholder='Email'
				name='email'
				value={email}
				onChange={onChange}
			/>
			<input
				type='text'
				placeholder='Phone'
				name='phone'
				value={phone}
				onChange={onChange}
			/>
			<h5>Contact type</h5>
			<input
				type='radio'
				name='type'
				value='personal'
				checked={type === "personal"}
        onChange={onChange}
			/>
			Personal{" "}
			<input
				type='radio'
				name='type'
				value='professional'
				checked={type === "professional"}
        onChange={onChange}
			/>
			Professional
      <div>
        <input type="submit" value={current ? 'Update Contact' : 'Add Contact'} className="btn btn-primary btn-block"/>
      </div>
			{current && <div>
				<button className='btn btn-light btn-block' onClick={clearAll}>Clear</button>
			</div>}
		</form>
	);
};

export default ContactForm;
