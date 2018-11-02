import axios from 'axios'

class BaseAdapter {
  async fetchWindow (url, type = 'json') {
    if (url) {
      try {
        console.info('****************inside fetchWindow 1', url)
        let response = await window.fetch(url)
        console.info('****************inside fetchWindow 2', response)
        if (type === 'xml') {
          return response.text()
        } else {
          return response.json()
        }
      } catch (error) {
        console.error(`Unable to get data from url ${url}`)
      }
    } else {
      console.error(`Unable to prepare parser request url`)
    }
  }

  async fetchAxios (url) {
    try {
      let res = await axios.get(encodeURI(url))
      return res.data
    } catch (error) {
      console.error(`Unable to prepare parser request url`, url, error.message)
    }
  }

  async fetch (url, type) {
    let res

    if (typeof window !== 'undefined') {
      res = await this.fetchWindow(url, type)
    } else {
      res = await this.fetchAxios(url)
    }

    return res
  }
}

export default BaseAdapter
