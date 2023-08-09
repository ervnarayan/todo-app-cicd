pipeline {
    agent any

    stages {
        stage('Clone Code') {
            steps {
                echo "Cloning the code from gitHub"
                git url: "https://github.com/ervnarayan/todo-app-cicd", branch: "main"
            }
        }
        
        stage('Build') {
            steps {
                echo "Building Docker Image"
                sh "docker build -t todo-app-image  ."
            }
        }
        
        stage('Push to DockerHub') {
            steps {
                echo "Code push to dockerHub"
                withCredentials([usernamePassword(credentialsId:"dockerHub",passwordVariable:"dockerHubPass",usernameVariable:"dockerHubUser")]){
                    sh "docker tag todo-app-image ${env.dockerHubUser}/todo-app:latest"
                    sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPass}"
                    sh "docker push ${env.dockerHubUser}/todo-app:latest"  
                }
            }
        }
        
        stage('Deploy') {
            steps {
                echo "Deploy Codes"
                sh "docker run --rm -d -p 3001:3001 --name todo-app-container todo-app-image"
            }
        }
    }
}