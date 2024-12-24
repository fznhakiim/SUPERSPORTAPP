pipeline {
    agent any

    environment {
        GIT_REPO_URL = 'https://github.com/fznhakiim/SUPERSPORTAPP.git'
        GIT_BRANCH = 'main' // Ubah jika branch Anda berbeda
        GIT_CREDENTIALS_ID = 'SuperSportApp' // ID kredensial GitHub Anda di Jenkins
    }

    triggers {
        // Menjalankan pipeline setiap kali ada push ke GitHub
        githubPush()
    }

    stages {
        stage('Clone Repository') {
            steps {
                echo 'Cloning repository from GitHub...'
                checkout([$class: 'GitSCM', 
                    branches: [[name: env.GIT_BRANCH]],
                    userRemoteConfigs: [[
                        url: env.GIT_REPO_URL,
                        credentialsId: env.GIT_CREDENTIALS_ID
                    ]]
                ])
            }
        }

        stage('Build') {
            steps {
                echo 'Preparing project files...'
                script {
                    // Menambahkan langkah build jika ada
                    echo 'No build steps for static HTML files'
                    // Misalnya, jika menggunakan Gradle atau Maven, tambahkan perintah build di sini
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application to the server...'
                script {
                    // Menambahkan langkah untuk deploy ke server Anda
                    // Contoh: deploy.sh atau menggunakan PowerShell atau tools lainnya
                    powershell '''
                        Write-Host "Deploying application..."
                        # Tambahkan perintah deploy di sini
                    '''
                }
            }
        }

        stage('Post Actions') {
            steps {
                echo 'Deployment successful!'
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed.'
        }
        success {
            echo 'Pipeline succeeded.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
