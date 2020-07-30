import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "src/interceptors/auth.interceptor";
import { Ng2SearchPipeModule } from "ng2-search-filter";

import { AngularFireModule } from "@angular/fire";

import { AngularFirestoreModule } from "@angular/fire/firestore";
import { Firebase } from "@ionic-native/firebase/ngx";
import { FirebaseCloudMessagingService } from "./services/firebase-cloud-messaging.service";

//firebase configuration
const firebase = {
  apiKey: "AIzaSyA6uv8A-p0GZdwNo7TUJ-7f2ZiRXeYU84c",
  authDomain: "com.riverdeermessenger.project",
  projectId: "messenger-684fa",
  messagingSenderId: "372432620589",
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    AngularFireModule.initializeApp(firebase),
    AngularFirestoreModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    Firebase,
    FirebaseCloudMessagingService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
