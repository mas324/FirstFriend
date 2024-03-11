import * as React from 'react';

export const AuthContext = React.createContext();

export async function hasher(toHash) {
    
    let Crypto;
    try {
        Crypto = require('expo-crypto');
    } catch (error) {
        console.error('crypto is disabled');
    }
    
    const digest = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA512,
        toHash
    );

    console.log('Recieved: ', toHash);
    console.log('Returning: ', digest);
    return(digest);
}
