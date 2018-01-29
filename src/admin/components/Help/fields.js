import Yup from "yup";

export default [
  {
    name: "title",
    type: "text",
    label: "Title",
    placeholder: "Enter the title of the update",
    validation: Yup.string().required("An update must have a title.")
  },
  {
    name: "content",
    type: "textarea",
    label: "Content",
    placeholder: "Enter the content of the update",
    validation: Yup.string().required("An update must have content.")
  }
];
