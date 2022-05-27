// export const regRule = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/
// export const regEnglishName = /^([a-zA-Z0-9. _]){0,25}$/
// export const regAnyName = /^[^~!@#$%^&*()|`;:"=']*$/

// export const regAdminURL = /^(\/admin)$|^(\/admin\/)/
// export const regBackendURL = /^(\/admin)$|^(\/admin\/)|^(\/client$)|^(\/client\/)/
// export const regLoginSignUpURL = /^(\/login)$|^(\/login\/)|^(\/signup$)|^(\/signup\/)/
//export const regInternalLink = /^(\/admin)$|^(\/admin\/)/

export const REGEX_EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
export const REGEX_EXTERNAL_URL = /^http(s)?:\/\/[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/