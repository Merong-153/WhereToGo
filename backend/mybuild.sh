# react project build
cd ../../WhereToGo/frontend
npm run build

# index.html, main.js 복사(이동) : dist -> static
cd ../../WhereToGo/backend
rm -rf src/main/resources/static
mv ../../WhereToGo/frontend/dist src/main/resources/static
mkdir src/main/resources/static/src
mkdir src/main/resources/static/src/assets
cp -r ../frontend/src/assets/* src/main/resources/static/src/assets/

# spring project build
./gradlew bootJar

# build image
docker build -t merong153/wheretogo .

# push image
docker push merong153/wheretogo

# remote 에서

# 컨테이너 멈추고
ssh -i src/main/resources/secret/key0527.pem ubuntu@43.201.23.203 'docker stop wheretogo'
# 컨테이너 삭제
ssh -i src/main/resources/secret/key0527.pem ubuntu@43.201.23.203 'docker rm wheretogo'
# pull image
ssh -i src/main/resources/secret/key0527.pem ubuntu@43.201.23.203 'docker pull merong153/wheretogo'
# 컨테이너 실행
ssh -i src/main/resources/secret/key0527.pem ubuntu@43.201.23.203 'docker run -d -p 8080:8080 --restart always --name wheretogo merong153/wheretogo'
# 불필요한 이미지 삭제
ssh -i src/main/resources/secret/key0527.pem ubuntu@43.201.23.203 'docker image prune -f'