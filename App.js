import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';

export default function App() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hoş geldiniz! Aracınızda yaşadığınız sorunu detaylıca yazın.' }
  ]);
  const [inputText, setInputText] = useState('');
  const [suggestedParts, setSuggestedParts] = useState([]);

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = { id: Date.now(), sender: 'user', text: inputText };
    const botMessage = {
      id: Date.now() + 1,
      sender: 'bot',
      text: 'Tahmini arıza: Buji arızası. Aşağıda önerilen parçaları inceleyebilirsiniz.'
    };

    setMessages([...messages, userMessage, botMessage]);
    setSuggestedParts([
      { id: '1', name: 'NGK Buji', price: '120 TL' },
      { id: '2', name: 'Bosch Buji', price: '150 TL' }
    ]);

    setInputText('');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <Text style={styles.headerText}>🔧 Yedek Parça Asistanı</Text>
        </View>

        <FlatList
          style={styles.chatBox}
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={[styles.messageBubble, item.sender === 'user' ? styles.userBubble : styles.botBubble]}>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
        />

        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            placeholder="Arıza yazın..."
            placeholderTextColor="#999"
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>➤</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={suggestedParts}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() =>
            suggestedParts.length > 0 && <Text style={styles.partsTitle}>💡 Önerilen Parçalar</Text>
          }
          renderItem={({ item }) => (
            <View style={styles.partCard}>
              <View>
                <Text style={styles.partName}>🔩 {item.name}</Text>
                <Text style={styles.partPrice}>{item.price}</Text>
              </View>
              <TouchableOpacity style={styles.cartButton}>
                <Text style={{ color: '#fff' }}>Sepete Ekle</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#eef1f5',
  },
  container: {
    flex: 1,
    padding: 12,
  },
  header: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  chatBox: {
    flexGrow: 0,
    maxHeight: '50%',
    marginBottom: 10,
  },
  messageBubble: {
    marginVertical: 5,
    padding: 12,
    borderRadius: 12,
    maxWidth: '80%',
  },
  userBubble: {
    backgroundColor: '#d0ebff',
    alignSelf: 'flex-end',
  },
  botBubble: {
    backgroundColor: '#f1f1f1',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 100,
  },
  partsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  partCard: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  partName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  partPrice: {
    marginTop: 4,
    fontSize: 14,
    color: '#333',
  },
  cartButton: {
    backgroundColor: '#28a745',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
});
