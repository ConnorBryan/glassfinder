import Yup from "yup";

export default [
  {
    name: "image",
    type: "text",
    label: "Image URL",
    placeholder: "Enter an image URL, such as one from Imgur",
    validation: Yup.string().matches(
      /[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/,
      "An image must have a valid URL."
    )
  },
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
  },
  {
    name: "author",
    type: "text",
    label: "Author",
    placeholder: "Enter the author of the update",
    validation: Yup.string().required("An update must have an author.")
  }
];
