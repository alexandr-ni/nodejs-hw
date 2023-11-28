import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import { isEmptyBody } from "../../middlewares/index.js";

import { validaterBody } from "../../decorators/index.js";

import {
  contactAddSchema,
  contactUpdateSchema,
} from "../../schemas/contact-schema.js";

const router = express.Router();

router.get("/", contactsController.getListContacts);

router.get("/:contactId", contactsController.getContactById);

router.post(
  "/",
  isEmptyBody,
  validaterBody(contactAddSchema),
  contactsController.addContact
);

router.delete("/:contactId", contactsController.removeContact);

router.put(
  "/:contactId",
  isEmptyBody,
  validaterBody(contactUpdateSchema),
  contactsController.updateContact
);

export default router;
