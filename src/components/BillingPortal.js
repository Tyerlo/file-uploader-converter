import firebase from "gatsby-plugin-firebase";
export const goToBillingPortal = async () => {
  // Call billing portal function

  const functionRef = firebase
    .app()
    .functions("southamerica-east1")
    .httpsCallable("ext-firestore-stripe-subscriptions-createPortalLink");
  const { data } = await functionRef({ returnUrl: window.location.origin });
  window.location.assign(data.url);
};
