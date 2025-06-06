#!/bin/bash

docker compose -f docker/docker-compose-5org.yaml down
sleep 2

docker compose -f docker/docker-compose-ca.yaml down
sleep 2

docker rm -f $(docker ps -a | awk '($2 ~ /dev-peer.*/) {print $1}')

docker volume rm $(docker volume ls -q)

rm -rf channel-artifacts/
rm ptracingpdt.tar.gz
rm -rf organizations/

docker stop $(docker ps -aq)       # Stop all containers
docker rm $(docker ps -aq)         # Remove all containers
docker volume prune -f             # Remove all volumes
docker network prune -f            # Remove all networks
docker rmi $(docker images -q)     # Remove all images
docker volume rm $(docker volume ls -q)

#docker rm $(docker container ls -q) --force

yes | docker container prune

yes | docker system prune

yes | docker volume prune

yes | docker network prune

docker ps -a
docker images
docker network ls
docker volume ls