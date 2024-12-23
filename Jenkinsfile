pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                git branch: 'main', url: 'https://github.com/fznhakiim/PBL-SuperSportApp.git'
            }
        }
        stage('Build') {
            steps {
                echo 'Building the project...'
                // Tambahkan langkah build jika diperlukan
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                // Tambahkan langkah testing jika diperlukan
            }
        }
        stage('Push Changes') {
            steps {
                script {
                    bat '''
                    REM Path ke workspace Jenkins
                    SET REPO_PATH=%cd%

                    REM Konfigurasi username dan email untuk Git
                    git config --global user.name "fznhakiim"
                    git config --global user.email "zanziah@gmail.com"

                    REM Tambahkan perubahan dan commit
                    git add .
                    git commit -m "Auto commit by Jenkins at %DATE% %TIME%" || echo No changes to commit.

                    REM Push ke branch main
                    git push origin main
                    '''
                }
            }
        }
    }
    post {
        always {
            echo 'Pipeline execution completed!'
        }
    }
}
