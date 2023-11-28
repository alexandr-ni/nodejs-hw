import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts.json");

const updateContacts = async (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const getListContacts = async () => {
  const result = await fs.readFile(contactsPath);

  return JSON.parse(result);
};

const getContactById = async (contactId) => {
  const contacts = await getListContacts();
  const result = contacts.find((contact) => contact.id === contactId);

  return result || null;
};

const removeContact = async (contactId) => {
  const contacts = await getListContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);

  await updateContacts(contacts);

  return result;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await getListContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await updateContacts(contacts);

  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await getListContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { ...contacts[index], ...body };
  await updateContacts(contacts);

  return contacts[index];
};

export default {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
