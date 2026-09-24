import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemoCard } from './demo-card';

describe('DemoCard', () => {
  let component: DemoCard;
  let fixture: ComponentFixture<DemoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoCard],
    }).compileComponents();

    fixture = TestBed.createComponent(DemoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
