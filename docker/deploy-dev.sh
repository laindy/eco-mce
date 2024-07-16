#!/bin/bash

# clean environment
docker stop $(docker ps -a -q)
docker kill $(docker ps -a -q)
# docker rm -v $(docker ps -a -q)
# docker volume rm $(docker volume ls -q)

# run all docker
docker-compose -f docker-compose-dev.yml up -d