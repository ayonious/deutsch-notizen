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
    <Link to={useBaseUrl("docs/")}>Los Geht's </Link>
  </GetStartButton>
);

const ProductLogo = () => (
  <ProductLogoHomePage alt="CheatSheet logo" src={useBaseUrl("img/logo.png")} />
);

const PageHeadLine = () => {
  return (
    <Headline>
      <HeadlineSub>
        <HeadlineText>
          <ProductLogo />
          <UnColoredText text="Amateur" />
          <ColoredText text=" Sammlung von" />
          <UnColoredText text=" schwirige" />
          <ColoredText text=" Deutsche Regeln" />
        </HeadlineText>
        <GetStartedButton />
      </HeadlineSub>
    </Headline>
  );
};

export default PageHeadLine;
