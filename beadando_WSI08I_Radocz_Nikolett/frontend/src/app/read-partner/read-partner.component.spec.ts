import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadPartnerComponent } from './read-partner.component';

describe('ReadPartnerComponent', () => {
  let component: ReadPartnerComponent;
  let fixture: ComponentFixture<ReadPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadPartnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
