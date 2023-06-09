import { Navigate, Outlet } from 'react-router-dom';


export default function RouteGuard () {
 
   function hasJWT() {
       let flag = false;
       //check user has JWT token
       localStorage.getItem("jwt") ? flag=true : flag=false
       return flag
   }
 
    return (
        hasJWT() ? <Outlet /> : <Navigate to={{ pathname: '/' }} />
           )
}
      
 
