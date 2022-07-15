let accessToken;
let expirationTime;
let clientId = process.env.REACT_APP_CLIENT_ID;
let redirectUri =  "http://localhost:3000/";
const EXPIRES_ = "expires_";

const Spotify = {
    getAcessToken() {
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        // null if no match
        expirationTime = expiresInMatch ? expiresInMatch[1] : null;
        // default expiry time if no match
        expirationTime = expirationTime !== null ? parseInt(expirationTime) : 3600;
        // get saved data
        let expires = sessionStorage.getItem(EXPIRES_);
    
        // no saved data
        if (!expires) {
            expires = Date.now() + Number(expirationTime) * 1000;
            sessionStorage.setItem(EXPIRES_, expires);
        }

        if (Date.now() > expires) {
            sessionStorage.removeItem(EXPIRES_);
        }
      
        if (accessToken && (Date.now() < expires)) {
            return accessToken;
        }

        accessToken = accessTokenMatch ? accessTokenMatch[1] : null;
        if (accessToken) {
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        }

        // else redirect to spotify login
        const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}&scope=playlist-modify-public`;
        window.location = accessURL;
    },

    async search(term) {    
        accessToken = this.getAcessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {Authorization: `Bearer ${accessToken}`}
        }).then(response => {
            return response.json()
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                console.log('No tracks found');
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
                preview: track.preview_url
            }));
        });
    },

    savePlaylist(playlistName, trackUris ) {
        if(!playlistName || ! trackUris.length) {
            return;
        }
        const accessToken = Spotify.getAcessToken();
        const headers = {Authorization: `Bearer ${accessToken}`};
        let userId;
        return fetch('https://api.spotify.com/v1/me', {headers: headers})
        .then(response => 
            response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: playlistName}) //JSON.stringify() converts the object to a string
            }).then(response => response.json()
            ).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({uris: trackUris})
                })
            })
        })
    },


}

export default Spotify