import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import {
  authenticate,
  isEmptyBody,
  isValidId,
} from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";

import {
  contactAddSchema,
  contactFavoriteSchema,
  contactUpdateSchema,
} from "../../models/Contact.js";

const router = express.Router();

router.use(authenticate);

router.get("/", contactsController.getListContacts);

router.get("/:contactId", isValidId, contactsController.getContactById);

router.post(
  "/",
  isEmptyBody,
  validateBody(contactAddSchema),
  contactsController.addContact
);

router.delete("/:contactId", isValidId, contactsController.removeContact);

router.put(
  "/:contactId",
  isEmptyBody,
  validateBody(contactUpdateSchema),
  contactsController.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBody,
  validateBody(contactFavoriteSchema),
  contactsController.updateContact
);

export default router;
