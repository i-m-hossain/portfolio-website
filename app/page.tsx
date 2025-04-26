import About from '../components/About'
import Skills from '../components/Skills'
import Experience from '../components/Experience'
import References from '../components/References'
import Education from '../components/Education'
import Footer from '../components/Footer'
import Layout from '@/components/Layout'
import Certifications from '@/components/Certifications'
import notion from '@/lib/notion';
import CertificationsSection from '@/components/CertificationsSection'

export default async function Home() {
  return (
    <Layout>
      <About />
      <CertificationsSection/>
      {/* <Skills />
      <Experience />
      <Education />
      <References /> */}
    </Layout>
  )
}
