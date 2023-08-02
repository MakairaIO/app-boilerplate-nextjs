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

  async fetch<ResponseData>(path: string, method: string = 'GET') {
    if (!this.instance) {
      throw new Error('instance is undefined')
    }

    let url = process.env.NEXT_PUBLIC_CUSTOM_MAKAIRA_DOMAIN
      ? `https://${process.env.NEXT_PUBLIC_CUSTOM_MAKAIRA_DOMAIN}/${path}`
      : `https://${this.domain}/${path}`

    const headers = new Headers()
    headers.append('x-makaira-instance', this.instance)
    headers.append('Authorization', `Bearer ${this.token}`)

    const response = await fetch(url, {
      method,
      headers,
    })

    if (response.status !== 200) {
      throw new Error('Response failed')
    }

    return (await response.json()) as Promise<ResponseData>
  }

  async fetchFeeds(): Promise<ProductFeed[]> {
    const searchParams = new URLSearchParams()

    searchParams.append('_start', '0')
    searchParams.append('_end', '20')
    searchParams.append('_sort', 'changed')
    searchParams.append('_order', 'desc')

    return this.fetch<ProductFeed[]>(`productfeed?${searchParams.toString()}`)
  }
}

export default MakairaClient
