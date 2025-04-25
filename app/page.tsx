import Header from '../components/Header'
import About from '../components/About'
import Skills from '../components/Skills'
import Experience from '../components/Experience'
import References from '../components/References'
import Education from '../components/Education'
import Footer from '../components/Footer'
import Layout from '@/components/Layout'
import Certifications from '@/components/Certifications'

export default function Home() {
  return (
    <Layout>
      <About />
      <Skills />
      <Experience />
      <Education />
      <Certifications/>
      <References />
      <Footer />
    </Layout>
  )
}
