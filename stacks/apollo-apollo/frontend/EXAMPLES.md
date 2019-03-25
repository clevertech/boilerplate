# Example GraphQL Queries

## Register a user

Results in an authToken useful for logging in

```graphql
mutation {
  signup(
    user: { username: "clevertech", password: "cleverpass", email: "clevertech@example.com" }
  ) {
    result
    authToken
    message
  }
}
```

## Login

Results in an authToken that can be added to the header

```graphql
mutation {
  login(username:"clevertech", password:"cleverpass") {
    result
    authToken
  }
}

```

# Login Check

Demonstrate an endpoint that is auth aware. This requires an auth header.

In the HTTP HEADERS of the GraphQL Playground, add this (using the login mutation to fetch the token)

```
{ "Authorization": "Bearer AUTH.TOKEN.HERE" }
```

Then this should display true/false to indicate if the token works.

```graphql
query {
  isLogin
}
```

# Fetch books

The endpoint is public currently.

```graphql
query {
  books {
    title
    author
    pubdate
  }
}
```