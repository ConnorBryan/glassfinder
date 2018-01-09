import React from "react";
import { Segment } from "semantic-ui-react";
import styled from "styled-components";

import { ShopHero, ArtistHero, BrandHero, PieceHero } from "../../features";

function FeaturedSet() {
  const Styles = styled.div`
    section {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      min-height: 60vh !important;
    }

    h1 {
      font-size: 3rem !important;
      letter-spacing: 0.33rem !important;
      text-transform: uppercase !important;
    }

    button {
      margin-top: 1.5rem !important;
      letter-spacing: 0.33rem !important;
      text-transform: uppercase !important;
      background: #2185d0 !important;
      color: white !important;
    }

    .header {
      background: rgba(33, 133, 208, 0.1) !important;
      margin-bottom: 2rem !important;
      padding: 1rem 2rem 1rem 2rem !important;
    }

    .container {
      margin-top: 4rem !important;
      margin-bottom: 4rem !important;
    }

    .description {
      font-size: 1.5rem !important;
      line-height: 1.75rem !important;
    }

    .segment {
      margin: 0 !important;
    }

    .item.content {
      padding-left: 3rem !important;
    }
  `;

  return (
    <Styles>
      <Segment color="blue" secondary>
        <ShopHero />
      </Segment>
      <Segment color="blue" tertiary>
        <ArtistHero />
      </Segment>
      <Segment color="blue" secondary>
        <BrandHero />
      </Segment>
      <Segment color="blue" tertiary>
        <PieceHero />
      </Segment>
    </Styles>
  );
}

export default FeaturedSet;
