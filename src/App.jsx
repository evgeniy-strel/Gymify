import './App.css'

import { PageController } from './navigation';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter as Router } from 'react-router';

function App() {
  return (
    <Router>
      <PageController />
    </Router>
  )
}

export default App
