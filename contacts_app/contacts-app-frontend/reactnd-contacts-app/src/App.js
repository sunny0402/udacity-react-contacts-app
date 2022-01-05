import React, { Component } from "react";
import ListContacts from "./ListContacts";
import * as ContactsAPI from "./utils/ContactsAPI";

class App extends Component {
  // state will have a contacts property
  //When defining a component's initial state, avoid initializing that state with props
  /*
  state = {
    contacts: [
      {
        id: "karen",
        name: "Karen Isgrigg",
        handle: "karen_isgrigg",
        avatarURL: "http://localhost:5001/karen.jpg",
      },
      {
        id: "richard",
        name: "Richard Kalehoff",
        handle: "richardkalehoff",
        avatarURL: "http://localhost:5001/richard.jpg",
      },
      {
        id: "tyler",
        name: "Tyler McGinnis",
        handle: "tylermcginnis",
        avatarURL: "http://localhost:5001/tyler.jpg",
      },
    ],
  };
  */
  state = { contacts: [] };
  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState(() => ({ contacts }));
    });
  }
  removeContact = (contact) => {
    // pass set state a a function which will return an object
    // this object will be merge with current object in state
    this.setState((currentState) => ({
      contacts: currentState.contacts.filter((a_contact) => {
        //return an array with contacts, but with the one we passed removed
        return a_contact.id !== contact.id;
      }),
    }));
    //update backend database
    //restart server to get initial list of contacts
    ContactsAPI.remove(contact);
  };
  render() {
    return (
      <div>
        <ListContacts
          contacts={this.state.contacts}
          onDeleteContacts={this.removeContact}
        />
      </div>
    );
  }
}

export default App;
