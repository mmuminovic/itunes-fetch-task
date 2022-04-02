import axios from 'axios';

export const searchMusic = (term) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.get(
                `https://itunes.apple.com/search?term=${term}`
            );
            resolve(res.data);
        } catch (err) {
            reject(err);
        }
    });
};
