import { useEffect } from 'react'
import { site } from '../config/site'

interface Seo {
  title: string
  description: string
  path: string
  noindex?: boolean
  jsonLd?: object | object[]
  type?: 'website' | 'article'
}

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/** SEO por página: title, description, canonical, Open Graph y JSON-LD. */
export function useSeo({ title, description, path, noindex, jsonLd, type = 'website' }: Seo) {
  useEffect(() => {
    document.title = title
    const url = site.url ? site.url + path : window.location.origin + path
    setMeta('meta[name="description"]', 'name', 'description', description)
    setMeta('meta[property="og:title"]', 'property', 'og:title', title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)
    setMeta('meta[property="og:url"]', 'property', 'og:url', url)
    setMeta('meta[property="og:type"]', 'property', 'og:type', type)
    setMeta('meta[name="robots"]', 'name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = url

    const old = document.getElementById('ld-json')
    old?.remove()
    if (jsonLd) {
      const s = document.createElement('script')
      s.id = 'ld-json'
      s.type = 'application/ld+json'
      s.text = JSON.stringify(jsonLd)
      document.head.appendChild(s)
    }
  }, [title, description, path, noindex, jsonLd, type])
}
