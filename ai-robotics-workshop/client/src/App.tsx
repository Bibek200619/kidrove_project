import FAQ from './components/FAQ'
import Footer from './components/Footer'
import Hero from './components/Hero'
import LearningOutcomes from './components/LearningOutcomes'
import RegistrationForm from './components/RegistrationForm'
import WorkshopDetails from './components/WorkshopDetails'

function App() {
  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-orange-50 via-cyan-50 to-yellow-100 text-slate-900">
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
