docker-compose up -d
docker image ls
docker exec -it thetime-node sh 

docker logs thetime-node
docker stop thetime-node
docker rm -f thetime-node

docker-compose up --force-recreate --build -d