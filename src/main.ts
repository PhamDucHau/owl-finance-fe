import { bootstrapApplication } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { environment } from './app/environment/environment';


// bootstrapApplication(AppComponent, appConfig).catch((err) =>
//   console.error(err)
// );
bootstrapApplication(AppComponent, {
  ...appConfig, // Giữ cấu hình hiện tại
  providers: [
    ...(appConfig.providers || []), // Đảm bảo các provider cũ không bị mất
    provideFirebaseApp(() => {
      console.log('Initializing Firebase App...', environment.firebase);
      return initializeApp(environment.firebase);
    }),
    provideAuth(() => getAuth()), // Cung cấp Firebase Auth
  ],
}).catch((err) => console.error(err));
