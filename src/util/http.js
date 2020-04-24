import { showDangerNotification } from './notifications.js'

const headers = {
  'Content-Type': 'application/json',
  'X-Parse-Application-Id': '',
  'X-Parse-REST-API-Key': ''
}

export function get (url) {
  return window.fetch(url, {
    method: 'GET',
    headers
  })
    .then(res => {
      if (res.status === 200) {
        return res.json()
      } else {
        showDangerNotification('Error Fetching data')
        return res.json()
      }
    })
    .catch(e => {
      showDangerNotification(`Error Fetching data: ${e.message}`)
    })
}

export function post (url, data) {
  return window.fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  })
    .then(res => {
      if (res.status === 200) {
        return res.json()
      } else {
        showDangerNotification('Error Fetching data')
        return res.json()
      }
    })
    .catch(e => {
      showDangerNotification(`Error posting data: ${e.message}`)
    })
}
