import React from "react";

import config from "../../config";
import withPageHeader from "../../atomic/withPageHeader";
import ContactForm from "../../forms/Contact";

function Contact(props) {
  return (
    <ContactForm />
  );
}

export default withPageHeader(config.pageHeaders.contact, Contact);
