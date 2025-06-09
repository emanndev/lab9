import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textChange',
  standalone: true,
  pure: false
})
export class TextChangePipe implements PipeTransform {
  private breakpoints = {
    mobile: '(max-width: 767px)',
    tablet: '(min-width: 768px) and (max-width: 1023px)',
    desktop: '(min-width: 1024px)'
  }

  transform(textConfig:{mobile: string; tablet: string; desktop: string}): string {
    const mobileQuery = window.matchMedia(this.breakpoints.mobile);
    const tabletQuery = window.matchMedia(this.breakpoints.tablet);
    const desktopQuery = window.matchMedia(this.breakpoints.desktop);

    if(mobileQuery.matches){
      return textConfig.mobile;
    }
    else if(tabletQuery.matches){
      return textConfig.tablet;
    }
    else if(desktopQuery.matches){
      return textConfig.desktop;
    }

    return textConfig.mobile;
  }

}
