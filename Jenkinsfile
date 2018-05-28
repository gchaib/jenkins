pipeline {
    agent any

    environment {
      ANSIBLE_HOST_KEY_CHECKING=false
    }

    parameters {
        string(defaultValue: 'e09789af-6cf8-4050-b1d1-c02ecdc49eff', description: '', name: 'ansible_ssh_key')
        string(defaultValue: 'b72ca11c-78c3-45b9-814c-5f2b0e44a679', description: '', name: 'github_key')
    }

    options { 
        timeout(time: 30, unit: 'MINUTES') // Stop builds to take long time to run and/or consume resources
        retry(2)
        timestamps() 
        }
    
    stages {
        stage('Build') {
            steps {
                sh 'echo "Building app"'
                ansiblePlaybook(credentialsId: "${params.ansible_ssh_key}",
                                inventory: 'hosts',
                                playbook: 'playbook.yml', 
                                tags: 'build, always')
            }
        }
        
        stage('Test') {
            steps {
                sh 'echo "Testing"'
                ansiblePlaybook(credentialsId: "${params.ansible_ssh_key}",
                                inventory: 'hosts',
                                playbook: 'playbook.yml', 
                                tags: 'test, always')
            }
                
        }
        stage('Check Pr') {
            when {
                changeRequest target: 'master'  
            }
            steps {
                sh 'echo "Notifying github"'
                githubNotify(account: 'gchaib', 
                                credentialsId: "${params.github_key}",
                                description: 'App was tested and is ready for deploy',  
                                status: 'SUCCESS')
            }
        }

        
        stage('Production Deploy') {
            when {
                branch 'master'  
            }
            steps {
                sh 'echo "Deploying"'
                ansiblePlaybook(credentialsId: "${params.ansible_ssh_key}",
                                inventory: 'hosts',
                                playbook: 'playbook.yml', 
                                tags: 'deploy, always')
            }
        }
    }
    post {
        always {
            sh 'echo "Creating artifact"'
            archiveArtifacts artifacts: 'app/src/**/*', fingerprint: true

            echo 'echo "Sanetizing workdir"'
            deleteDir()
        }
        failure {
            echo 'echo "Something went wrong!"'
        }
    }
}

