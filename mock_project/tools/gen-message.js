// import localesMess  from 'locales-message'
const localesMess = require('locales-message')

 const sheetId = '1vKj9WeasuXHpzTEsdJmQftyNHnXbISIR25CkuKVyJlE'
 const range = 'A2:D'
 const pathFolder = 'locales'
localesMess.genMessage(sheetId, range, pathFolder);