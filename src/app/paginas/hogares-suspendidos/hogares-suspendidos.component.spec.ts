import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HogaresSuspendidosComponent } from './hogares-suspendidos.component';

describe('HogaresSuspendidosComponent', () => {
  let component: HogaresSuspendidosComponent;
  let fixture: ComponentFixture<HogaresSuspendidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HogaresSuspendidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HogaresSuspendidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
