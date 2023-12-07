import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import { isEmptyBody, isValidId } from "../../middlewares/index.js";

import { validaterBody } from "../../decorators/index.js";

import {
  contactAddSchema,
  contactFavoriteSchema,
  contactUpdateSchema,
} from "../../models/Contact.js";

const router = express.Router();

router.get("/", contactsController.getListContacts);

router.get("/:contactId", isValidId, contactsController.getContactById);

router.post(
  "/",
  isEmptyBody,
  validaterBody(contactAddSchema),
  contactsController.addContact
);

router.delete("/:contactId", isValidId, contactsController.removeContact);

router.put(
  "/:contactId",
  isEmptyBody,
  validaterBody(contactUpdateSchema),
  contactsController.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBody,
  validaterBody(contactFavoriteSchema),
  contactsController.updateContact
);

export default router;
