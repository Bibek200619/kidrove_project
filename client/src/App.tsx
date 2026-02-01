import FAQ from './components/FAQ'
import Footer from './components/Footer'
import Hero from './components/Hero'
import LearningOutcomes from './components/LearningOutcomes'
import RegistrationForm from './components/RegistrationForm'
import ScrollProgress from './components/ScrollProgress'
import WorkshopDetails from './components/WorkshopDetails'

function App() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#fffaf2] text-slate-900">
      <ScrollProgress />
      <Hero />
      <WorkshopDetails />
      <LearningOutcomes />
      <FAQ />
      <RegistrationForm />
      <Footer />
    </div>
  )
}

export default App
