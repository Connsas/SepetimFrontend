import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { LocaleStorageService } from '../services/locale-storage.service';



export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let localStorageService:LocaleStorageService = new LocaleStorageService;
  let token = localStorageService.getFromLocalStorage('token');
  let newRequest : HttpRequest<any>;
  newRequest = req.clone({
    headers: req.headers.set("Authorization","Bearer " + token)
  });
  return next(newRequest);
};
      