import { SWAMP_API } from './_settings.js';


export default class FrequencyApi {
    static async getFrequencies() {
        return fetch(`${SWAMP_API}/frequencies/`)
            .then(res => res.json())
    }
}
