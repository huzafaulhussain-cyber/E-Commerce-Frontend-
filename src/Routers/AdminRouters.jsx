// import React from 'react'
// import { Route, Routes } from 'react-router-dom'
// import Admin from '../Admin/Admin'
// import CustomerDetails from '../Admin/components/CustomerDetails'

// const AdminRouters = () => {
//     return (
//         <div>
//             <Routes>
//                 <Route path='/*' element={<Admin />} />
//                         <Route path="/customers/:userId" element={<CustomerDetails />}></Route>

//             </Routes>
//         </div>
//     )
// }

// export default AdminRouters

// AdminRouters.jsx
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Admin from '../Admin/Admin'

const AdminRouters = () => {
  return (
    <Routes>
      
        <Route path="/*" element={<Admin />} />
    </Routes>
  );
}

export default AdminRouters;