import { loadStripe } from "@stripe/stripe-js";

let stripePromise;
export const getStripe = () => {
	if (!stripePromise) {
		stripePromise = loadStripe(
			"pk_test_51Ie22JB8jDt7RkIIhSDavegghGystDbuCfbrV2RiOoPQf6KwJX7tr9J8EYOluKHSnpAX84FJHjUNfRV6AqT9fCkK00qfZDh3Fy"
		);
	}
	return stripePromise;
};
