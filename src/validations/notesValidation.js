import Joi from "joi";
import { isValidObjectId } from "mongoose";
import { TAGS } from "../constants/tags.js";

export const getAllNotesSchema = {
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),

    perPage: Joi.number().integer().min(5).max(20).default(10),

    tag: Joi.string()
      .valid(...TAGS)
      .optional(),

    search: Joi.string().allow("").optional(),
  }),
};

export const noteIdSchema = {
  params: Joi.object({
    noteId: Joi.string().custom((value, helpers) => {
      if (!isValidObjectId(value)) {
        return helpers.message("Invalid noteId");
      }
      return value;
    }),
  }),
};

export const createNoteSchema = {
  body: Joi.object({
    title: Joi.string().min(1).required(),

    content: Joi.string().allow("").optional(),

    tag: Joi.string()
      .valid(...TAGS)
      .optional(),
  }),
};

export const updateNoteSchema = {
  params: noteIdSchema.params,

  body: Joi.object({
    title: Joi.string().min(1).optional(),

    content: Joi.string().allow("").optional(),

    tag: Joi.string()
      .valid(...TAGS)
      .optional(),
  }).min(1),
};
