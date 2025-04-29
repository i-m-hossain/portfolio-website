import About from '../components/About'
import Layout from '@/components/Layout'
import CertificationsSection from '@/components/CertificationsSection'
import EducationSection from '../components/EducationSection'
import SkillSection from '@/components/SkillSection'
import ExperienceSection from '@/components/ExperienceSection'
import ReferenceSection from '@/components/ReferenceSection'

export default async function Home() {
  return (
    <Layout>
      <About />
      {/* <SkillSection /> */}
      {/* <ExperienceSection /> */}
      {/* <EducationSection /> */}
      {/* <CertificationsSection/> */}
      <ReferenceSection/> 
    </Layout>
  )
}
