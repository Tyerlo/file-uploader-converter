import React, { useState } from "react";
import { Card, CardTitle, CardText, Container, Row, Col } from "reactstrap";
import { formatPrice } from "../util/FormatPrice";

import InputRuc from "./InputRuc";

const ProductCard = ({ product }) => {
	const [toggle, setToggle] = useState(false);

	const hideRegisterRuc = () => setToggle(!toggle);
	return (
		<div>
			<Container>
				<Row>
					<Col sm="12">
						{toggle ? (
							<InputRuc product={product} hideRuc={hideRegisterRuc} />
						) : (
							<Card body className="mt-3 text-center">
								<CardTitle>
									<div style={{ fontSize: "1.5rem" }} className="heading-list">
										{product.name}
									</div>
								</CardTitle>
								{product.description}
								<CardText>
									{product.prices.map((price) => (
										<span
											style={{ fontSize: "1.5rem" }}
											className="heading-list"
											key={price.id}
											value={price.id}
										>
											{formatPrice(price.unit_amount, price.currency)}
										</span>
									))}
								</CardText>

								<button
									className="btn--buy-button"
									onClick={() => setToggle({ toggle: true })}
								>
									Registrar ruc
								</button>
							</Card>
						)}
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default ProductCard;
