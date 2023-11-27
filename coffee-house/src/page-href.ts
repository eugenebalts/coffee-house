const PageHref = {
  devHref: 'http://localhost:9000',
  prodHref:
    'https://rolling-scopes-school.github.io/eugenebalts-JSFE2023Q4/coffee-house/dist/',
};

const { devHref, prodHref } = PageHref;

export default function getHref() {
  return window.location.origin === 'https://rolling-scopes-school.github.io'
    ? prodHref
    : devHref;
}
