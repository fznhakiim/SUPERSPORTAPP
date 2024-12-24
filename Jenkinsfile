pipeline {
    agent any

    environment {
        GIT_REPO_URL = 'https://github.com/fznhakiim/SUPERSPORTAPP.git'
        GIT_BRANCH = 'main' // Ubah jika branch Anda berbeda
        GIT_CREDENTIALS_ID = 'SuperSportApp' // ID kredensial GitHub Anda di Jenkins
    }

    triggers {
        cron('H/15 * * * *') // Menjalankan pipeline setiap 15 menit
    }

    stages {
        stage('Checkout') {
            steps {
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
                echo 'Building the project...'
                // Tambahkan perintah build proyek Anda di sini
                // Contoh: bat 'gradlew build'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                // Tambahkan perintah pengujian di sini
                // Contoh: bat 'gradlew test'
            }
        }

        stage('Push Changes') {
            steps {
                script {
                    // Pastikan branch utama aktif sebelum melakukan push
                    bat """
                        git config user.name "fznhakiim"
                        git config user.email "zanziah@gmail.com"
                        git checkout ${env.GIT_BRANCH}
                        git add .
                        git commit -m "Automated commit from Jenkins pipeline" || echo "Nothing to commit"
                        git push origin ${env.GIT_BRANCH}
                    """
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed.'
        }
        failure {
            echo 'Pipeline failed.'
        }
        success {
            echo 'Pipeline succeeded.'
        }
    }
}
