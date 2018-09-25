export default function logOut() {
    window.localStorage.removeItem('auth_token');
    window.location.href = '/';
}