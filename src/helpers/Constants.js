//Keycloak OIDC Configuration.
export const Constants = {
  stsAuthority: 'http://localhost:8180/auth/realms/AdvancedRBAC/',
  clientId: 'StockApp',
  clientRoot: 'http://localhost:3000',
  clientScope: 'openid',
  redirect_uri: 'http://localhost:3000/signin-callback.html',
  silent_redirect_uri: 'http://localhost:3000/silent-renew.html',
  post_logout_redirect_uri: '',
  response_type: 'id_token token',
  grant_type: 'authorization_code',
  apiRoot: 'http://localhost:8180/auth/realms/AdvancedRBAC/protocol/openid-connect/userinfo',
  authPermissions: 'http://localhost:8180/auth/realms/AdvancedRBAC/protocol/openid-connect/token',
  permissionGrantType:'urn:ietf:params:oauth:grant-type:uma-ticket',
  resourceName: 'CompanyStockResource',
  resourceReadData: 'http://localhost:8088/user',
  resourceBroker: 'http://localhost:8088/broker'
}
