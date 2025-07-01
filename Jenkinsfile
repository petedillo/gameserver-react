@Library('jenkins-shared-library@main') _

singleImageBuild(
    repo: 'https://github.com/petedillo/gameserver-react',
    registry: 'diolab:5000',
    host: 'clientpi',
    sshCreds: 'jenkins-petedillo',
    composePath: '/home/pete/services/gameserver-react/compose.yaml',
    imageName: 'gameserver-react',
    branch: 'main',
    buildArgs: [
        'VITE_PALWORLD_API_URL=https://api.gameserver.petedillo.com/'
    ],
    contextPath: '.',
    platform: 'linux/arm64',
    push: true
)