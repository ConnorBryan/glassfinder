import config from "../../config";
import withPageHeader from "../../providers/withPageHeader";
import ContactForm from "../../forms/Contact";

export default withPageHeader(config.pageHeaders.contact, ContactForm);
