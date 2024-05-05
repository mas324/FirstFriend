const { withAndroidManifest, AndroidConfig } = require('expo/config-plugins');

const { addMetaDataItemToMainApplication, getMainApplicationOrThrow } = AndroidConfig.Manifest;

module.exports = function androidManifestPlugin(config) {
    return withAndroidManifest(config, async config => {
        config.modResults = await setConfigAsync(config, config.modResults);
        return config;
    })
}

async function setConfigAsync(config, manifest) {
    const value = 'AIzaSyCRdqlwlnZkwy7GT0yxV17s1AE2Pmm-yCA';
    const mainApp = getMainApplicationOrThrow(manifest);
    addMetaDataItemToMainApplication(mainApp, 'com.google.android.geo.API_KEY', value);
    return manifest;
}
