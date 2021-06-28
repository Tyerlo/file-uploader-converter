require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`
});
//TODO fix somehting with env variable, not working

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
					apiKey: `${process.env.apiKey}`,
					authDomain: process.env.authDomain,
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
				secretKey: "sk_test_51Ie22JB8jDt7RkIIV37jB1XecKeYHMGyEuougyUjp6O7jffWsgiqRYdrzELAifueRf5kDVnoQyt8twBlbccc9hc700GPy4xZ3x",
				downloadFiles: false
			}
		}
	]
};
