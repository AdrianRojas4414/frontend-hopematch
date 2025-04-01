import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePadrinoComponent } from './home-padrino.component';

describe('HomePadrinoComponent', () => {
  let component: HomePadrinoComponent;
  let fixture: ComponentFixture<HomePadrinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePadrinoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePadrinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
