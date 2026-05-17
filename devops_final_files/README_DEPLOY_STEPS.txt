1) Copy these files into root of GitHub repo:
   docker-compose.yml
   docker-compose.prod.yml
   .dockerignore
   .github/workflows/deploy.yml

2) Copy frontend files:
   yourprime-ui/Dockerfile
   yourprime-ui/nginx.conf
   yourprime-ui/.dockerignore
   Replace yourprime-ui/src/api/axios.js with file: yourprime-ui/axios.js.REPLACE_THIS_FILE_IN_src_api

3) GitHub Secrets:
   DOCKERHUB_USERNAME = davutdoc
   DOCKERHUB_TOKEN = NEW Docker Hub token with Read/Write/Delete permission
   AWS_HOST = 13.48.57.119
   AWS_USER = ubuntu
   AWS_SSH_KEY = full content of .pem file

4) On AWS Ubuntu one time:
   sudo apt update
   sudo apt install -y docker.io docker-compose-plugin
   sudo usermod -aG docker ubuntu
   newgrp docker

5) Open AWS Security Group inbound ports:
   22 SSH
   80 HTTP
   8080 TCP optional for Swagger/API

6) Push to GitHub main branch. GitHub Actions will build, push, and deploy.
