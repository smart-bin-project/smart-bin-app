// Publish.js
import React from 'react';
import { Button } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';
import MQTTService from '../../services/mqttService';

interface PublishProps {
  setReceivedMessages: React.Dispatch<React.SetStateAction<string[]>>;
}

const Publish: React.FC<PublishProps> = ({ setReceivedMessages }) => {
  const topic = "node-red/test"; // Set your specific topic here

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
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>Tópico: {topic}</Text>
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
  button: {
    marginTop: 16,
    width: 200,
    marginLeft: 100,
    alignItems: 'center',
  },
});

export default Publish;
