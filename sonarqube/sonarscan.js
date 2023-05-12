const scanner = require('sonarqube-scanner');

scanner(
    {
        serverUrl: 'http://localhost:9000',
        token: "919b40358f303b2c3fc198a1f502162935a3eecd",
        options: {
            'sonar.projectName': 'sonarqube-react-project',
            'sonar.projectDescription': 'Here I can add a description of my project',
            'sonar.projectKey': 'sonarqube-react-project',
            'sonar.projectVersion': '0.0.1',
            'sonar.exclusions': '',
            'sonar.sourceEncoding': 'UTF-8',
        }
    },
    () => process.exit()
)