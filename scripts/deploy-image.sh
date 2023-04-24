VERSION=$1
docker build -f ./docker/app/Dockerfile --tag www.thinhlh.com/user_service:${VERSION} .

docker push www.thinhlh.com/user_service:${VERSION}