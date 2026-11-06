import { site } from '../config/site'
import { faq } from '../content/home'
import { useSeo } from '../lib/useSeo'
import { About } from '../sections/About'
import { Benefits } from '../sections/Benefits'
import { BlogPreview } from '../sections/BlogPreview'
import { Faq } from '../sections/Faq'
import { FinalCta } from '../sections/FinalCta'
import { Hero } from '../sections/Hero'
import { HowItWorks } from '../sections/HowItWorks'
import { ReformTypes } from '../sections/ReformTypes'
import { Reviews } from '../sections/Reviews'

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    ...(site.url ? { url: site.url, logo: `${site.url}/logo.png` } : {}),
    description: 'Plataforma que conecta a particulares con profesionales de reformas en L\'Hospitalet de Llobregat y alrededores.',
    areaServed: "L'Hospitalet de Llobregat",
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  },
]

export default function Home() {
  useSeo({
    title: "PideTuReforma | Encuentra profesionales para tu reforma en L'Hospitalet",
    description: "Cuéntanos qué reforma tienes en mente y te ayudamos a encontrar profesionales en L'Hospitalet de Llobregat y alrededores. Gratis y sin compromiso.",
    path: '/',
    jsonLd,
  })
  return (
    <>
      <Hero />
      <HowItWorks />
      <Benefits />
      <ReformTypes />
      <Reviews />
      <About />
      <Faq />
      <BlogPreview />
      <FinalCta />
    </>
  )
}
