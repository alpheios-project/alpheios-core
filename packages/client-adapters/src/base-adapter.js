import axios from 'axios'

class BaseAdapter {
  fetchWindow (url, type = 'json') {
    return new Promise((resolve, reject) => {
      if (url) {
        window.fetch(url).then(
          function (response) {
            try {
              if (response.ok) {
                if (type === 'xml') {
                  let xmlString = response.text()
                  resolve(xmlString)
                } else {
                  let json = response.json()
                  resolve(json)
                }
              } else {
                reject(response.statusText)
              }
            } catch (error) {
              reject(error)
            }
          }
        ).catch((error) => {
          reject(error)
        }
        )
      } else {
        reject(new Error(`Unable to prepare parser request url ${url}`))
      }
    })
  }

  async fetchAxios (url) {
    try {
      let res = await axios.get(encodeURI(url))
      return res.data
    } catch (error) {
      console.error(`Unable to prepare parser request url`, url, error.message)
    }
  }

  fetch (url, type) {
    if (typeof window !== 'undefined') {
      return this.fetchWindow(url, type)
    } else {
      return this.fetchAxios(url)
    }
  }
}

export default BaseAdapter
