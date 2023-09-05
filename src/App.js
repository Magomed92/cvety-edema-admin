import { Routes, Route } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';

import { mainRoutes } from './routes';

export default function App() {
  return (
    <div>
      <AdminLayout>
        <Routes>
          {mainRoutes.map((item) => (
            <Route key={item.path} {...item} />
          ))}
        </Routes>
      </AdminLayout>
    </div>
  );
}
