// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').Config} */
const config = {
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/e2e-zk-ecdsa/',
  // Usually your repo name.
  deploymentBranch: 'gh-pages',
  favicon: 'img/favicon.ico',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  // The branch that GitHub pages will deploy from.

  onBrokenLinks: 'throw',

  onBrokenMarkdownLinks: 'warn', // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'privacy-scaling-explorations',
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/privacy-scaling-explorations/tree/main/docs/docs',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ], // Usually your GitHub org/user name.
  projectName: 'e2e-zk-ecdsa',
  tagline: 'Anonymous proof of membership',

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      footer: {
        links: [
          {
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
            title: 'Docs',
          },
          {
            items: [
              {
                href: 'https://discord.gg/VVudpjfxCWt',
                label: 'Discord',
              },
              {
                href: 'https://twitter.com/PrivacyScaling',
                label: 'Twitter',
              },
            ],
            title: 'Community',
          },
          {
            items: [
              {
                href: 'https://github.com/privacy-scaling-explorations/e2e-zk-ecdsa',
                label: 'GitHub',
              },
            ],
            title: 'More',
          },
        ],
        style: 'dark',
      },
      // Replace with your project's social card
      image: 'img/anonymity.jpg',
      navbar: {
        items: [
          {
            docId: 'intro',
            label: 'Introduction',
            position: 'left',
            type: 'doc',
          },
          {
            docId: 'tutorial/intro',
            label: 'Tutorial',
            position: 'left',
            type: 'doc',
          },
          {
            href: 'https://github.com/privacy-scaling-explorations/e2e-zk-ecdsa',
            label: 'GitHub',
            position: 'right',
          },
        ],
        logo: {
          alt: 'ECDSA Groups Logo',
          src: 'img/logo.svg',
        },
        title: 'ECDSA GROUPS',
      },
      prism: {
        darkTheme: darkCodeTheme,
        theme: lightCodeTheme,
      },
    },

  copyright: `Copyright © ${new Date().getFullYear()} Ethereum Foundation.`,
  title: 'ECDSA GROUPS',
  // Set the production url of your site here
  url: 'https://privacy-scaling-explorations.github.io',
}

module.exports = config
