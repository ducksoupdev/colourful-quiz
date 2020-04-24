/* global self fetch */
self.onmessage = function (e) {
  var cache

  var compare = function (newData, oldData) {
    return JSON.stringify(newData) === JSON.stringify(oldData)
  }

  var headers = {
    'Content-Type': 'application/json',
    'X-Parse-Application-Id': 'kosS75aViq2uhoHYHBnpUVyjFfkCovbI6N4HDFc8',
    'X-Parse-REST-API-Key': '5JrJpf9fRNlrYYNh5PUf3EzWJRvVX31s9Ulkr8l3'
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
