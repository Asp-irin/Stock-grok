import React from 'react';
import { Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { useStyles } from '../hooks/useStyle';

type AlertModalProps = {
  visible: boolean;
  message: string;
  onClose?: () => void;
};

export default function AlertModal({ visible, message, onClose }: AlertModalProps) {
  const { styles, theme } = useStyles();

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      backdropOpacity={0.3}
      style={{ justifyContent: 'flex-end', margin: 0 }}
    >
      <View style={styles.alertContainer}>
        <Text style={styles.alertText}>{message}</Text>
      </View>
    </Modal>
  );
}
