import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';
import { ProductComponent } from './components/product/product.component';
import { PriceBeforeDiscountPipe } from './pipes/price-before-discount.pipe';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { ItemComponent } from './components/checkout/item/item.component';
import { AdditionalInfoDialogComponent } from './components/checkout/additional-info-dialog/additional-info-dialog.component';
import { HotToastModule } from '@ngneat/hot-toast';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarModule,
} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SpinnerComponent,
    ProductComponent,
    PriceBeforeDiscountPipe,
    CheckoutComponent,
    FavoritesComponent,
    ItemComponent,
    AdditionalInfoDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    InfiniteScrollModule,
    HotToastModule.forRoot(),
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    // MatSnackBarModule
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 2500,
        // horizontalPosition: 'end',
        // verticalPosition: 'bottom',
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
