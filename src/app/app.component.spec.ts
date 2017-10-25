import { TestBed, async, ComponentFixture } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { AppModule } from './app.module'

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>
  let app: AppComponent

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(AppComponent)
    app     = fixture.debugElement.componentInstance
  }))

  it('should create the app', async(() => {
    expect(app).toBeTruthy()
  }))

  it(`shouldn't show loader immediately`, async(() => {
    expect(app.loading).toBeFalsy()
  }))

  it('should render html5 video element', async(() => {
    const el = fixture.debugElement.nativeElement
    expect(el.querySelector('video')).not.toBeNull()
  }))
})
