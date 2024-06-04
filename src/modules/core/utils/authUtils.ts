import { jwtDecode } from 'jwt-decode';

export const getCookie = (name: string) => {
  const cookieString = document.cookie;
  const cookies = cookieString.split(';');

  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=').map((c) => c.trim());
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }

  return '';
};

export const setCookie = (name: string, value: string) => {
  if (value !== null) {
    const date = new Date();
    const decodedToken: any = jwtDecode(value);
    date.setTime(date.getTime() + decodedToken.exp);
    const expires = 'expires=' + date.toUTCString();
    document.cookie = name + '=' + value + ';' + expires + ';path=/';
  }
};

export const unsetCookie = (name: string) => {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
};
