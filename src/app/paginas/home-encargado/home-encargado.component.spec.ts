import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEncargadoComponent } from './home-encargado.component';

describe('HomeEncargadoComponent', () => {
  let component: HomeEncargadoComponent;
  let fixture: ComponentFixture<HomeEncargadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeEncargadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEncargadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
