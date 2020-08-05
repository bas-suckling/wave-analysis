import request from 'superagent'

const url = '/api/v1/sessions/'

export function apiGetSessionsList(){
    return request
        .get(url)
        .then(res => res.body)
}

export function apiGetSessionData(session_id){
    return request
        .get(url + session_id)
        .then(res => res.body)
}

