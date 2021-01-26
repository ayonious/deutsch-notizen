import React from "react";
import classnames from "classnames";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";
import {
  FeatureImage,
  Features,
  Headline,
  HeadlineSub,
  HeadlineText,
  ColoredWords,
  GetStartButton,
  ProductLogoHomePage,
} from "./styles";

import sources from "../utils/sources";

const Feature = ({ imageUrl, title, description }) => {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames("col col--4", styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <FeatureImage src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

const Sources = () => {
  return (
    <div>
      {sources && sources.length > 0 && (
        <Features>
          <div className="container">
            <div className="row">
              {sources.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </div>
        </Features>
      )}
    </div>
  );
};

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

const Home = () => {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout title={`${siteConfig.title}`} description={`${siteConfig.tagline}`}>
      <main>
        <PageHeadLine />
        <Sources />
      </main>
    </Layout>
  );
};

export default Home;
