'use strict';

// Hapy ecosystem
const Hapi = require('hapi');
const Inert = require('inert');
const Geolocate = require('hapi-geo-locate');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');

// NODE
const path = require('path');
const Pack = require('../../package');

// Starting a Hapi server simply requires
// an instance of Hapi.Server. We leave it
// bare or we can add some configuration
const server = new Hapi.Server({
    // tell Hapi where the public assets are
    connections: {
        routes: {
            files: {
                relativeTo: path.join(__dirname, 'public')
            }
        }
    }
});

// We need to specify a connection, which
// we can default to the port specified in
// an ENV variable, or 3001 if none is set.
// We also need to configure CORS for requests
// coming from a single page app
server.connection({
    port: 3000,
    routes: {
        cors: {
            origin: ['*']
        }
    }
});

// The simple way to register a plugin
// is to pass the module and a callback
server.register( Inert, ()=>{});


// If you want to view the documentation from the API 
// you need to install the inert and vision plugs-ins 
// which support templates and static content serving.
server.register(Vision, ()=> {});

// We're defining our route configuration in separate files
// and creating new routes with that configuration here
server.route(require('./api/users/routes/get_user'));
server.route(require('./api/users/routes/get_users'));
server.route(require('./api/users/routes/post_user'));
server.route(require('./api/stock-inventory/routes/get_products'));
server.route(require('./api/stock-inventory/routes/get_cart'));

// Starting the server is as simple as calling
// server.start. We can throw an error if something
// goes wrong
server.start(err => {
    if (err) throw err;
    console.log(`server listening on port ${server.info.port}`);
});