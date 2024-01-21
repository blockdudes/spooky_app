import Dialog from "react-native-dialog";
import { Image, View } from "react-native";
import LottieView from "lottie-react-native";

const lottieAnimation = require("../../assets/tick-animation.json");
export const TxSuccessDialog = ({visible, setVisible}) => {
  //   const animation = useRef(null);
  //   useEffect(() => {
  //     // You can control the ref programmatically, rather than using autoPlay
  //     animation.current?.play();
  //   }, []);
  const handleOk = () => {
    setVisible(false);
  };


  return (
    <View>
      <Dialog.Container visible={visible}>
        <Dialog.Title>
          {" "}
          <LottieView
            source={lottieAnimation}
            style={{
              width: 200,
              height: 200,
            }}
            autoPlay
            loop={false}
          />
        </Dialog.Title>
        <Dialog.Description>
          {/* <Image
                className="h-[100px] w-[100px]"
                source={require('../../assets/pngwing.com.png')}
                tintColor={'#7264ff'}
              /> */}
          Done! Please wait for it to be confirmed
        </Dialog.Description>
        <Dialog.Button label="OK" onPress={handleOk}/>
      </Dialog.Container>
    </View>
  );
};
