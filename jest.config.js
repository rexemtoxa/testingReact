module.exports = {
  verbose: true,
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
  setupFilesAfterEnv: ['./setupTests.js'],
  testEnvironment: 'enzyme',
  testEnvironmentOptions: {
    enzymeAdapter: 'react16',
  },
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
};
