import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Router } from '@angular/router'
import { DataService } from './shared/data.service'

@Injectable()
export class RouterGuard implements Resolve<any> {
  constructor(
    private router: Router,
    private dataService: DataService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.dataService.fetchRoutes()
  }
}
