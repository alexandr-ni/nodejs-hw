import contactService from "../models/contacts.js";

import { ctrlWrapper } from "../decorators/index.js";

import { HttpError } from "../helpers/index.js";

const getListContacts = async (req, res) => {
  const allContacts = await contactService.getListContacts();

  res.json(allContacts);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactService.getContactById(contactId);
  if (!contact) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }

  res.json(contact);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactService.removeContact(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }

  res.json({
    message: "Delete success",
  });
};

const addContact = async (req, res) => {
  const result = await contactService.addContact(req.body);

  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactService.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }

  res.json(result);
};

export default {
  getListContacts: ctrlWrapper(getListContacts),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
};
