import request from 'superagent'

const url = '/api/v1/sessions'

export function apiGetSessions(){
    return request
        .get(url)
        .then(res => console.log(res.body))
}

