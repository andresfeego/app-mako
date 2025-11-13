export const capitalizeFirst = (str = '') => {
  const s = String(str).toLowerCase();
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const toProperCase = (str = '') =>
  String(str).replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

export const generaCodigo = (length, min = false) => {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  if (min) characters = 'abcdefghijklmnopqrstuvwxyz_0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// Note: For image resizing in React Native, prefer dedicated libs
// such as react-native-image-resizer. Not implemented here to avoid
// adding dependencies.

