import './App.css'
import ImageInput from './components/Form/ImageInput/ImageInput'
import PersonalInfo from './components/Form/PersonalInfo/PersonalInfo'
import Profile from './components/Form/Profile/Profile'
import Nav from './components/Nav/Nav'
import SideNav from './components/SideNav/SideNav'

function App() {

  return (
    <div className='app'>
      <SideNav />
      <div className='navForm'>
        <Nav />
        <ImageInput />
        <PersonalInfo />
        <Profile />
      </div>
    </div>
  )
}

export default App
