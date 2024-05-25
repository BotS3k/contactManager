import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/contacts/NavBar";
import ContactList from "./components/contacts/ContactList";
import AddContacts from "./components/contacts/AddContacts";
import ViewContacts from "./components/contacts/ViewContacts";
import EditContacts from "./components/contacts/EditContacts";

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/contacts/list" />} />
        <Route path="/contacts/list" element={<ContactList />} />
        <Route path="/contacts/add" element={<AddContacts />} />
        <Route path="/contacts/view/:contactId" element={<ViewContacts />} />
        <Route path="/contacts/edit/:contactId" element={<EditContacts />} />
      </Routes>
    </div>
  );
};

export default App;
