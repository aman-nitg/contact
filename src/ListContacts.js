import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends Component {
  state = { name: '', query: '' };

  handleChange = (event) => {
    this.setState({name: event.target.value})
  };

  updateQuery = (query) => {
    this.setState({query: query.trim()})
  };

  clearQuery = () => {
    this.setState({ query: '' })
  };

  render() {
    const { contacts, onDeleteContact } = this.props;
    const { name, query } = this.state;

    let showingContacts;
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      showingContacts = contacts.filter((contact) => match.test(contact.name))
    } else {
      showingContacts = contacts
    }

    showingContacts.sort(sortBy('name'));

    return (
      <div className='list-contacts'>

        <div className='list-contacts-top'>
          <input
            type="text"
            className='search-contacts'
            placeholder='Search Contacts'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
          <Link
            className='add-contact'
            to='/create'
          > Add Contact</Link>
        </div>

        { showingContacts.length !== contacts.length && (
          <div className='showing-contacts'>
            <span>Now showing {showingContacts.length} of {contacts.length} total</span>
            <button onClick={this.clearQuery}>Show all</button>
          </div>
        )}

        <ol className='contact-list'>
          {showingContacts.map((contact) => (
            <li key={contact.id} className='contact-list-item'>
              <div className='contact-avatar' style={{
                backgroundImage: `url(${contact.avatarURL})`
              }}/>
              <div className='contact-details'>
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
              <button onClick={() => onDeleteContact(contact)} className='contact-remove'>
                Remove
              </button>
            </li>
          ))}

          <div style={{textAlign: 'center', marginTop: 50}}>
            <form>
              <input type="text" value={name} onChange={this.handleChange} />
              <h1>{name}</h1>
            </form>
          </div>

        </ol>
      </div>
    )
  }
}

ListContacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired
};

export default ListContacts;