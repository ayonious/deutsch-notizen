module.exports = {
  title: "Detusch Notizen", // Title for your website.
  tagline: "Collection of my German language Grammars",
  url: "https://deutsch-notizen.netlify.app", // Your website URL
  baseUrl: "/", // Base URL for your project */

  favicon: "img/favicon.ico",
  organizationName: "ayonious", // Usually your GitHub org/user name.
  projectName: "docusaurus", // Usually your repo name.
  themeConfig: {
    docs: {
      sidebar: {
        hideable:  true,
      }
    },
    announcementBar: {
      id: "support",
      content:
        '🍻 Wenn diese Seite dir gefallen hat, gib ein sterne auf <a target="_blank" rel="noopener noreferrer" href="https://github.com/ayonious/deutsch-notizen">GitHub</a>! ⭐️',
    },
    navbar: {
      title: "Deutsch Notizen",
      logo: {
        alt: "Deutsch Notizen",
        src: "img/undraw_Beer_celebration_cefj.svg",
      },
      items: [
        {
          type: 'doc',
          position: 'left',
          docId: 'grammatik/Tekamolo',
          label: '⚙️ Grammatik',
        },
        {
          type: 'doc',
          position: 'left',
          docId: 'prufung/B2/Brief',
          label: '🤓 Prüfung',
        },
        {
          type: 'doc',
          position: 'left',
          docId: 'medien/Youtube',
          label: '🎬 Medien',
        },
        {
          to: 'blog', 
          label: '✍️ Blog', 
          position: 'left'
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
              to: "docs/grammatik/Tekamolo",
            },
            {
              label: "Plusquim Perfekt",
              to: "docs/grammatik/PlusquimPerfekt",
            },
          ],
        },
        {
          title: "👦 Mittelstufe",
          items: [
            {
              label: "Konjunktiv I",
              to: "docs/grammatik/KonjunktivI",
            },
            {
              label: "Konjunktiv II",
              to: "docs/grammatik/KonjunktivII",
            },
            {
              label: "Haupt & Nebensatz",
              to: "docs/grammatik/Nebensatz",
            },
          ],
        },
        {
          title: "👸 Profis",
          items: [
            {
              label: "Passiv",
              to: "docs/grammatik/Passiv",
            },
            {
              label: "Deren & Dessen",
              to: "docs/grammatik/DerenDessen",
            },
          ],
        },
        {
          title: "🦄 Spaß",
          items: [
            {
              label: "Sprechen Styling",
              to: "docs/grammatik/SprechenStyling",
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
        blog: {
          feedOptions: {
            type: 'all',
            copyright: `Copyright © ${new Date().getFullYear()} Nahiyan Kamal.`,
          },
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
