import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaAlumoPage } from './lista-alumo.page';

describe('ListaAlumoPage', () => {
  let component: ListaAlumoPage;
  let fixture: ComponentFixture<ListaAlumoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAlumoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
