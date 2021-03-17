export default function baseUrlHandler () {
  if( window.location.protocol === 'http:') {
    return 'http://api.shigatsimesto.students.nomoredomains.icu'
  }
  return 'https://api.shigatsimesto.students.nomoredomains.icu'
}
