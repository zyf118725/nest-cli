#!/bin/bash  

# 1. 停止所有与此镜像关联的容器
# 要查找的镜像名称或ID  
IMAGE_NAME_OR_ID="nest-template"  
for CONTAINER_ID in $(docker ps -aq --filter=ancestor="${IMAGE_NAME_OR_ID}"); do  
    echo "Stopping container: $CONTAINER_ID"  
    docker stop "$CONTAINER_ID"  
done    
echo "==== All containers associated with $IMAGE_NAME_OR_ID have been stopped."

# 2. 删除无用的镜像和容器
docker system prune -a -f
echo "===== 删除无用的镜像和容器"

# 3. 构建镜像
docker build -t  nest-template .;
# 4. 运行镜像
docker run -p 5010:5010 -d nest-template;
