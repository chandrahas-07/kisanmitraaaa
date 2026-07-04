const awsConfig = {
  Auth: {
    region: 'ap-south-1',
    userPoolId: 'us-east-1_UNHWmLkTn', 
    userPoolWebClientId: '2iv4kpj887m9fqeogt3s4epkv7',
  },
  API: {
    endpoints: [
      {
        name: 'KisanAPI',
        endpoint: 'https://2baxi1bly1.execute-api.us-east-1.amazonaws.com/', // From Step 8
        region: 'ap-south-1'
      }
    ]
  }
};