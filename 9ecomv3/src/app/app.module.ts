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
import { CategoryProvider} from '../providers/category/category';
import { NativeStorage } from '@ionic-native/native-storage';
import { Order } from '../providers/order/order';
import { FiltersProvider } from '../providers/filters/filters';
import { ComponentsModule } from '../components/components.module'; 
import { Keyboard } from "@ionic-native/keyboard";
@NgModule({
  declarations: [
    Ecom9App,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ComponentsModule,
    IonicModule.forRoot(Ecom9App, {
      scrollPadding: false,
      scrollAssist: true, 
      autoFocusAssist: false,
      preloadModules: true,
      backButtonText: '',
      platforms: {
        ios: {
          
          statusbarPadding: true,
        },
        android: {
          statusbarPadding: true,
          
        }
      }
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Ecom9App,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InAppBrowser,
    Database, 
    NativeStorage,
    RootProvider,
    UsersProvider,
    CategoryProvider,
    Order,

    FiltersProvider
  ]
})
export class AppModule {}
