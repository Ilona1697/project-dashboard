import * as Yup from "yup";

const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', 'image/jpg'];

export const ChangePostSchema = Yup.object().shape({
  Title: Yup.string()
    .required("Title is required")
    .label("Title"),
  ShortDescription: Yup.string()
    .required("Short description is required")
    .label("Short description"),
  Description: Yup.string()
    .required("Description is required")
    .label("Description"),
  Image: Yup.mixed()
    .required("Image is required")
    .test('FILE_SIZE', 'Uploaded file size is too big', (value) => !value || (value && value.size <= 1024 * 1024))
    .test('FILE_FORMAT', 'This file type is not supported(.jpeg, .png, .png)', (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type)))
    .label("Image"),
  // Image: Yup.string().required("Image is required"),
  CategoryId: Yup.number()
    .label("Category").nullable()
});