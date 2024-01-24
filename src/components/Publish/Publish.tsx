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
  const [message, setMessage] = useState('');

  const handlePublish = async () => {
    try {
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
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>Mensagem</Text>
        <TextInput
          value={message}
          onChangeText={(text) => setMessage(text)}
          style={styles.input}
        />
      </View>
      <Button mode="contained" style={styles.button} onPress={handlePublish}>
        Publicar no tópico
      </Button>
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

export default Publish;
