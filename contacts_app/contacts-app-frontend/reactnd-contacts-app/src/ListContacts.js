import React, { Component, useLayoutEffect } from "react";
import PropTypes from "prop-types";

/*
If a component is only using a render method to display content, 
then it can be converted into a Stateless Functional Component.
function ListContacts(props) {
*/
class ListContacts extends Component {
  static propTypes = {
    contact: PropTypes.array.isRequired,
    onDeleteContacts: PropTypes.func.isRequired,
  };

  state = {
    query: "",
  };

  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim(),
    }));
  };

  clearQuery = () => {
    this.updateQuery("");
  };

  render() {
    const { query } = this.state;
    const { contacts, onDeleteContacts, onNavigate } = this.props;

    //the search feature, only include that have same characters as in query
    const showingContacts =
      query === ""
        ? contacts
        : contacts.filter((c) =>
            c.name.toLowerCase().includes(query.toLocaleLowerCase())
          );

    return (
      <div className="list-contacts">
        {JSON.stringify(this.state)}
        <div className="list-contacts-top">
          <input
            className="search-contacts"
            type="text"
            placeholder="search ..."
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
          <a href="#create" onClick={onNavigate} className="add-contact">
            Add a Contact
          </a>
        </div>

        {/* some of the contacts have been filtered if 
        showContacts not same as the entire contacts list */}

        {/* guard up operator && 
            div only rendered if the statement 
            before && is truthy */}

        {showingContacts.length !== contacts.length && (
          <div className="showing-contacts">
            <span>
              Now showing contacts {showingContacts.length} of {contacts.length}
            </span>
            <button onClick={this.clearQuery}>Show All</button>
          </div>
        )}

        <ol className="contact-list">
          {showingContacts.map((contact) => (
            <li key={contact.id}>
              {contact.name}
              <div
                className="contacts-avatar"
                style={{ backgroundImage: `url(${contact.avatarURL})` }}
              />
              <div className="contact-details">
                <p>{contact.name}</p>
                <p>{contact.handle}</p>
              </div>
              <button
                onClick={() => onDeleteContacts(contact)}
                className="contact-remove"
              >
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

// ListContacts.PropTypes = {
//   contact: PropTypes.array.isRequired,
//   onDeleteContacts: PropTypes.func.isRequired,
// };
export default ListContacts;
