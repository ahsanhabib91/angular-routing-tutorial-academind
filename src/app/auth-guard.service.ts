import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

	constructor(private authService: AuthService, private router: Router) { }
	
	canActivate(
	route: ActivatedRouteSnapshot,
	state: RouterStateSnapshot
	): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
		return this.authService.isAuthenticated()
		.then((authenticated: boolean) => authenticated ? true : this.router.navigate(['/']));
	}

	canActivateChild(
	route: ActivatedRouteSnapshot,
	state: RouterStateSnapshot
	): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
		return this.canActivate(route, state);
	}
}
