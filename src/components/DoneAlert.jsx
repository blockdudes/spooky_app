import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DoneAlert = () => {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.doneIconCircle}>
            <Text style={styles.doneIconText}>✓</Text>
          </View>
          <Text style={styles.doneText}>Done</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)', // Semi-transparent background
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  doneIconCircle: {
    backgroundColor: '#4CAF50', // Green background
    borderRadius: 50,
    padding: 10,
    marginBottom: 10,
  },
  doneIconText: {
    color: 'white',
    fontSize: 30, // Adjust size as needed
  },
  doneText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333', // Adjust text color as needed
    marginBottom: 15,
  },
});

export default DoneAlert;
