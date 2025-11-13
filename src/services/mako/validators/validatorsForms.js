import { usuarioExiste } from '../helpersGetDB';
import { HelpTexts } from './HelpTexts';

export const validaMail = (text, creandoUsuario) => {
  return new Promise((resolve) => {
    if (!text) return resolve({ error: true, text, errorText: HelpTexts.vacioGeneral });

    const expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,})+$/;
    if (!expr.test(text)) return resolve({ error: true, text, errorText: HelpTexts.formatoMail });

    if (creandoUsuario) {
      usuarioExiste(text)
        .then((result) => {
          if (result) resolve({ error: true, text, errorText: HelpTexts.usuarioExiste });
          else resolve({ error: false, text, errorText: '' });
        })
        .catch(() => resolve({ error: true, text, errorText: HelpTexts.impValiUsuario }));
    } else {
      resolve({ error: false, text, errorText: '' });
    }
  });
};

export const validaPassword = (text) =>
  new Promise((resolve) => {
    if (!text) return resolve({ error: true, text, errorText: HelpTexts.vacioGeneral });
    if (text.length > 35)
      return resolve({ error: true, text, errorText: HelpTexts.textoLimiteGeneral + '35' });
    resolve({ error: false, text, errorText: '' });
  });

export const validaConfirPassword = (confirPass, pass) =>
  new Promise((resolve) => {
    if (!confirPass) return resolve({ error: true, text: confirPass, errorText: HelpTexts.vacioGeneral });
    if (confirPass !== pass) return resolve({ error: true, text: confirPass, errorText: HelpTexts.NoConfirPass });
    resolve({ error: false, text: confirPass, errorText: '' });
  });

export const validaName = (text) =>
  new Promise((resolve) => {
    if (!text) return resolve({ error: true, text, errorText: HelpTexts.vacioGeneral });
    const expr = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/;
    if (!expr.test(text)) return resolve({ error: true, text, errorText: HelpTexts.soloTextoGeneral });
    if (text.length > 30)
      return resolve({ error: true, text, errorText: HelpTexts.textoLimiteGeneral + '30' });
    resolve({ error: false, text, errorText: '' });
  });

export const validaCelular = (text) =>
  new Promise((resolve) => {
    if (!text) return resolve({ error: true, text, errorText: HelpTexts.vacioGeneral });
    const expr = /^[0-9]+$/;
    if (!expr.test(text)) return resolve({ error: true, text, errorText: HelpTexts.soloNumeroGeneral });
    if (text.length > 10)
      return resolve({ error: true, text, errorText: HelpTexts.textoLimiteGeneral + '10' });
    resolve({ error: false, text, errorText: '' });
  });

export const validaDocumento = (text) =>
  new Promise((resolve) => {
    if (!text) return resolve({ error: true, text, errorText: HelpTexts.vacioGeneral });
    const expr = /^[0-9]+$/;
    if (!expr.test(text)) return resolve({ error: true, text, errorText: HelpTexts.soloNumeroGeneral });
    if (text.length > 11)
      return resolve({ error: true, text, errorText: HelpTexts.textoLimiteGeneral + '11' });
    resolve({ error: false, text, errorText: '' });
  });

export const validaTipoDocumento = (value) =>
  new Promise((resolve) => {
    if (!value) return resolve({ error: true, text: value, errorText: HelpTexts.sinDatoCB });
    resolve({ error: false, text: value, errorText: '' });
  });

export const validaGenero = (value) =>
  new Promise((resolve) => {
    if (!value) return resolve({ error: true, text: value, errorText: HelpTexts.sinDatoCB });
    resolve({ error: false, text: value, errorText: '' });
  });

export const validaImgUrl = (text) =>
  new Promise((resolve) => resolve({ error: false, text, errorText: '' }));

