import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
	uri:
		process.env.NEXT_PUBLIC_GRAPHQL_URL ||
		"http://localhost:8000/graphql/v1/city_insights",
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
