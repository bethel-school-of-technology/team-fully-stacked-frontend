import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
 providedIn: 'root'
})
export class AuthGuard implements CanActivate {

 // inject the router service to allow navigation.
 constructor(private router: Router) { }

//  canActivate(
// //  route: ActivatedRouteSnapshot,
// //  state: RouterStateSnapshot): Observable<boolean | UrlTree> {
   
// this.userService.isloggedIn;

// canActivate(): Observable<boolean>{
// return this.userService.
// }

canActivate(): boolean{
  if(localStorage.getItem("userId")){
    return true;
  }
  else{
    this.router.navigateByUrl('/signin')
    return false;
  }

 }

 }

//    const { role } = loggedInUser;
   
//    // provides the route configuration options.
//    const { routeConfig } = route; 
   
//    // provides the path of the route.
//    const { path } = routeConfig as Route; 
   
//    if (path?.includes('admin') && role === 'admin') {
//    // if user is administrator and is trying to access admin routes, allow access.

//      return true;
//    }
   
//    if (path?.includes('customer') && role === 'customer') {
//    // if user is customer and is accessing customer route, allow access.

//      return true;
//    }
    
//    if ((path?.includes('guest') || path?.includes('home')) && (role === 'customer' || role === 'administrator')) {
//    // if a logged in user goes to Guest or Home, navigate to their respective dashboard.

//        this.router.navigateByUrl(role === 'customer' ? '/customer' : '/admin');
//        return false;
//    }
   
//    // for any other condition, navigate to the forbidden route.

//    this.router.navigateByUrl('/forbidden'); 
//    return false;
//  }
