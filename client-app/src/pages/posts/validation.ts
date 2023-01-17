import * as Yup from "yup";

const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', 'image/jpg'];

export const ChangePostSchema = Yup.object().shape({
  Title: Yup.string()
    .required("Title is required")
    .label("Title").max(75, 'Maximum number of characters is 75'),
  ShortDescription: Yup.string()
    .required("Short description is required")
    .label("Short description").max(255, 'Maximum number of characters is 255'),
  Description: Yup.string()
    .required("Description is required")
    .label("Description").max(4000, 'Maximum number of characters is 4000'),
  Image: Yup.mixed()
    .nullable()
    .required("Image is required")
    .test('FILE_SIZE', 'Uploaded file size is too big', (value) => !value || (value && value.size <= 1024 * 1024))
    .test('FILE_FORMAT', 'This file type is not supported(.jpeg, .png, .png)', (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type)))
    .label("Image"),
  CategoryId: Yup.number()
    .required("Category is required")
    .label("Category"),
});