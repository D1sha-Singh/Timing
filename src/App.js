import './App.css';
import { store, persistor } from './app/store'
import { Provider } from 'react-redux'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';
import ErrorPage from './components/ErrorPage';
import Home from './components/Home';
import History from './components/History';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: 'history',
    element: <History />
  }
]);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
