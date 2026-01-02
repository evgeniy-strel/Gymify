import './App.css'

import { PageController } from './navigation';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router';
import { subscribeToPush } from './_utils/helpers';

function App() {
  return (
    <Router>
      <PageController />
    </Router>
  )
}

export default App
