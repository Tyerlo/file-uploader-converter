import React from "react";
import WhatsAppWidget from "react-whatsapp-widget";
import "react-whatsapp-widget/dist/index.css";
const Footer = () => {
	//TODO fix so they can contact you and
	//*also test the whole application once
	//*see if you can get a email when paying with stripe
	return (
		<footer className="footer">
			<p className="footer__copyright">Copyright &copy; by Thomas Borgström</p>
			<div className="footer__ws">
				<WhatsAppWidget
					phoneNumber="+46736548775"
					textReplyTime="Normalmente responde en un día"
					message="Hola! Qué podemos hacer por ti?"
					companyName="Apoyo"
					sendButton="Enviar"
				/>
			</div>
		</footer>
	);
};
export default Footer;
