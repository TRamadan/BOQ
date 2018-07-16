import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { Ecom9App } from './app.component';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Mock Data
import { Database } from '../providers/database';
import { RootProvider } from '../providers/root/root';
import { UsersProvider } from '../providers/users/users';
import { NativeStorage } from '@ionic-native/native-storage';
import { ProductProvider } from '../providers/product/product';
import { CategoriesProvider } from '../providers/categories/categories';
import { SubCategoriesProvider } from '../providers/sub-categories/sub-categories';
import { CartProvider,Cart } from '../providers/cart/cart';

@NgModule({
  declarations: [
    Ecom9App
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(Ecom9App, {
      preloadModules: true,
      backButtonText: '',
      platforms: {
        ios: {
          scrollAssist: false, 
          autoFocusAssist: false,
          statusbarPadding: true,
        },
        android: {
        }
      }
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Ecom9App
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InAppBrowser,
    Database, 
    NativeStorage,

    Cart,
    RootProvider,
    UsersProvider,
    ProductProvider,
    CategoriesProvider,
    SubCategoriesProvider,
    CartProvider
  ]
})
export class AppModule {}
