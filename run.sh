#!/bin/bash

docker build --rm -t web-frontend . &&
docker run -d --name web-frontend --link web-backend:backend -p 80:80 web-frontend