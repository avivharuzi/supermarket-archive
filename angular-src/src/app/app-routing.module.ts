// Modules
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from './pages/home/home.component';
import { ErrorPageComponent } from './components/errors/error-page/error-page.component';
import { RegisterComponent } from './pages/register/register.component';
import { CheckoutComponent } from './pages/members/customer/checkout/checkout.component';

// Members
import { MembersComponent } from './pages/members/members.component';

// Admin
import { AdminComponent } from './pages/members/admin/admin.component';
import { AdminProductsComponent } from './pages/members/admin/admin-products/admin-products.component';

// Customer
import { CustomerComponent } from './pages/members/customer/customer.component';
import { CustomerProductsComponent } from './pages/members/customer/customer-products/customer-products.component';

// Guards
import { AuthGuard } from './guards/auth/auth.guard';
import { CustomerGuard } from './guards/customer/customer.guard';
import { AdminGuard } from './guards/admin/admin.guard';

// Routes
const appRoutes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Home' } },
  { path: 'register', component: RegisterComponent, data: { title: 'Register' } },
  { path: 'members', component: MembersComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
    { path: 'customer', component: CustomerComponent, canActivate: [CustomerGuard], canActivateChild: [CustomerGuard], children: [
      { path: 'products', component: CustomerProductsComponent, data: { title: 'Products' } },
      { path: 'checkout', component: CheckoutComponent, data: { title: 'Checkout' } }
    ] },
    { path: 'admin', component: AdminComponent, canActivate: [AdminGuard], canActivateChild: [AdminGuard], children: [
      { path: 'products', component: AdminProductsComponent, data: { title: 'Products' } }
    ] }
  ] },
  { path:  '', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: ErrorPageComponent }
];

const appRouter: ModuleWithProviders = RouterModule.forRoot(appRoutes);

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ]
})
export class RoutingModule { }
