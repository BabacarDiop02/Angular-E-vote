import { HttpInterceptorFn } from '@angular/common/http';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem("token");
  // Liste des URLs à exclure
  const excludedUrls = [
    "/api/e-vote/registration",
    "/api/e-vote/activation",
    "/api/e-vote/connection",
    "/api/e-vote/update-password",
    "/api/e-vote/new-password",
    "/api/e-vote/candidates"
  ];

  // Vérifier si l'URL fait partie des exclusions
  if (excludedUrls.some(url => req.url.includes(url))) {
    return next(req); // Ne pas modifier la requête
  }

  if (token !== null) {
    const clonedRequest = req.clone({
      setHeaders: {Authorization: `Bearer ${token}`}
    });
    return next(clonedRequest);
  }

  return next(req);
};
