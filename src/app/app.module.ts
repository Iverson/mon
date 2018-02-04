import 'rxjs/add/operator/map'
import 'rxjs/add/operator/zip'
import 'rxjs/add/operator/distinctUntilChanged'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { SharedModule } from './shared/shared.module'
import { DataService } from './shared/data.service'
import { RouterGuard } from './app-routes.resolver'

@NgModule({
  declarations: [
    AppComponent,
    AppRoutingModule.components
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    DataService,
    RouterGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
