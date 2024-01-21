import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
const DoneAlert = ({ modalVisible, setModalVisible }) => {
    // Close button handler
    const handleCloseButton = () => {
    //   setModalVisible(false);
    };
  
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        // Do not set modalVisible to false here, as this will be called on Android hardware back press or swipe down on iOS
        onRequestClose={() => {}}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.doneIconCircle}>
              <Text style={styles.doneIconText}>✓</Text>
            </View>
            <Text style={styles.doneText}>Done</Text>
            <TouchableOpacity
              style={styles.doneButton}
              onPress={handleCloseButton}
            >
              <Text style={styles.doneButtonText}>Close</Text>
            </TouchableOpacity>
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
    backgroundColor: 'rgba(0,0,0,0.6)', // Adjusted for dark overlay
  },
  modalView: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Semi-transparent white for frosted glass effect
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  doneIconCircle: {
    backgroundColor: '#4CAF50', // Green background
    borderRadius: 30, // Adjust for a more circular shape
    padding: 15,
    marginBottom: 10
  },
  doneIconText: {
    color: 'white',
    fontSize: 24, // Adjust size as needed
    fontWeight: 'bold',
  },
  doneText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20
  },
  doneButton: {
    marginTop: 10,
    backgroundColor: 'transparent'
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default DoneAlert;
