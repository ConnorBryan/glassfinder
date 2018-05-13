import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { Loader } from "semantic-ui-react";
import Yup from "yup";

import * as config from "../../../../config";
import API from "../../../services";
import FormScreen from "../../../components/FormScreen";
import UploadPiece from "../_UploadPiece";

const FIELDS = [
  {
    name: "name",
    type: "text",
    label: "Name",
    placeholder: "Enter name",
    value: "",
    validation: Yup.string().required("A name is required.")
  },
  {
    name: "maker",
    type: "text",
    label: "Maker",
    placeholder: "Enter maker",
    value: "",
    validation: Yup.string().required("A maker is required.")
  },
  {
    name: "price",
    type: "number",
    label: "Price",
    placeholder: "Enter price",
    value: "",
    validation: Yup.number()
      .positive("A price must be a positive amount.")
      .required("A price is required.")
  },
  {
    name: "description",
    type: "textarea",
    label: "Description",
    placeholder: "Enter description",
    value: "",
    validation: Yup.string().required("A description is required.")
  },
  {
    name: "location",
    type: "text",
    label: "Location",
    placeholder: "Enter location",
    value: "",
    validation: Yup.string().required("A location is required.")
  }
];

class UpdatePieceInformation extends Component {
  state = {
    piece: null
  };

  componentDidMount() {
    this.fetchPiece();
  }

  fetchPiece = async () => {
    const { history, displayNotification } = this.props;

    try {
      const {
        match: {
          params: { id }
        }
      } = this.props;

      const piece = await API.fetchPiece(id);

      this.setState({ piece });
    } catch (e) {
      displayNotification(
        "There was an error loading this piece. Please try again later."
      );

      setTimeout(
        () => history.push(`/my-account/view-my-pieces`),
        config.NOTIFICATION_TIMEOUT + 500
      );
    }
  };

  render() {
    const {
      history,
      match: {
        params: { id }
      },
      displayNotification
    } = this.props;
    const { piece } = this.state;

    return (
      <UploadPiece
        {...this.props}
        title="Update a piece"
        description="Make changes to a piece you have previously uploaded."
        loading={!piece}
        initialValues={piece}
        onSubmit={async values => {
          try {
            const updatedPiece = await API.updatePieceInformation(id, values);

            if (!updatedPiece) {
              displayNotification(
                "There was an issue updating your piece. Please try again later."
              );

              return setTimeout(
                () => history.push(`/my-account/view-my-pieces/${id}`),
                config.NOTIFICATION_TIMEOUT + 500
              );
            }

            displayNotification(
              "Succesfully updated your piece. You will be redirected soon."
            );

            setTimeout(
              () => history.push(`/my-account/view-my-pieces/${id}`),
              config.NOTIFICATION_TIMEOUT + 500
            );
          } catch (error) {
            displayNotification(
              "There was an issue updating your piece. Please try again later."
            );

            return setTimeout(
              () => history.push(`/my-account/view-my-pieces/${id}`),
              config.NOTIFICATION_TIMEOUT + 500
            );
          }
        }}
      />
    );
  }
}

// function UpdatePieceInformation({
//   verbiage,
//   account,
//   history,
//   location: { state },
//   displayNotification
// }) {
//   if (!account) return <Redirect to="/sign-in" />;

//   if (!state || !state.piece)
//     return <Redirect to="/my-account/view-my-pieces" />;

//   const fields = FIELDS.map(prop => ({
//     ...prop,
//     value: state.piece[prop.name] || prop.value
//   }));

//   const onSubmit = async values => {
//     const wasSuccessful = await API.updatePieceInformation(
//       state.piece.id,
//       values
//     );

//     if (wasSuccessful) {
//       history.push("/my-account");

//       return displayNotification(
//         config.UPDATE_INFORMATION_SUCCESS_NOTIFICATION
//       );
//     }

//     return displayNotification(config.UPDATE_INFORMATION_FAILURE_NOTIFICATION);
//   };

//   const screenHeader = {
//     icon: config.ICON_SET[config.LINK_TYPES.PIECE],
//     title: verbiage.UpdatePieceInformation_title,
//     description: verbiage.UpdatePieceInformatione_description
//   };

//   const abstractForm = {
//     onSubmit,
//     fields
//   };

//   const initialImage = state.piece && state.piece.image;

//   return (
//     <FormScreen
//       withImage
//       {...{
//         splash: config.PIECE_SPLASH,
//         initialImage,
//         screenHeader,
//         abstractForm
//       }}
//     />
//   );
// }

export default withRouter(UpdatePieceInformation);
