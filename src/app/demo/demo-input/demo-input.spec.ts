import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemoInput } from './demo-input';

describe('DemoInput', () => {
  let component: DemoInput;
  let fixture: ComponentFixture<DemoInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoInput],
    }).compileComponents();

    fixture = TestBed.createComponent(DemoInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
