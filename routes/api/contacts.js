// const express = require('express')
import express from 'express';
import * as contactsService from '../../models/contacts.js';
import { HttpError } from '../../helpers/index.js';

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
      throw HttpError(404, "Not found")
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const result = await contactsService.addContact(req.body);
    if (!result) {
      throw HttpError(400, "missing required name field")
    }
    res.status(201).json(result);

  } catch (error) {
    next(error);
  }
  // res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

export default router;
