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
    name: "name",
    type: "text",
    label: "Name",
    placeholder: "Enter the name of the update",
    validation: Yup.string().required("A team member must have a name.")
  },
  {
    name: "title",
    type: "text",
    label: "Title",
    placeholder: "Enter the team member's title",
    validation: Yup.string().required("A team member must have a title.")
  },
  {
    name: "description",
    type: "textarea",
    label: "Description",
    placeholder:
      "Enter the responsibilities and accomplishments of the team member",
    validation: Yup.string().required("A team member must have a description.")
  }
];
