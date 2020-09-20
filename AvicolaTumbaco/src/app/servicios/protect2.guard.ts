import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Protect2Guard implements CanActivate {
  constructor(private readonly _router: Router) {}
  canActivate(): boolean {
    const valorLocal = JSON.parse(localStorage.getItem('log'));

    if (valorLocal == 'loginUser') {
      return true;
    } else {
      this._router.navigate(['login/']);
      return false;
    }
  }
}
