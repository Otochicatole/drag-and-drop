import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getRoutes } from './routes/routes';

const App = () => {
  const routes = getRoutes();


  return (
    <Router>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={<div className='overflow-hidden'><route.component /></div>} />
        ))}
      </Routes>
    </Router>
  );
};

export default App;
