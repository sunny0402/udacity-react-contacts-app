import React, { Component } from "react";
import ListContacts from "./ListContacts";
import * as ContactsAPI from "./utils/ContactsAPI";
import CreateContact from "./CreateContact";
import { Route } from "react-router-dom";

class App extends Component {
  state = { contacts: [] };
  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      console.log(contacts);
      this.setState(() => ({ contacts }));
    });
  }
  removeContact = (contact) => {
    this.setState((currentState) => ({
      contacts: currentState.contacts.filter((a_contact) => {
        //return an array with contacts, but with the one we passed removed
        return a_contact.id !== contact.id;
      }),
    }));
    //update backend database, restart server to get initial list of contacts
    ContactsAPI.remove(contact);
  };
  createContact = (contact) => {
    ContactsAPI.create(contact).then((contact) => {
      this.setState((oldState) => ({
        contacts: oldState.contacts.concat([contact]),
      }));
    });
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
        {/* history prop provided by React Router */}
        {/* navigate to homepage after creating contact */}
        <Route
          path="/create"
          render={({ history }) => (
            <CreateContact
              onCreateContact={(contact) => {
                this.createContact(contact);
                history.push("/");
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
