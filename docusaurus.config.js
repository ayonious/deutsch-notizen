module.exports = {
  title: "Detusch Notizen", // Title for your website.
  tagline: "Collection of my German language Grammars",
  url: "https://deutsch-notizen.netlify.app", // Your website URL
  baseUrl: "/", // Base URL for your project */

  favicon: "img/favicon.ico",
  organizationName: "ayonious", // Usually your GitHub org/user name.
  projectName: "docusaurus", // Usually your repo name.
  themeConfig: {
    sidebarCollapsible: false,
    announcementBar: {
      id: "support",
      content:
        '🍻 If you like this German Learning website, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/ayonious/deutsch-notizen">GitHub</a>! ⭐️',
    },
    navbar: {
      title: "Deutsch Notizen",
      logo: {
        alt: "Deutsch Notizen",
        src: "img/favicon.ico",
      },
      items: [
        {
          type: 'doc',
          position: 'left',
          docId: 'Lander',
          label: 'Grammatik',
        },
        {
          type: 'doc',
          position: 'left',
          docId: 'B2Brief',
          label: 'Prüfung',
        },
        {
          href: "https://github.com/ayonious/deutsch-notizen",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "🧒 Basics",
          items: [
            {
              label: "Tekamolo",
              to: "docs/Tekamolo",
            },
            {
              label: "Plusquim Perfekt",
              to: "docs/PlusquimPerfekt",
            },
          ],
        },
        {
          title: "👦 Mittelstufe",
          items: [
            {
              label: "Konjunktiv I",
              to: "docs/KonjunktivI",
            },
            {
              label: "Konjunktiv II",
              to: "docs/KonjunktivII",
            },
            {
              label: "Haupt & Nebensatz",
              to: "docs/Nebensatz",
            },
          ],
        },
        {
          title: "👸 Profis",
          items: [
            {
              label: "Passiv",
              to: "docs/Passiv",
            },
            {
              label: "Deren & Dessen",
              to: "docs/DerenDessen",
            },
          ],
        },
        {
          title: "🦄 Spaß",
          items: [
            {
              label: "Sprechen Styling",
              to: "docs/SprechenStyling",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Nahiyan Kamal. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          path: "docs",
          sidebarPath: require.resolve("./sidebars.js"),
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          // this enabled the edit button for documentation
          editUrl: "https://github.com/ayonious/deutsch-notizen/blob/master/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
