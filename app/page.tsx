import About from '../components/About'
import Skills from '../components/Skills'
import Experience from '../components/Experience'
import References from '../components/References'
import Footer from '../components/Footer'
import Layout from '@/components/Layout'
import Certifications from '@/components/Certifications'
import notion from '@/lib/notion';
import CertificationsSection from '@/components/CertificationsSection'
import EducationSection from '../components/EducationSection'

export default async function Home() {
  return (
    <Layout>
      <About />
      <CertificationsSection/>
      <EducationSection />
      {/* <Skills />
      <Experience />
      <References /> */}
    </Layout>
  )
}
