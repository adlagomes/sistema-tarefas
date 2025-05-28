import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TarefasComponent } from './tarefas/tarefas.component';
import { UsuarioComponent } from './usuario/usuario.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tarefas',
    pathMatch: 'full'
  },
  {
    path: 'tarefas',
    component: TarefasComponent
  },
  {
    path: 'usuarios',
    component: UsuarioComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
