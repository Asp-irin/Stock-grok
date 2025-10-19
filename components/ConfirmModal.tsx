import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { useStyles } from '../hooks/useStyle';

interface ConfirmModalProps {
  isVisible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmModal({
  isVisible,
  onCancel,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmText = 'Delete',
  cancelText = 'Cancel',
}: ConfirmModalProps) {
  const { styles, theme } = useStyles();

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onCancel}
      backdropOpacity={0.4}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
    >
      <View style={styles.editWacthlistModalContainer}>
        <Text style={styles.editWacthlistModalmodalTitle}>{title}</Text>
        <Text style={styles.modalMessage}>{message}</Text>

        <View style={styles.modalButtonRow}>
          <TouchableOpacity onPress={onCancel}>
            <Text style={[styles.modalButtonText, { color: theme.secondaryText }]}>
              {cancelText}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onConfirm}>
            <Text style={[styles.modalButtonText, { color: theme.danger }]}>
              {confirmText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
