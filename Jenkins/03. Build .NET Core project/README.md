# Build .NET Core project

## Jenkins: Install plugins

We will need these plugins in this go thru:

1. [MSTest](https://plugins.jenkins.io/mstest)
2. [Slack Notification](https://plugins.jenkins.io/slack)

> This MSTest plugin converts MSTest TRX test reports into JUnit XML reports so it can be integrated with Jenkin's JUnit features, such as visualized **Test Result**.


## Slack notification

> The official document: [jenkinsci/slack-plugin](https://github.com/jenkinsci/slack-plugin)


Of course we need a Slack channel on a workspace.
Click [here to configure the Jenkins integration](https://my.slack.com/services/new/jenkins-ci).

![](assets/001.png)

After you click **[Add Jenkins CI integration]**, follow the step-by-step setup instructions to complete the **Global Slack Notifier Settings** (which locates at **[Manage Jenkins]**->**[Configure System]**).

![](assets/002.png)


Then in your can add it as a Post-build action in a FreeStyle Project.

![](assets/003.png)


Or use it in the Jenkinsfile.


## Install .NET Core SDK on build server

> [.NET Core download page](https://dotnet.microsoft.com/download)

Check your OS by,

```
$ cat /etc/issue.net
Debian GNU/Linux 9
```

For example, to install .NET Core on [Debian 9](https://dotnet.microsoft.com/download/linux-package-manager/debian9/sdk-current)

```
$ wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.asc.gpg
$ sudo mv microsoft.asc.gpg /etc/apt/trusted.gpg.d/
$ wget -q https://packages.microsoft.com/config/debian/9/prod.list
$ sudo mv prod.list /etc/apt/sources.list.d/microsoft-prod.list
$ sudo chown root:root /etc/apt/trusted.gpg.d/microsoft.asc.gpg
$ sudo chown root:root /etc/apt/sources.list.d/microsoft-prod.list
$ sudo apt-get install apt-transport-https
$ sudo apt-get update
$ sudo apt-get install dotnet-sdk-2.2
```


## Jenkins file

```
pipeline {
    agent {
        label 'master'
    }
    triggers {
        pollSCM 'H/1 * * * *'
    }
    environment {
		BASE_DIR = 'Src'
	}
    stages {
        stage('Build') {
            steps {
                sh """
                   echo "BASE_DIR=${env.BASE_DIR}"
                   cd ${env.BASE_DIR}
                   dotnet build
                   """
            }
            post {
				always {
					script {
                        buildStatus = currentBuild.currentResult
                        commitId = sh(returnStdout: true, script: 'git rev-parse --short HEAD')
                        notifyBuild(buildStatus, commitId)
					}
				}
			}
        }
        stage('UnitTest') {
			steps {
                sh  """
                    cd ${env.BASE_DIR}/Welfare.Test
				    dotnet test -r Results --logger "trx;LogFileName=report.trx"
                    """
				step([$class: 'MSTestPublisher', testResultsFile:"${env.BASE_DIR}/Welfare.Test/Results/*.trx", failOnError: true, keepLongStdio: true])
			}
            post {
				always {
					script {
                        buildStatus = currentBuild.currentResult
                        commitId = sh(returnStdout: true, script: 'git rev-parse --short HEAD')
                        notifyBuild(buildStatus, commitId)
					}
				}
			}
		}
    }
}

def notifyBuild(String buildStatus, String commitId) {
  // build status of null means successful
  buildStatus = buildStatus ?: 'SUCCESS'

  // Default values
  def colorCode = '#FF0000'
  def msg = "${buildStatus} on #${env.BUILD_NUMBER} - ${STAGE_NAME} \n[${env.JOB_NAME}] - ${commitId} \n${env.BUILD_URL}"

  if (buildStatus == 'SUCCESS') {
    colorCode = '#00FF00'
  }
  else if(buildStatus == 'ABORTED') {
    colorCode = '#FF0000'
  }
   else {
    colorCode = '#FF0000'
  }

  // Send notifications
  slackSend (color: colorCode, message: msg)
}
```


The build messages are as following,

(Failed on Unit test)

![](assets/004.png)

(Success)

![](assets/005.png)

