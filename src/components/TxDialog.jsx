import Dialog from "react-native-dialog";
import { Image, View } from "react-native";
import LottieView from "lottie-react-native";

const loadingAnimation = require("../../assets/loading-animation.json");
const successAnimation = require("../../assets/tick-animation.json");
const failedAnimation = require("../../assets/failed-animation.json");

// 0 = not visible, 1 = loading, 2 = success, 3 = failed
export const TxDialog = ({ status, setStatus }) => {
  //   const animation = useRef(null);
  //   useEffect(() => {
  //     // You can control the ref programmatically, rather than using autoPlay
  //     animation.current?.play();
  //   }, []);
  const handleOk = () => {
    setStatus(0);
  };
  const LottieComponent = () => {
    let animation = loadingAnimation
    
    if(status == 2){
      animation = successAnimation
    }else if(status == 3){
      animation = failedAnimation
    }
    return (
      <View className="center  h-[250] align-center">
        <LottieView
        source={animation}
        style={{
          width: 250,
          flex: 1, justifyContent: 'center', alignItems: 'center'
        }}
        autoPlay
        loop={status == 1}
      />
      </View>
    );
  };

  return (
    <View>
      <Dialog.Container visible={status != 0}>
        <Dialog.Title>
          {/* {
            status == 1 ? "Loading" : status == 2 ? "Complete" : status == 3 ? 
          }
          <LottieView
            source={lottieAnimation}
            style={{
              width: 200,
              height: 200,
            }}
            autoPlayr
            loop={false}
          /> */}
          {/* {status == 1 ? (
            <LottieComponent animation={loadingAnimation} />
          ) : status == 2 ? (
            <LottieComponent animation={successAnimation} />
          ) : status == 3 ? (
            <LottieComponent animation={failedAnimation} />
          ) : (
            <></>
          )} */}
          <LottieComponent/>
        </Dialog.Title>
        <Dialog.Description>
          {/* <Image
                className="h-[100px] w-[100px]"
                source={require('../../assets/pngwing.com.png')}
                tintColor={'#7264ff'}
              /> */}

{/* {status == 1 ? (
            "Please wait!"
          ) : status == 2 ? (
            "Complete"
          ) : status == 3 ? (
            "Failed"
          ) : (
            <></>
          )} */}
          {/* Done! Please wait for it to be confirmed */}
        </Dialog.Description>
       {(status == 2 || status == 3) &&  <Dialog.Button label="OK" onPress={handleOk} />}
      </Dialog.Container>
    </View>
  );
};
