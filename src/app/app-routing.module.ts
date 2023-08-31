import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { authGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'favorites', component: FavoritesComponent, canActivate: [authGuard] },
  { path: 'checkout', component: CheckoutComponent }, // Task description says that this page is available for everyone but only logged in users can call API for adding products to the cart (/carts/add)

  { path: 'login', component: LoginComponent },

  // {
  //   path: 'not-found',
  //   component: NotFoundComponent
  // },
  // {
  //   path: '**',
  //   redirectTo: '/not-found',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
