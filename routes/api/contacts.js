// const express = require('express')
import express from 'express';
import * as contactsService from '../../models/contacts.js';
import { HttpError } from '../../helpers/index.js';
import Joi from "joi";

const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({ "any.required": "missing required name field" }),
  email: Joi.string().required().messages({ "any.required": "missing required name field" }),
  phone: Joi.string().required().messages({ "any.required": "missing required name field" }),
});

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const result = await contactsService.listContacts()
    res.json(result);
  } catch (error) {
    next(error);
  }

})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
      throw HttpError(404, error.message)
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);

  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw HttpError(404, error.message);
    }
    res.json({
      "message": "contact deleted"
    })
  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contactsService.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, { "message": "missing fields" });

    }

    res.json(result);

  } catch (error) {
    next(error);
  }
})

export default router;
