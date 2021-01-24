import React from "react";
import classnames from "classnames";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const sources = [
  {
    title: <>Aus Fernseher</>,
    imageUrl: "img/undraw_movie_night_fldd.svg",
    description: <>Aus Tolle Filme und Sendungen das ich gesehen und gehört habe.</>,
  },
  {
    title: <>Podcasts and Funk</>,
    imageUrl: "img/undraw_podcast_q6p7.svg",
    description: (
      <>
        Aus Spotify und Youtube
      </>
    ),
  },
  {
    title: <>Romane und Sachbücher</>,
    imageUrl: "img/undraw_reading_time_gvg0.svg",
    description: <>Viele Bücher aus andere Sprache die in Deutsch übersetz worden sind</>,
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames("col col--4", styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Sources() {
  return (
    <div>
      {sources && sources.length > 0 && (
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              {sources.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

const ColoredText = ({text}) =>  <span className={styles.coloredWords}>{text}</span>;
const UnColoredText = ({text}) =>  <span>{text}</span>;


const GetStartedButton = () => (<Link className={styles.getStartButton} to={useBaseUrl("docs/")}> Los Geht's </Link>);

const ProductLogo = () => <img className={styles.productLogoHomePage}  alt="CheatSheet logo" src={useBaseUrl("img/logo.png")} />;

const PageHeadLine = ()  => {
  return (
    <div className={styles.headline}>
      <div className={styles.headlineSub}>
        <h1 className={styles.headlineText}>
          <ProductLogo />
          <UnColoredText text="Amateur"/>
          <ColoredText text=" Sammlung von"/>
          <UnColoredText text=" schwirige"/>
          <ColoredText text=" Deutsche Regeln"/>
        </h1>
        <GetStartedButton />
      </div>
    </div>
  );
}

function Home() {
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
}

export default Home;

