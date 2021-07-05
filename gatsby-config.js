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
					apiKey: `${process.env.GATSBY_apiKey}`,
					authDomain: `${process.env.GATSBY_authDomain}`,
					projectId: `${process.env.GATSBY_projectId}`,
					storageBucket: `${process.env.GATSBY_storageBucket}`,
					messagingSenderId: `${process.env.GATSBY_messagingSenderId}`,
					appId: `${process.env.GATSBY_appId}`,
					measurementId: `${process.env.GATSBY_measurementId}`
				}
			}
		},
		{
			resolve: `gatsby-source-stripe`,
			options: {
				objects: ["Price"],
				secretKey: process.env.STRIPE_SECRET_KEY,
				downloadFiles: false
			}
		}
	]
};
