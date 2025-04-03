import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NinosHogarComponent } from './ninos-hogar.component';

describe('NinosHogarComponent', () => {
  let component: NinosHogarComponent;
  let fixture: ComponentFixture<NinosHogarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NinosHogarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NinosHogarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
