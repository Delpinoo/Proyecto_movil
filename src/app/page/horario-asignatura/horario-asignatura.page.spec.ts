import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HorarioAsignaturaPage } from './horario-asignatura.page';

describe('HorarioAsignaturaPage', () => {
  let component: HorarioAsignaturaPage;
  let fixture: ComponentFixture<HorarioAsignaturaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HorarioAsignaturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
