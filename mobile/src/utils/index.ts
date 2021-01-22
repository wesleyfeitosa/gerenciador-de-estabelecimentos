import { Platform, ToastAndroid, Alert } from 'react-native';

export const formatPhone = (phone: string) => {
  phone = phone.replace(/\D/g, '');
  phone.length > 2 && (phone = phone.replace(/^(\d{2})/, '($1) '));
  phone.length > 6 && (phone = phone.replace(/(\s\d)/, '$1 '));
  phone.length > 11 && (phone = phone.replace(/(\s\d{4})/, '$1-'));

  phone = phone.replace(/([-]\d{4})/, '$1');
  return phone;
};

export const formatDate = (date: any) => {
  if (date) {
    const formatedDate: any = new Date(date);

    const dateFormat = 'DD/MM/YYYY';
    let dateFormatedText: string = dateFormat.replace(
      'DD',
      formatedDate.getDate() < 10
        ? `0${formatedDate.getDate()}`
        : formatedDate.getDate(),
    );

    dateFormatedText = dateFormatedText.replace(
      'MM',
      formatedDate.getMonth() + 1 < 10
        ? `0${formatedDate.getMonth() + 1}`
        : formatedDate.getMonth() + 1,
    );

    dateFormatedText = dateFormatedText.replace(
      'YYYY',
      formatedDate.getFullYear(),
    );

    return dateFormatedText;
  }

  return '';
};

export const currencyFormat = (value: number) => {
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
    .format(value / 100)
    .replace(/^(\D+)/, '$1 ');
};

export const messageAlert = (message: string, subMessage?: string) => {
  return Alert.alert(message, subMessage);
};

export const toastAlert = (message: string, subMessage?: string) => {
  if (Platform.OS === 'android') {
    return ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  }

  return Alert.alert(message, subMessage);
};

export const rp = (value: number, maxValue: number) => {
  return value > maxValue ? maxValue : value;
};
