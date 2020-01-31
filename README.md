# PageHit (MongoDB database)

A page hit counter service which saves data to a MongoDB database.

This is an example project for the purposes of demonstration only. It is not recommended for production use!

[Docker](https://www.docker.com/) and Docker Compose are required. Enter `docker-compose up` to build and launch MongoDB and Node.js development containers.

To test the service, open any HTML page in the `testpages` folder. A static file server can be started using:

```sh
cd testpages
npx small-static-server
```

Then load any page to test four methods of adding a hit counter:

* <http://localhost:8888/page-svg.html>
* <http://localhost:8888/page-jswrite.html>
* <http://localhost:8888/page-jsdefer.html>
* <http://localhost:8888/page-jsajax.html>
