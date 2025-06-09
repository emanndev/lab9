import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';

const routes: Routes = [
  { path: '', component: InvoiceListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [provideRouter(routes)]
})
export class AppRoutingModule { }