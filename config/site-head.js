export default {
  titleTemplate: '%s - Manic by MrIsaacs',
  htmlAttrs: {
    lang: 'en-US'
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { hid: 'author', name: 'author', content: 'Ivan Ilić' },
    { hid: 'description', name: 'description', content: 'nuxt full static client' },
    { name: 'format-detection', content: 'telephone=no' },
    /**
     * Open Graph Twitter Card
     */
    {
      hid: 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      hid: 'twitter:creator',
      name: 'twitter:creator',
      content: '@manicjsorg'
    },
    {
      hid: 'twitter:url',
      name: 'twitter:url',
      content: 'https://manic.js.org'
    },
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: 'Manic by MrIsaacs'
    },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content:
        'Manic is a full static client'
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: 'https://manic.js.org/preview.png'
    },
    {
      hid: 'twitter:image:alt',
      name: 'twitter:image:alt',
      content: 'Manic logo'
    },
    /**
     * Open Graph Facebook Card
     */
    { hid: 'og:site_name', property: 'og:site_name', content: 'Manic' },
    { hid: 'og:type', property: 'og:type', content: 'website' },
    {
      hid: 'og:url',
      property: 'og:url',
      content: 'https://manic.js.org'
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: 'Manic'
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content:
        'Manic is a full static web3 client'
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: 'https://manic.js.org/preview.png'
    },
    {
      hid: 'og:image:secure_url',
      property: 'og:image:secure_url',
      content: 'https://manic.js.org/preview.png'
    },
    {
      hid: 'og:image:alt',
      property: 'og:image:alt',
      content: 'Manic logo'
    }
  ],
  link: [
    {
      hid: 'canonical',
      rel: 'canonical',
      href: `https://manic.js.org/`
    },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
};
