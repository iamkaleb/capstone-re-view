const remoteURL = 'http://localhost:8088'

export default {

    getAll (collection) {
        return fetch(`${remoteURL}/${collection}`)
                .then(response => response.json())
    },

    get (collection, id) {
        return fetch(`${remoteURL}/${collection}/${id}`)
                .then(response => response.json())
    },

    post (collection, newObject) {
        return fetch(`${remoteURL}/${collection}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newObject)
        }).then(response => response.json())
    },

    delete (collection, id) {
        return fetch(`${remoteURL}/${collection}/${id}`, {
            method: "DELETE"
        })
    },
    
    update (collection, editedObject) {
        return fetch(`${remoteURL}/${collection}/${editedObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedObject)
        }).then(response => response.json())
    },

    getByProperty (collection, key, value) {
        return fetch(`${remoteURL}/${collection}?${key}=${value}`)
                .then(response => response.json())
    },

    getWithEmbed(collection1, id, collection2) {
        return fetch(`${remoteURL}/${collection1}/${id}?_embed=${collection2}`)
                    .then(response => response.json())
    },

    getWithExpand(collection1, id, collection2) {
        return fetch(`${remoteURL}/${collection1}/${id}?_expand=${collection2}`)
                    .then(response => response.json())
    },
}