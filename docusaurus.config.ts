import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Deutsch Notizen',
  tagline: 'Collection of my German language Grammars',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://deutsch-notizen.netlify.app',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ayonious', // Usually your GitHub org/user name.
  projectName: 'deutsch-notizen', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'de',
    locales: ['de'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          // this enabled the edit button for documentation
          editUrl: 'https://github.com/ayonious/deutsch-notizen/blob/master/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
            copyright: `Copyright © ${new Date().getFullYear()} Nahiyan Kamal.`,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/ayonious/deutsch-notizen/blob/master/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/undraw_Beer_celebration_cefj.svg',
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    announcementBar: {
      id: 'support',
      content:
        '🍻 Wenn diese Seite dir gefallen hat, gib ein sterne auf <a target="_blank" rel="noopener noreferrer" href="https://github.com/ayonious/deutsch-notizen">GitHub</a>! ⭐️',
    },
    navbar: {
      title: 'Deutsch Notizen',
      logo: {
        alt: 'Deutsch Notizen',
        src: 'img/undraw_Beer_celebration_cefj.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: '📚 Docs',
        },
        {
          to: '/docs/category/grammatik',
          label: '⚙️ Grammatik',
          position: 'left',
        },
        {
          to: '/docs/category/prüfung',
          label: '🤓 Prüfung',
          position: 'left',
        },
        {
          to: '/docs/category/medien',
          label: '🎬 Medien',
          position: 'left',
        },
        {
          to: '/blog',
          label: '✍️ Blog',
          position: 'left',
        },
        {
          href: 'https://github.com/ayonious/deutsch-notizen',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '🧒 Basics',
          items: [
            {
              label: 'Tekamolo',
              to: '/docs/grammatik/Tekamolo',
            },
            {
              label: 'Plusquim Perfekt',
              to: '/docs/grammatik/PlusquimPerfekt',
            },
          ],
        },
        {
          title: '👦 Mittelstufe',
          items: [
            {
              label: 'Konjunktiv I',
              to: '/docs/grammatik/KonjunktivI',
            },
            {
              label: 'Konjunktiv II',
              to: '/docs/grammatik/KonjunktivII',
            },
            {
              label: 'Haupt & Nebensatz',
              to: '/docs/grammatik/Nebensatz',
            },
          ],
        },
        {
          title: '👸 Profis',
          items: [
            {
              label: 'Passiv',
              to: '/docs/grammatik/Passiv',
            },
            {
              label: 'Deren & Dessen',
              to: '/docs/grammatik/DerenDessen',
            },
          ],
        },
        {
          title: '🦄 Spaß',
          items: [
            {
              label: 'Sprechen Styling',
              to: '/docs/grammatik/SprechenStyling',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Nahiyan Kamal. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;