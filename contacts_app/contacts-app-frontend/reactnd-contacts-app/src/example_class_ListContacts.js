import React, { Component, useLayoutEffect } from "react";

class ListContacts extends Component {
  render() {
    console.log("Functions have arguments. Components have props.");
    console.log("<Clock currentTime = {new Date().getTime()}");
    console.log("the props being passed to the component are: ", this.props);
    console.log(
      "use parentheses not curly braces to get implicit return of arrow fns."
    );
    return (
      <ol className="contact-list">
        {this.props.contacts.map((contact) => (
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
            <button className="contact-remove">Remove</button>
          </li>
        ))}
      </ol>
    );
  }
}

export default ListContacts;
