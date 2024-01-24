// Subscribe.js
import React, { useState } from 'react';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';

interface SubscribeProps {
  setSubscribedTopic: React.Dispatch<React.SetStateAction<string>>;
}

const Subscribe: React.FC<SubscribeProps> = ({ setSubscribedTopic }) => {
  const [topic, setTopic] = useState('');
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const handleSubscribe = () => {
    // Set the topic and trigger subscription
    setSubscribedTopic(topic);

    // Show confirmation message
    setConfirmationVisible(true);

    // Add logic to trigger MQTT subscription here
  };

  const onDismissConfirmation = () => {
    // Hide confirmation message
    setConfirmationVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Inscrever</Text>
      <View>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>Tópico</Text>
        <TextInput
          value={topic}
          onChangeText={(text) => setTopic(text)}
          style={styles.input}
        />
      </View>
      <Button mode="contained" style={styles.button} onPress={handleSubscribe}>
        Inscrever-se no tópico
      </Button>

     {/* Confirmation Snackbar */}
    <Snackbar
      visible={confirmationVisible}
      onDismiss={onDismissConfirmation}
      action={{
        label: 'OK',
        onPress: onDismissConfirmation,
      }}
    >
      {confirmationVisible && `Assinatura concluída para o tópico: ${topic}`}
    </Snackbar>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    width: 200,
    marginLeft: 100,
    alignItems: 'center',
  },
});

export default Subscribe;
