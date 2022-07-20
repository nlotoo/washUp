import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MainServiceService } from '../services/main-service.service';

@Injectable({
  providedIn: 'root'
})
export class IsAuthGuard implements CanActivate {

  constructor(private ServiceComponent: MainServiceService, private route: Router) {

  }
  canActivate() {

    let result = this.ServiceComponent.isLoggedOn()
    if (!result) {
      this.ServiceComponent.clearSession()
      this.route.navigate(['/login'])
    }

    return true;
    
  }

}
