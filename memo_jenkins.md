# Jenkins

## Download Jenkins docker image
    docker pull jenkins/jenkins

## Install
    mkdir jenkins_data

## Start
    docker run \
    --name jenkins \
    --rm \
    -d \
    -p 8080:8080 -p 50000:50000 \
    -v /home/tony/project/jenkins/jenkins_data:/var/jenkins_home \
    jenkins/jenkins

## First time to Use Jenkins
    http://localhost:8080 

    等一段時候之後，jenkins 就會要求輸入預設管理員密碼，畫面上提示 /var/jenkins_home/secrets/initialAdminPassword，但是我們有將容器的 /var/jenkins_home 對映到 host 的 /data/jenkins，所以我們可以在 /home/tony/project/jenkins/jenkins_data/secrets/initialAdminPassword 找到預設密碼

## `將 jenkins 預設 shell 從 sh 變成 bash`
    Manage Jenkins > Configure System > Shell > Shell executable

## Node
1. 在 console 啟動 Jenkins Node 時，所使用的 User ID 就會是 build job 啟動時所使用的 User ID
2. 限制 Job 在某一個 Node 執行
    
    在 Job 設定中的 限制專案執行節點 設定如
        
        (172.17.0.1)

## 單純 Build Job 設定

1. Add **Option** type Variable `$Choose_Steps`

        All
        Kill_Container
        Remove_Images

2. Shell Script

        echo Parameter : $Choose_Steps

        if [[ "$Choose_Steps" == "All" ]] || [[ "$Choose_Steps" == "Kill_Container" ]] || [[ "$Choose_Steps" == "Remove_Images" ]]; then
	        echo "停止 Docker Container"
	        if [ -n "$(docker ps -f "name=mysql_test01" -f "status=running" -q )" ]; then
    	        docker kill mysql_test01
	        fi

	        if [ -n "$(docker ps -f "name=fullstack_lab01_nodejs" -f "status=running" -q )" ]; then
    	        docker kill fullstack_lab01_nodejs
	        fi

	        if [ -n "$(docker ps -f "name=fullstack_lab01_react" -f "status=running" -q )" ]; then
    	        docker kill fullstack_lab01_react
	        fi
        fi

        if [[ "$Choose_Steps" == "All" ]] || [[ "$Choose_Steps" == "Remove_Images" ]]; then
	        echo 刪除 Docker image : fullstack_lab01_nodejs, fullstack_lab01_react ...
	        if [ -n "$(docker images -f "reference=tonyhhc/fullstack_lab01_nodejs" -q )" ]; then
    	        docker image rm tonyhhc/fullstack_lab01_nodejs
	        fi

	        if [ -n "$(docker images -f "reference=tonyhhc/fullstack_lab01_react" -q )" ]; then
    	        docker image rm tonyhhc/fullstack_lab01_react
	        fi
        fi

        if [[ "$Choose_Steps" == "All" ]]; then
	        echo "Build Image ..."
    
            cd /home/tony/project/react/fullstack_lab_01/server_nodejs
            docker build . -t tonyhhc/fullstack_lab01_nodejs
    
            cd /home/tony/project/react/fullstack_lab_01/client_ad_rect
            docker build . -t tonyhhc/fullstack_lab01_react
        fi

        if [[ "$Choose_Steps" == "All" ]]; then
	        echo Start MySQL ...
	        docker run --name mysql_test01 --rm -e MYSQL_ROOT_PASSWORD=sa -d -v /home/tony/project/react/fullstack_lab_01/mysql_data:/var/lib/mysql -p 8816:3306 mysql

	        echo Start NodeJS ...
	        docker run --name fullstack_lab01_nodejs --rm -p 8800:8800 -d tonyhhc/fullstack_lab01_nodejs

	        echo Start React ...
	        docker run --name fullstack_lab01_react --rm -p 80:80 -d tonyhhc/fullstack_lab01_react
        fi

## Pipeline 設定
Pipeline Script

    pipeline {
		agent none // 手動配置節點
		
		parameters {
			choice(name: 'Choose_Steps', choices: ['All', 'Kill_Container', 'Remove_Images'], description: '請選擇要執行的操作')
		}

		stages {
			stage('Prepare') {
				agent {
					node {
						label '172.17.0.1' // 指定 Prepare 節點
					}
				}
				steps {
					// 在 節點上執行 Prepare 步驟的命令
					sh '''
						# 在此處放置 Prepare 步驟的命令
						echo 'Hello Build'
						whoami
						pwd
						echo Parameter : $Choose_Steps
					
					'''
				}
			}
			
			stage('Stop Docker Container') {
				when {
					expression { params.Choose_Steps == 'All' || params.Choose_Steps == 'Kill_Container' || params.Choose_Steps == 'Remove_Images' }
				}
				agent {
					node {
						label '172.17.0.1' // 指定 Stop Docker Container 節點
					}
				}
				steps {
					// 在 節點上執行 Stop Docker Container 步驟的命令
					sh '''
						# 在此處放置 Stop Docker Container 步驟的命令
						echo 'Stop Docker Container'
						
						if [ -n "$(docker ps -f "name=mysql_test01" -f "status=running" -q )" ]; then
							docker kill mysql_test01
						fi

						if [ -n "$(docker ps -f "name=fullstack_lab01_nodejs" -f "status=running" -q )" ]; then
							docker kill fullstack_lab01_nodejs
						fi

						if [ -n "$(docker ps -f "name=fullstack_lab01_react" -f "status=running" -q )" ]; then
							docker kill fullstack_lab01_react
						fi
					'''
				}
			}
			
			stage('Delete Docker Image') {
				when {
					expression { params.Choose_Steps == 'All' || params.Choose_Steps == 'Remove_Images' }
				}
				agent {
					node {
						label '172.17.0.1' // 指定 Test 節點
					}
				}
				steps {
					// 在 Test 節點上執行 Delete Docker Image 步驟的命令
					sh '''
						# 在此處放置 Delete Docker Image 步驟的命令
						echo 'Delete Docker Image'
						
						if [ -n "$(docker images -f "reference=tonyhhc/fullstack_lab01_nodejs" -q )" ]; then
							docker image rm tonyhhc/fullstack_lab01_nodejs
						fi

						if [ -n "$(docker images -f "reference=tonyhhc/fullstack_lab01_react" -q )" ]; then
							docker image rm tonyhhc/fullstack_lab01_react
						fi
					'''
				}
			}
			
			stage('Build Docker Image') {
				when {
					expression { params.Choose_Steps == 'All' }
				}
				agent {
					node {
						label '172.17.0.1' // 指定 Build Docker Image 節點
					}
				}
				steps {
					// 在 節點上執行 Build Docker Image 步驟的命令
					sh '''
						# 在此處放置 Build Docker Image 步驟的命令
						echo 'Build Docker Image'
						
						cd /home/tony/project/react/fullstack_lab_01/server_nodejs
						docker build . -t tonyhhc/fullstack_lab01_nodejs
		
						cd /home/tony/project/react/fullstack_lab_01/client_ad_rect
						docker build . -t tonyhhc/fullstack_lab01_react
					'''
				}
			}
			
			stage('Start Container') {
				when {
					expression { params.Choose_Steps == 'All' }
				}
				agent {
					node {
						label '172.17.0.1' // 指定 Start Container 節點
					}
				}
				steps {
					// 在 節點上執行 Start Container 步驟的命令
					sh '''
						# 在此處放置 Start Container 步驟的命令
						echo 'Start Container'
						
						echo Start MySQL ...
						docker run --name mysql_test01 --rm -e MYSQL_ROOT_PASSWORD=sa -d -v /home/tony/project/react/fullstack_lab_01/mysql_data:/var/lib/mysql -p 8816:3306 mysql

						echo Start NodeJS ...
						docker run --name fullstack_lab01_nodejs --rm -p 8800:8800 -d tonyhhc/fullstack_lab01_nodejs

						echo Start React ...
						docker run --name fullstack_lab01_react --rm -p 80:80 -d tonyhhc/fullstack_lab01_react
					'''
				}
			}
		}
	}

