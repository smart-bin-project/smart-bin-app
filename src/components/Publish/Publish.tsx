// Publish.js
import React, { useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';
import MQTTService from '../../services/mqttService';

interface PublishProps {
  setSubscribedTopic: React.Dispatch<React.SetStateAction<string>>;
  setReceivedMessages: React.Dispatch<React.SetStateAction<string[]>>;
}

const Publish: React.FC<PublishProps> = ({ setSubscribedTopic, setReceivedMessages }) => {
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('0');

  const handlePublish = async (message: string) => {
    try {
      console.log('executou')
      const mqttService = new MQTTService();
      await mqttService.connect();

      // Publish the message
      await mqttService.publish(topic, message);

      // Disconnect after publishing
      await mqttService.disconnect();
    } catch (error) {
      console.error('Failed to publish message:', error);
    }
  };

  const handleOpenLixeira = async () => {
    handlePublish('open');
  };
  
  const handleCloseLixeira = async () => {
    // Set message state to 1 (fechar lixeira)
    handlePublish('close');
  };
  

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Publicar</Text>
      <View>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>Tópico</Text>
        <TextInput
          value={topic}
          onChangeText={(text) => setTopic(text)}
          style={styles.input}
        />
      </View>
      <View>
          <Button mode="contained" style={styles.button} onPress={handleOpenLixeira}>
            Abrir lixeira
          </Button>
          <Button mode="contained" style={styles.button} onPress={handleCloseLixeira}>
            Fechar lixeira
          </Button>
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default Publish;
