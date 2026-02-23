import { Route, Routes } from 'react-router-dom';
import CustomerRouters from './Routers/CustomerRouters';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './State/Auth/Action';
import AdminRouters from './Routers/AdminRouters';

const App = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { user } = useSelector(store => store.auth);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser());
    }
  }, [jwt, dispatch]);

  return (
    <div>
      <Routes>
        <Route path='/*' element={<CustomerRouters />} />
        <Route path='/admin/*' element={user?.role === "ADMIN" ? <AdminRouters /> : <CustomerRouters />} />
      </Routes>
    </div>
  );
};

export default App;