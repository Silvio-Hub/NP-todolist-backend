import { object, string } from "yup";

export const GetSchema = object().shape({
  status: string()
    .required()
    .test("isValid", (status) => {
      if (status === "in_progress" || status === "completed") {
        return true;
      } else {
        return false;
      }
    }),
});

export const GetByIdSchema = object().shape({
  id_task: string().required().uuid(),
});

export const AddSchema = object().shape({
  description: string().required(),
  data: string().required(),
  status: string()
    .required()
    .test("addIsValida", (status) => {
      if (status === "in_progress" || status === "completed") {
        return true;
      } else {
        return false;
      }
    }),
});

export const UpdateSchema = object().shape({
  id: string().required(),
  decription: string().required(),
  data: string().required(),
  status: string()
    .required()
    .test("addIsValida", (status) => {
      if (status === "in_progress" || status === "completed") {
        return true;
      } else {
        return false;
      }
    }),
});

export const UpdateSchemaParams = string().required().uuid();

export const DeleteSchema = string().required().uuid();
