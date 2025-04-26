import About from '../components/About'
import Skills from '../components/Skills'
import Experience from '../components/Experience'
import References from '../components/References'
import Education from '../components/Education'
import Footer from '../components/Footer'
import Layout from '@/components/Layout'
import Certifications from '@/components/Certifications'
import notion from '@/lib/notion';

export default async function Home() {
  return (
    <Layout>
      <About />
      {/* <Skills />
      <Experience />
      <Education />
      <Certifications/>
      <References /> */}
    </Layout>
  )
}
