
# Test

The purpose of this project is to create a simple Jenkins CI/CD pipeline for deploying an nodejs app. The proposed architecture is the following:

* Nginx as reverse proxy for jenkins in / and for the app in /logs;
* Both inside docker containers;
* Application being launched by ansible runnning docker-compose commands;
* For this case, application is being deployed in the same host that is running Jenkins.

![Alt text](pics/pic.jpg?raw=true "arch")

Directory structure:
```
.
├── Dockerfile.jenkins
├── Dockerfile.nginx
├── Jenkinsfile
├── README.md
├── app
│   ├── Dockerfile
│   ├── docker-compose.override.yml
│   ├── docker-compose.test.yml
│   ├── docker-compose.yml
│   ├── package.json
│   ├── src
│   │   ├── db.js
│   │   ├── schemas
│   │   │   └── logs.js
│   │   └── server.js
│   ├── test
│   │   └── logs.js
│   └── yarn.lock
├── docker-compose.yml
├── hosts
├── nginx.conf
├── pics
│   ├── github1.png
│   ├── github2.png
│   ├── jenkins-conf.png
│   └── pic.jpg
└── playbook.yml
```
### Prerequisites

This project requires the following:

* docker >= 17.12.0-ce
* docker-compose >= 1.21.2
* yarn >= 1.7.0
* npm >= 3.5.2

## Getting Started

First steps:

 1. Clone this repository to your local machine.
 2. Run jenkins and nginx inside docker ([IMPORTANT] execute following commands in the root of the copied repository):
```
docker-compose build

docker-compose up -d

curl localhost (check if ngninx is running in port 80 and is redirecting requests to jenkins)
```
 3. Open browser and type your host public ip to access jenkins! 
 4. Configure jenkins:
    1. Install recommend plugins + GitHub Notify Step Plugin + Ansible Plugin + Pipeline: Multibranch
    2. Create a multibranh pipeline and configure it as bellow ([IMPORTANT] insert your credentials):
    ![Alt text](pics/jenkins-conf.png?raw=true "arch")
    3. Create 2 more credentials in Jenkins: The first for ansible connect via ssh with the host where you are deploying your application and in the other insert an GitHub Api token. Later, edit Jenkinsfile and insert the correct credentialsIds in the parameter section. 
 5. Configure github webhook and add a branch protection rule in master branch ([IMPORTANT] statuses will appear after three events: merge, pr to master and test step execution):
    ![Alt text](pics/github1.png?raw=true "arch")
    ![Alt text](pics/github2.png?raw=true "arch")
 6. You are all set! 

## Testing

 1. Make changes in the repository and check if jenkins is building/testing/deploying the application. (Depends on the branch and requested action [pull requests, merge, etc]).
 2. App can be accessed in <host-ip>/logs

## Future Versions
 1. Posible future improvements:
      1. User Docker Machine
      2. Create a docker cluster
      3. Use Ansible Container
      4. Configure repository dynamically (via script)
      5. Implement better clean up process (remove old docker images, etc)

## Tracked Issues
  1. Playbook.yml has an absolute path of docker-compose binary location in remote host.

## Authors

* **Giovanni Toledo** - *giovannichaib@gmail.com*

