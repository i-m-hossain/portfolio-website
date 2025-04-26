import About from '../components/About'
import Layout from '@/components/Layout'
import CertificationsSection from '@/components/CertificationsSection'
import EducationSection from '../components/EducationSection'
import SkillSection from '@/components/SkillSection'

export default async function Home() {
  return (
    <Layout>
      <About />
      <SkillSection />
      {/* <Experience /> */}
      <CertificationsSection/>
      <EducationSection />
      {/* 
      <References /> */}
    </Layout>
  )
}
