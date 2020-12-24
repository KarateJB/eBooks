# Docker - How to cleanup (unused) resources

Once in a while, you may need to cleanup resources (containers, volumes, images, networks) ...
    
## delete volumes
    
    // see: https://github.com/chadoe/docker-cleanup-volumes
    
    $ docker volume rm $(docker volume ls -qf dangling=true)
    $ docker volume ls -qf dangling=true | xargs -r docker volume rm
    
## delete networks

    $ docker network ls  
    $ docker network ls | grep "bridge"   
    $ docker network rm $(docker network ls | grep "bridge" | awk '/ / { print $1 }')
    
## remove docker images
    
    // see: http://stackoverflow.com/questions/32723111/how-to-remove-old-and-unused-docker-images
    
    $ docker images
    $ docker rmi $(docker images --filter "dangling=true" -q --no-trunc)
    
    $ docker images | grep "none"
    $ docker images | grep "none" | awk '{ print $3; }' | xargs docker rmi
    
    // Remove images created more than 10 days (240h) ago
    $ docker image prune -a --force --filter "until=240h"


## remove docker containers

    // see: http://stackoverflow.com/questions/32723111/how-to-remove-old-and-unused-docker-images
    
    $ docker ps
    $ docker ps -a
    $ docker rm $(docker ps -qa --no-trunc --filter "status=exited")
    
## remove all containers

    $ docker rm -f $(docker ps -aq)
    
## Resize disk space for docker vm
    