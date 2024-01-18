export type ProductFeed = {
  name: string
  id: number
  user: string
}

class MakairaClient {
  token: undefined | string = undefined
  domain: undefined | string = undefined
  instance: undefined | string = undefined

  setDomain(domain: string) {
    this.domain = domain
  }

  setToken(token: string) {
    this.token = token
  }

  setInstance(instance: string) {
    this.instance = instance
  }

  async fetch(path: string, options: RequestInit = {}) {
    if (!this.instance) {
      throw new Error('instance is undefined')
    }

    let url = process.env.NEXT_PUBLIC_CUSTOM_MAKAIRA_DOMAIN
      ? `https://${process.env.NEXT_PUBLIC_CUSTOM_MAKAIRA_DOMAIN}/${path}`
      : `https://${this.domain}/${path}`

    const headers = new Headers()
    headers.append('x-makaira-instance', this.instance)
    headers.append('Authorization', `Bearer ${this.token}`)

    if (!this.token && process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_DEV_TOKEN) {
      headers.set('Authorization', `Bearer ${process.env.NEXT_PUBLIC_DEV_TOKEN}`)
    }

    return fetch(url, {
      headers,
      ...options
    })
  
  }

  async fetchFeeds() {
    const searchParams = new URLSearchParams()

    searchParams.append('_start', '0')
    searchParams.append('_end', '20')
    searchParams.append('_sort', 'changed')
    searchParams.append('_order', 'desc')

    return this.fetch(`productfeed?${searchParams.toString()}`)
  }
}

export default MakairaClient
