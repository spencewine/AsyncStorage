import AsyncStorageInterface from './interface/AsyncStorage';

export class AsyncStorage extends AsyncStorageInterface {
    static setItem(key, value, callback) {
        return new Promise(function (resolve) {
            localStorage[`@AsyncStorage:${key}`] = value;
            if (callback) callback();
            resolve();
        });
    }

    static getItem(key, callback) {
        return new Promise(function (resolve) {
            let value = localStorage[`@AsyncStorage:${key}`];
            let error;
            if (callback) callback(error, value);
            resolve(value);
        });
    }

    static removeItem(key, callback) {
        return new Promise(function (resolve) {
            localStorage.removeItem(`@AsyncStorage:${key}`);
            let error;
            if (callback) callback(error);
            resolve();
        });
    }

    static getAllKeys(callback) {
        return new Promise(function (resolve) {
            let keys = [];
            Object.keys(localStorage).forEach((key) =>
                key.indexOf("@AsyncStorage:") >= 0 ? keys.push(key) : 0
            );

            let error;
            if (callback) callback(error, keys);
            resolve(keys);
        });
    }

    static clear(callback) {
        return new Promise(function (resolve) {
            localStorage.clear();
            if (callback) callback();
            resolve();
        });
    }

    static multiGet(keyArray, callback) {
        let promiseArray = keyArray.map(function(key) {
           return new Promise(function (resolve) {
                let value = localStorage.getItem(`@AsyncStorage:${key}`);

                let error;
                if (callback) callback(error, [key, value]);
                resolve([key, value]);
            });
        })
        return Promise.all(promiseArray);
    }

    static multiSet(keyValueArrays, callback) {
        let promiseArray = keyValueArrays.map(function(keyValueArray) {
            return new Promise(function (resolve) {
                localStorage.setItem(`@AsyncStorage:${keyValueArray[0]}`, keyValueArray[1]);
                if (callback) callback();
                resolve();
            });
        })
        return Promise.all(promiseArray);
    }
}
