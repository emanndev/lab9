 import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkMode = false;
  private themeKey = 'theme';
  currentTheme = this.isDarkMode ? 'dark' : 'light';
 
 constructor(){
    this.startTheme();
  }
  private startTheme(): void{
    const savedTheme = localStorage.getItem(this.themeKey);

    if(savedTheme){
      this.isDarkMode = savedTheme === 'dark';
    }
    else{
      this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.saveThemeToLocalStorage();
    }
    this.applyTheme();
  }

  private saveThemeToLocalStorage(): void{
    localStorage.setItem(this.themeKey, this.isDarkMode ? 'dark' : 'light');
  }

  private applyTheme(): void{
   const body = document.body;
   if(this.isDarkMode){
 //   body.dataset['theme'] = 'dark';
     body.classList.add('dark-theme');
     body.classList.remove('light-theme');
   }
   else{
    //body.dataset['theme'] = 'light';
     body.classList.add('light-theme');
     body.classList.remove('dark-theme');
   }
  }


toggleTheme(): void{
  this.isDarkMode = !this.isDarkMode;
  this.saveThemeToLocalStorage();
  this.applyTheme();

}

listenToSystemThemeChanges(): void{
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  mediaQuery.addEventListener('change', (e) => {
    const savedTheme = localStorage.getItem(this.themeKey);
    if(!savedTheme){
      this.isDarkMode = e.matches;
      this.applyTheme();
    }
  });
}

resetToSystemPreference(): void{
localStorage.removeItem(this.themeKey);
this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
this.applyTheme();
}


}


// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';


// @Injectable({
//   providedIn: 'root'
// })
// export class ThemeService {
// private themeSubject = new BehaviorSubject<string>(localStorage.getItem('theme') || 'light');
// theme$ = this.themeSubject.asObservable();

// toggleTheme() {
//   const newTheme = this.themeSubject.value === 'light' ? 'dark' : 'light';
//   this.themeSubject.next(newTheme);
//   localStorage.setItem('theme', newTheme);
//   document.body.className = newTheme;
// }

// get currentTheme() {
//   return this.themeSubject.value;
// }

//   constructor() { }
// }




















