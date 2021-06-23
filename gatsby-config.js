require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})


module.exports = {
  siteMetadata: {
    title: "siteconverter"
  },
  plugins: [
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: process.env.apiKey,
          authDomain: process.env.authDomain,
          databaseURL: process.env.databaseURL,
          projectId: process.env.projectId,
          storageBucket: process.env.storageBucket,
          messagingSenderId: process.env.messagingSenderId,
          appId: process.env.appId,
          measurementId: process.env.measurementId
        }
      }
    },
    {
      resolve: `gatsby-source-stripe`,
      options: {
        objects: ["Price"],
        secretKey: process.env.GATSBY_STRIPE_SECRET_KEY,
        downloadFiles: false,
        async: true
      }
    }
  ]
};
