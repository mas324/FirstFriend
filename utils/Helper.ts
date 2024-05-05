import * as Crypto from 'expo-crypto';

export function degrees(direction: number) {
    let degrees = direction;
    if (degrees <= 180) {
        if (degrees < 22.5) {
            return 'N';
        } else if (degrees < 22.5 * 3 && degrees >= 22.5) {
            return 'NE';
        } else if (degrees < 22.5 * 5 && degrees >= 22.5 * 3) {
            return 'E';
        } else if (degrees < 22.5 * 7 && degrees >= 22.5 * 5) {
            return 'SE';
        } else {
            return 'S';
        }
    } else {
        degrees -= 180;
        if (degrees < 22.5) {
            return 'S';
        } else if (degrees < 22.5 * 3 && degrees >= 22.5) {
            return 'SW';
        } else if (degrees < 22.5 * 5 && degrees >= 22.5 * 3) {
            return 'W';
        } else if (degrees < 22.5 * 7 && degrees >= 22.5 * 5) {
            return 'NW';
        } else {
            return 'N';
        }
    }
}

// Function to hash any data that is needed, mainly passwords
export async function getHash(toHash: string) {
    const digest = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA512,
        toHash
    );
    return (digest);
}
