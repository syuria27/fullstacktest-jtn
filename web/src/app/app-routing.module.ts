import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputComponent } from './components/input/input.component'
import { OutputComponent } from './components/output/output.component'

const routes: Routes = [
  /*{ path: 'input', component: InputComponent  },
  { path: 'output', component: OutputComponent  }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
