import { BaseToast, ErrorToast } from 'react-native-toast-message'
export const toastConfig={
    success:(props)=>(
      <BaseToast
      {...props}
      style={{backgroundColor:"black",borderLeftColor:"#7264FF"}}
      />
    ),
    error:(props)=>(
      <ErrorToast
      {...props}
      style={{backgroundColor:"black",borderLeftColor:"red"}}
      />
    )
  }

