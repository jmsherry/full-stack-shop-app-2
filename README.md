# Full-Stack Application Demo

## Intro

This app is a MERN (MongoDB, Express, React and Node) app.

## Server

The server is an express server (mainly an API server, except in production where it serves files from the client folder)

### API Routes

Routes begin with `/api/v1/` and then the model they are manipulating. There are `products` routes set up. The model for a product is:

```javascript
{
  title: String,
  price: Number.
}
```

sent as `application/json`

* GET `/api/v1/products` - gets all products
* GET `/api/v1/products/1234` - gets the product with an id of `1234`
* POST `/api/v1/products` - adds a product (you need to send data in the request body, as shown above)
* PUT `/api/v1/products/1234` - updates the product with an id of `1234` with the data you send in the request body (only updated fields required) (404 if not found)
* DELETE `api/v1/products/1234`deletes the product with an id of`1234` (404 if not found)

## Auth0 Settings

To use this app yourself you'll need to set up a domain with Auth0 and set up an SPA application and within that an API.

Client settings are in: `/client/src/auth_config.json` and include the `domain` (your auth0 account identifier, visible on the app page); `clientId`, which is the id of the app itself, and; `audience`, which is the id of the API it uses

On the server-side, where that API is, you'll need a `.env` file, which looks like:

```bash
AUTH0_DOMAIN=js6.auth0.com
AUTH0_AUDIENCE="http://localhost:3000/api/v1"
```

Reference article: <https://auth0.com/blog/node-js-and-typescript-tutorial-secure-an-express-api/#Set-Up-an-Authorization-Service>

## Auth0 Rules

### Add persistent attributes to the user

```javascript
function addPersistenceAttribute(user, context, callback) {
  const namespaces = ['http://localhost:3000', 'http://localhost:5000', 'https://portfolio-fs-app.herokuapp.com']; // <-- all domains go here
  user.app_metadata = user.app_metadata || {};
  user.app_metadata.admin = user.app_metadata.admin || false;
  
  if (context.idToken) {
    for (const namespace of namespaces) {
    	context.idToken[`${namespace}/admin`] = user.app_metadata.admin;
    }
  }
  // persist the app_metadata update
  auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
    .then(function(){
      callback(null, user, context);
    })
    .catch(function(err){
      callback(err);
    });
}
```

### Add user roles to tokens

```javascript
function(user, context, callback) {
  const namespaces = ['http://localhost:3000', 'http://localhost:5000', 'https://portfolio-fs-app.herokuapp.com'];

  if (context.authorization && context.authorization.roles) {
    const assignedRoles = context.authorization.roles;

    if (context.idToken) {
      const idTokenClaims = context.idToken;
      for (const namespace of namespaces){
      	idTokenClaims[`${namespace}/roles`] = assignedRoles;
      }
      context.idToken = idTokenClaims;
    }

    if (context.accessToken) {
      const accessTokenClaims = context.accessToken;
      for (const namespace of namespaces){
      	accessTokenClaims[`${namespace}/roles`] = assignedRoles;
      }
      context.accessToken = accessTokenClaims;
    }
  }

  callback(null, user, context);
}
```

### Push RBAC perms to id token

```javascript
function (user, context, callback) {
  console.log(context.request);
  const map = require('array-map');
  const ManagementClient = require('auth0@2.17.0').ManagementClient;
  const management = new ManagementClient({
    token: auth0.accessToken,
    domain: auth0.domain
  });
	const namespaces = ['http://localhost:3000', 'http://localhost:5000', 'https://portfolio-fs-app.herokuapp.com'];
  const params = { id: user.user_id, page: 0, per_page: 50, include_totals: true };
  management.getUserPermissions(params, function (err, permissions) {
    if (err) {
      // Handle error.
      console.log('err: ', err);
      callback(err);
    } else {
      const permissionsArr = map(permissions.permissions, function (permission) {
        return permission.permission_name;
      });
      console.log('permissionsArr', permissionsArr);
      for (const namespace of namespaces){
        context.idToken[`${namespace}/user_authorization`] = {
          permissions: permissionsArr
        };
      }
      console.log('context.idToken', context.idToken);
    }
    callback(null, user, context);
  });
}
```

** N.B. To see console logs in these you must have a management app and the logs will come out there **
