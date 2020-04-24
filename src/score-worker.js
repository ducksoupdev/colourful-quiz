/* global self fetch */
self.onmessage = function (e) {
  var cache

  var compare = function (newData, oldData) {
    return JSON.stringify(newData) === JSON.stringify(oldData)
  }

  var headers = {
    'Content-Type': 'application/json',
    'X-Parse-Application-Id': '',
    'X-Parse-REST-API-Key': ''
  }

  setInterval(function () {
    fetch('https://parseapi.back4app.com/classes/current_question', {
      method: 'GET',
      headers
    })
      .then(function (res) { return res.json() })
      .then(function (data) {
        if (!compare(data, cache)) {
          cache = data
          self.postMessage(data.results[0])
        }
      })
  }, 5000)
}
