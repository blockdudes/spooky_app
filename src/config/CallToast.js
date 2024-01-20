import Toast from 'react-native-toast-message';

export const successToast=(msg)=>{
    Toast.show({
        type: 'success',
        text1: msg,
        text1Style: { color: 'white', fontSize: 15, },
        backgroundColor: '#9FA1A3',
      })
}

export const errorToast=(msg)=>{
    Toast.show({
        type: 'error',
        text1: msg,
        text1Style: { color: 'white', fontSize: 15, },
        backgroundColor: '#9FA1A3',
      })
}