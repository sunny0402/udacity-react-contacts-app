import React, { Component } from "react";
import ListContacts from "./ListContacts";
import * as ContactsAPI from "./utils/ContactsAPI";
import CreateContact from "./CreateContact";
import { Route } from "react-router-dom";

class App extends Component {
  state = { contacts: [] };
  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState(() => ({ contacts }));
    });
  }
  removeContact = (contact) => {
    // pass set state a a function which will return an object
    // this object will be merged with current object in state
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
        <Route
          exact
          path="/"
          render={() => (
            <ListContacts
              contacts={this.state.contacts}
              onDeleteContacts={this.removeContact}
            />
          )}
        />
        <Route path="/create" component={CreateContact} />
      </div>
    );
  }
}

export default App;
