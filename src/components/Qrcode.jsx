import React from 'react';
import { StyleSheet } from 'react-native';
import QRCodeStyled from 'react-native-qrcode-styled';

export default function Qrcode({data}) {
  return (
    <QRCodeStyled
      data={data}
      style={styles.svg}
      pieceSize={8}
      pieceBorderRadius={4}
      color={"white"}
    //   gradient={{
    //     type: 'radial',
    //     options: {
    //       center: [0.5, 0.5],
    //       radius: [1, 1],
    //       colors: ['#ff7bc6', '#0f0080'],
    //       locations: [0, 1],
    //     },
    //   }}
      outerEyesOptions={{
        topLeft: {
          borderRadius: [20, 20, 0, 20],
        },
        topRight: {
          borderRadius: [20, 20, 20],
        },
        bottomLeft: {
          borderRadius: [20, 0, 20, 20],
        },
      }}
      innerEyesOptions={{
        borderRadius: 12,
        scale: 0.85,
      }}
    />
  );
}

const styles = StyleSheet.create({
  svg: {
    backgroundColor: '#171A25',
    overflow: 'hidden',
  },
});