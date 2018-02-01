import React from "react";

import Thing from "../../../../components/Thing";

function AboutThing({ image, name, title, description }) {
  const thing = {
    image,
    title: name,
    top: title,
    content: description
  };

  return <Thing {...thing} />;
}

export default AboutThing;
