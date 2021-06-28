// require("dotenv").config({
// 	path: `.env.${process.env.NODE_ENV}`
// });
//TODO fix somehting with env variable, not working
require("dotenv").config();

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
					authDomain: process.env.GATSBY_authDomain,
					projectId: process.env.GATSBY_projectId,
					storageBucket: process.env.GATSBY_storageBucket,
					messagingSenderId: process.env.GATSBY_messagingSenderId,
					appId: process.env.GATSBY_appId,
					measurementId: process.env.GATSBY_measurementId
				}
			}
		},
		{
			resolve: `gatsby-source-stripe`,
			options: {
				objects: ["Price"],
				secretKey:
					"sk_test_51Ie22JB8jDt7RkIIV37jB1XecKeYHMGyEuougyUjp6O7jffWsgiqRYdrzELAifueRf5kDVnoQyt8twBlbccc9hc700GPy4xZ3x",
				downloadFiles: false
			}
		}
	]
};
