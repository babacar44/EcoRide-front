import { inject, Injectable } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import {AuthService} from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getAuthorizationHeader();

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `${token}`
      }
    });
    return next(cloned);
  }

  return next(req);
};
