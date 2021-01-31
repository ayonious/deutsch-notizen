import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import React from "react";

import {
  ColoredWords,
  GetStartButton,
  Headline,
  HeadlineSub,
  HeadlineText,
  ProductLogoHomePage,
} from "./styles";

const ColoredText = ({ text }) => <ColoredWords>{text}</ColoredWords>;
const UnColoredText = ({ text }) => <span>{text}</span>;

const GetStartedButton = () => (
  <GetStartButton>
    <Link to={useBaseUrl("docs/")}>Auf Geht's </Link>
  </GetStartButton>
);

const ProductLogo = () => (
  <ProductLogoHomePage
    alt="Deutsch Logo"
    src={useBaseUrl("img/undraw_Beer_celebration_cefj.svg")}
  />
);

const PageHeadLine = () => {
  return (
    <Headline>
      <HeadlineSub>
        <HeadlineText>
          <ProductLogo />
          <UnColoredText text="Amateur" />
          <ColoredText text=" Sammlung von" />
          <UnColoredText text=" schwierige" />
          <ColoredText text=" Deutsche Regeln" />
        </HeadlineText>
        <GetStartedButton />
      </HeadlineSub>
    </Headline>
  );
};

export default PageHeadLine;
