module.exports = {
  siteMetadata: {
    title: "siteconverter"
  },
  plugins: [
    "gatsby-plugin-netlify-cms",
    "gatsby-plugin-sass",
    "gatsby-plugin-netlify-identity-widget",
    {
      resolve: "gatsby-plugin-netlify-identity-widget",
      options: {
        enableIdentityWidget: false
      }
    }
  ]
};
