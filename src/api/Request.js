import { SWAMP_API } from './Settings.js';


export default class RequestApi {
    static async make({
            url,
            method,
            headers={
                'Content-Type': 'application/json',
            },
            body=null,
            credentials=false
    }) {
        return fetch(`${SWAMP_API}${url}`, {
            method: method,
            headers: headers,
            body: body,
            credentials: credentials ? 'include' : 'same-origin',
        })
            .then(response => {
                if (!credentials && response.status === 401 /* Unauthorized */) {
                    window.location.href = '/login/'
                    return null
                }
                return response.json();
            })
            .then(response => response.json())  // Parse JSON data
            // .then(data => console.log(data))     // Handle the data
            .catch(error => console.error(error))  // Handle errors
    }
}
