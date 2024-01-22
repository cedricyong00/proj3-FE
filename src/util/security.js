import * as CryptoJS from 'crypto-js';
import {getRndInteger} from './random';

const SALT_LENGTH = 128;
const KEY_SIZE = 256/32;
const MIN_ITERATIONS = 3;
const MAX_ITERATIONS = 10;

export function hashData(data) {
    var salt = CryptoJS.lib.WordArray.random(SALT_LENGTH).toString(CryptoJS.enc.Base64);
    var iterations = getRndInteger(MIN_ITERATIONS, MAX_ITERATIONS);
    console.log(data, salt, iterations);
    var hash = CryptoJS.PBKDF2(data , salt, {
        keySize: KEY_SIZE,
        iterations: iterations
    });
    return {hash: hash.toString(CryptoJS.enc.Base64), salt: salt, iterations: iterations};
}

export function hashDataWithSaltRounds (data, salt, iterations) {
    return CryptoJS.PBKDF2(data, salt, {
        keySize: KEY_SIZE,
        iterations: iterations
    }).toString(CryptoJS.enc.Base64)
}