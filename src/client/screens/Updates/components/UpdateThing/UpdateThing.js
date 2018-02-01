import React from "react";
import moment from "moment";

import Thing from "../../../../components/Thing";

function UpdateThing({ image, title, content, createdAt, author }) {
  const thing = {
    image,
    title,
    top: moment(createdAt).format("MM/DD/YYYY"),
    content,
    bottom: `Posted by ${author}`
  };

  return <Thing {...thing} />;
}

export default UpdateThing;
