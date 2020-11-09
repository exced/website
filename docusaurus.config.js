const remarkMath = require('remark-math');
const rehypeKatex = require('rehype-katex');

module.exports = {
  title: 'Thomas Barras',
  tagline: 'Software Engineer',
  url: 'https://exced.github.io',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'exced',
  projectName: 'exced.github.io',
  themeConfig: {
    navbar: {
      title: 'Exced',
      links: [
        { to: 'resume', label: 'Resume', position: 'left' },
        // { to: 'blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/exced',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {},
        {
          title: 'Professional',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/exced',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/thomas-barras-b487a8a1/',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            // {
            //   label: 'Blog',
            //   to: 'blog',
            // },
            {
              label: 'Twitter',
              href: 'https://twitter.com/_exced',
            },
          ],
        },
      ],
    },
    googleAnalytics: {
      trackingID: 'UA-91860924-1',
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        blog: {
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
