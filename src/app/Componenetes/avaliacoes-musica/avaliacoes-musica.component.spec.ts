import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliacoesMusicaComponent } from './avaliacoes-musica.component';

describe('AvaliacoesMusicaComponent', () => {
  let component: AvaliacoesMusicaComponent;
  let fixture: ComponentFixture<AvaliacoesMusicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvaliacoesMusicaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvaliacoesMusicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
