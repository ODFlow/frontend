import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
	uri:
		"https://backend-xukv.onrender.com/graphql/v1/city_insights",
});

const authLink = setContext((_, { headers }) => {
	return {
		headers: {
			...headers,
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

export default client;
