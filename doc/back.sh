docker pull mongo:latest
docker network create -d bridge thetime
# docker run -itd --name back-laboratory -p 58888:8888 mongo --auth
# docker run -itd --name back-laboratory --network thetime mongo --auth
docker run -itd --name back-laboratory --network=host mongo --auth
docker exec -it back-laboratory /bin/bash

# sudo apt-get install nodejs
# sudo apt-get install npm

# ./note.md#linux-install-node
