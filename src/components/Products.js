import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { graphql, StaticQuery } from "gatsby";
import ProductCard from "./ProductCard";
export default function Products() {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <StaticQuery
      query={graphql`
        query ProductPrices {
          prices: allStripePrice(
            filter: { active: { eq: true } }
            sort: { fields: [unit_amount] }
          ) {
            edges {
              node {
                id
                active
                currency
                unit_amount
                product {
                  id
                  name
                  description
                }
              }
            }
          }
        }
      `}
      render={({ prices }) => {
        const products = {};
        for (const { node: price } of prices.edges) {
          const product = price.product;
          if (!products[product.id]) {
            products[product.id] = product;
            products[product.id].prices = [];
          }
          products[product.id].prices.push(price);
        }
        return (
          <div className="section-upload">
            <button onClick={toggle} className="btn btn--dark">
              Compra ruc
            </button>
            <Modal
              scrollable={true}
              contentClassName="modalDialog"
              isOpen={modal}
              toggle={toggle}
            >
              <ModalHeader toggle={toggle}>
                <div style={{ fontSize: "2rem" }} className="heading-list">
                  Eligir su productos
                </div>
              </ModalHeader>
              <ModalBody>
                {Object.keys(products).map((key) => (
                  <ProductCard key={products[key].id} product={products[key]} />
                ))}
              </ModalBody>
            </Modal>
          </div>
        );
      }}
    />
  );
}
