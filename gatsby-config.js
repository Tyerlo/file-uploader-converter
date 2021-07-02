require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`
});

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
					apiKey: "AIzaSyC9BG6mP_OHXc_0S55htead68WEWnRrvqk",
					authDomain: "file-upload-converter.firebaseapp.com",
					projectId: "file-upload-converter",
					storageBucket: "ile-upload-converter.appspot.com",
					messagingSenderId: "545237805943",
					appId: "1:545237805943:web:20185ca42249ab5ad00f72",
					measurementId: "G-ZRX9DCPSX5"
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
