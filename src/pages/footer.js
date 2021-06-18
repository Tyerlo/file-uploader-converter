import React from "react";
import WhatsAppWidget from "react-whatsapp-widget";
const Footer = () => {
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
