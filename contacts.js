const fs = require("fs/promises");
const path = require("path");

const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const contactsList = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await contactsList();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const contacts = await contactsList();
  const updetedList = contacts.filter((contact) => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(updetedList, null, 2));
  const result = `Contact with id ${contactId} was successfully deleted`;
  return console.log(result);
};

const addContact = async (data) => {
  const contacts = await contactsList();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = { contactsList, getContactById, removeContact, addContact };
