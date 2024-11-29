import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './store';
import { AuthProvider } from './contexts/auth';
import { AppRoutes } from './routes';
import { seedMockData } from './lib/mockData';

function App() {
  useEffect(() => {
    // Seed mock data when the app starts
    seedMockData().then(credentials => {
      console.log('Mock user credentials:', credentials);
    }).catch(error => {
      console.error('Error seeding mock data:', error);
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </Provider>
  );
}

export default App;