import Contact from "../models/Contact.js";

import { ctrlWrapper } from "../decorators/index.js";

import { HttpError } from "../helpers/index.js";

const getListContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, ...filterParams } = req.query;
  const skip = (page - 1) * limit;
  const filter = { owner, ...filterParams };

  const allContacts = await Contact.find(filter, "", {
    skip,
    limit,
  }).populate("owner", "email");

  res.json(allContacts);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const contact = await Contact.findOne({ _id: contactId, owner });
  if (!contact) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }

  res.json(contact);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndDelete({ _id: contactId, owner });
  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }

  res.json({
    message: "Delete success",
  });
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });

  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body
  );
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
