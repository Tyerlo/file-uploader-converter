import React, { useState } from "react";
import { getStripe } from "../util/stripe";
import firebase from "gatsby-plugin-firebase";
import { Card, CardTitle, CardText, Container, Row, Col } from "reactstrap";
import { formatPrice } from "../util/FormatPrice";
import useAuthState from "../context/auth";

const ProductCard = ({ product }) => {
  const [loading, setLoading] = useState(false);

  const [user, loadingFirebase, error] = useAuthState(firebase);

  const subscribe = async (priceId) => {
    setLoading(loadingFirebase);

    const docRef = await firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        collect_shipping_address: true,
        success_url: window.location.origin,
        cancel_url: window.location.origin
      });

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        // Show an error to your customer and
        // inspect your Cloud Function logs in the Firebase console.
        alert(`An error occured: ${error.message}`);
      }
      if (sessionId) {
        // We have a session, let's redirect to Checkout
        // Init Stripe
        const stripe = await getStripe();
        stripe.redirectToCheckout({
          sessionId
        });
      }
    });
  };

  return (
    <div>
      <Container>
        <Row>
          <Col sm="12">
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
              {product &&
                product.prices.map((p) => (
                  <button
                    key={p.id}
                    className="btn--buy-button"
                    disabled={loading}
                    onClick={() => subscribe(p.id)}
                  >
                    Comprar
                  </button>
                ))}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductCard;
