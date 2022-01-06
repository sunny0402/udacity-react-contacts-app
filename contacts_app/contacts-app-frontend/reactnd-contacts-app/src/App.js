import React, { Component } from "react";
import ListContacts from "./ListContacts";
import * as ContactsAPI from "./utils/ContactsAPI";
import CreateContact from "./CreateContact";

class App extends Component {
  state = { contacts: [], screen: "list" };
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
        {/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#Short-circuit_evaluation */}
        {/* short circuit evaluation expr1 && expr2 if expr1 is true then expr2 is evaluated */}
        {this.state.screen === "list" && (
          <ListContacts
            contacts={this.state.contacts}
            onDeleteContacts={this.removeContact}
            onNavigate={() => {
              this.setState(() => ({
                screen: "create",
              }));
            }}
          />
        )}
        {this.state.screen === "create" && <CreateContact />}
      </div>
    );
  }
}

export default App;
