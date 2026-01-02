targetScope = 'subscription'

@minLength(1)
@maxLength(64)
@description('Name of the environment which is used to generate a short unique hash used in all resources.')
param environmentName string

@minLength(1)
@description('Primary location for all resources')
param location string

@description('Name of the resource group')
param resourceGroupName string = ''

@description('MongoDB connection string')
@secure()
param mongodbUri string

@description('JWT secret for authentication')
@secure()
param jwtSecret string

@description('OpenAI API key for AI recommendations')
@secure()
param openaiApiKey string = ''

// Tags that should be applied to all resources.
var tags = {
  'azd-env-name': environmentName
  'application': 'agrify-soil-testing'
}

// Organize resources in a resource group
resource rg 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: !empty(resourceGroupName) ? resourceGroupName : 'rg-${environmentName}'
  location: location
  tags: tags
}

// Container Apps Environment
module containerAppsEnvironment './core/host/container-apps-environment.bicep' = {
  name: 'container-apps-environment'
  scope: rg
  params: {
    name: 'cae-${environmentName}'
    location: location
    tags: tags
    logAnalyticsWorkspaceName: monitoring.outputs.logAnalyticsWorkspaceName
  }
}

// Container Registry
module containerRegistry './core/host/container-registry.bicep' = {
  name: 'container-registry'
  scope: rg
  params: {
    name: 'cr${replace(environmentName, '-', '')}'
    location: location
    tags: tags
  }
}

// Monitoring
module monitoring './core/monitor/monitoring.bicep' = {
  name: 'monitoring'
  scope: rg
  params: {
    logAnalyticsName: 'log-${environmentName}'
    applicationInsightsName: 'appi-${environmentName}'
    location: location
    tags: tags
  }
}

// User Managed Identity
module managedIdentity './core/security/managed-identity.bicep' = {
  name: 'managed-identity'
  scope: rg
  params: {
    name: 'id-${environmentName}'
    location: location
    tags: tags
  }
}

// Grant the managed identity ACR pull permissions
module acrPullRole './core/security/role-assignment.bicep' = {
  name: 'acr-pull-role'
  scope: rg
  params: {
    principalId: managedIdentity.outputs.principalId
    roleDefinitionId: '7f951dda-4ed3-4680-a7ca-43fe172d538d' // AcrPull role
    principalType: 'ServicePrincipal'
  }
}

// Backend Container App
module backendApp './core/host/container-app.bicep' = {
  name: 'backend-container-app'
  scope: rg
  params: {
    name: 'ca-backend-${environmentName}'
    location: location
    tags: union(tags, { 'azd-service-name': 'backend' })
    containerAppsEnvironmentName: containerAppsEnvironment.outputs.name
    containerRegistryName: containerRegistry.outputs.name
    managedIdentityName: managedIdentity.outputs.name
    containerName: 'backend'
    containerImage: 'nginx:latest' // Placeholder, will be replaced during deployment
    targetPort: 5000
    externalIngress: true
    env: [
      {
        name: 'NODE_ENV'
        value: 'production'
      }
      {
        name: 'PORT'
        value: '5000'
      }
      {
        name: 'MONGODB_URI'
        secretRef: 'mongodb-uri'
      }
      {
        name: 'JWT_SECRET'
        secretRef: 'jwt-secret'
      }
      {
        name: 'OPENAI_API_KEY'
        secretRef: 'openai-api-key'
      }
      {
        name: 'CLIENT_URL'
        value: frontendApp.outputs.uri
      }
      {
        name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
        value: monitoring.outputs.applicationInsightsConnectionString
      }
    ]
    secrets: [
      {
        name: 'mongodb-uri'
        value: mongodbUri
      }
      {
        name: 'jwt-secret'
        value: jwtSecret
      }
      {
        name: 'openai-api-key'
        value: openaiApiKey
      }
    ]
  }
  dependsOn: [
    acrPullRole
  ]
}

// Frontend Container App
module frontendApp './core/host/container-app.bicep' = {
  name: 'frontend-container-app'
  scope: rg
  params: {
    name: 'ca-frontend-${environmentName}'
    location: location
    tags: union(tags, { 'azd-service-name': 'frontend' })
    containerAppsEnvironmentName: containerAppsEnvironment.outputs.name
    containerRegistryName: containerRegistry.outputs.name
    managedIdentityName: managedIdentity.outputs.name
    containerName: 'frontend'
    containerImage: 'nginx:latest' // Placeholder, will be replaced during deployment
    targetPort: 80
    externalIngress: true
    env: [
      {
        name: 'REACT_APP_API_URL'
        value: '${backendApp.outputs.uri}/api'
      }
      {
        name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
        value: monitoring.outputs.applicationInsightsConnectionString
      }
    ]
    secrets: []
  }
  dependsOn: [
    acrPullRole
    backendApp
  ]
}

// Outputs
output AZURE_LOCATION string = location
output AZURE_CONTAINER_REGISTRY_ENDPOINT string = containerRegistry.outputs.loginServer
output AZURE_CONTAINER_REGISTRY_NAME string = containerRegistry.outputs.name
output BACKEND_URI string = backendApp.outputs.uri
output FRONTEND_URI string = frontendApp.outputs.uri
output APPLICATIONINSIGHTS_CONNECTION_STRING string = monitoring.outputs.applicationInsightsConnectionString
