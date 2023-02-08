const fs = require('fs').promises;
const path = require('path');
const crypro = require('crypto');

const contactsPath = path.resolve(__dirname, 'db', 'contacts.json');

async function listContacts() {
  try {
    const file = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(file);
    console.table(contacts);

    return contacts;
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(item => item.id === contactId);
    console.log(contact);

    return contact;
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contact = contacts.filter(item => item.id !== contactId);

  console.log(contact);
  await fs.writeFile(contactsPath, JSON.stringify(contact), 'utf8');

  try {
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();

    const newContact = { id: crypro.randomUUID(), name, email, phone };
    const contactsList = JSON.stringify([newContact, ...contacts]);

    await fs.writeFile(contactsPath, contactsList, 'utf8');
    console.log(newContact);

    return newContact;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
