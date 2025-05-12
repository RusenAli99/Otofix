import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Image
} from 'react-native';

export default function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hoş geldiniz! Aracınızda yaşadığınız sorunu detaylıca yazın.' },
  ]);
  const [inputText, setInputText] = useState('');
  const [suggestedParts, setSuggestedParts] = useState([]);

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = { id: Date.now(), sender: 'user', text: inputText };
    const botMessage = {
      id: Date.now() + 1,
      sender: 'bot',
      text: 'Tahmini arıza: Buji arızası. Aşağıda önerilen parçaları inceleyebilirsiniz.',
    };

    setMessages([...messages, userMessage, botMessage]);
    setSuggestedParts([
      { id: '1', name: 'NGK Buji', price: '120 TL' },
      { id: '2', name: 'Bosch Buji', price: '150 TL' },
    ]);

    setInputText('');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.inner}>
            {/* Başlık ve Logo */}
            <View style={styles.header}>
              <Text style={styles.headerText}>🔧 Yedek Parça Asistanı</Text>
              <Image
                source={require('../assets/otofix_logo.jpg')}
                style={styles.logo}
              />
            </View>

            {/* Mesajlar */}
            <View style={styles.chatBox}>
              {messages.map((item) => (
                <View
                  key={item.id}
                  style={[
                    styles.messageBubble,
                    item.sender === 'user' ? styles.userBubble : styles.botBubble,
                  ]}
                >
                  <Text style={styles.messageText}>{item.text}</Text>
                </View>
              ))}
            </View>

            {/* Mesaj Gönderme Alanı */}
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

            {/* Önerilen Parçalar */}
            {suggestedParts.length > 0 && (
              <>
                <Text style={styles.partsTitle}>💡 Önerilen Parçalar</Text>
                {suggestedParts.map((item) => (
                  <View key={item.id} style={styles.partCard}>
                    <View>
                      <Text style={styles.partName}>🔩 {item.name}</Text>
                      <Text style={styles.partPrice}>{item.price}</Text>
                    </View>
                    <TouchableOpacity style={styles.cartButton}>
                      <Text style={{ color: '#fff', fontWeight: 'bold' }}>Sepete Ekle</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </>
            )}

            {/* Butonlar */}
            <TouchableOpacity
              style={styles.priceListButton}
              onPress={() => navigation.navigate('FiyatListesi')}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>📋 Yedek Parça Fiyat Listesi</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.carValueButton}
              onPress={() => navigation.navigate('Arabam')}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>🚗 Arabam Ne Kadar?</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f2f5f9',
  },
  container: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  inner: {
    width: '100%',
    maxWidth: 600,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  chatBox: {
    marginBottom: 12,
  },
  messageBubble: {
    marginVertical: 6,
    padding: 12,
    borderRadius: 16,
    maxWidth: '80%',
  },
  userBubble: {
    backgroundColor: '#d1e7ff',
    alignSelf: 'flex-end',
  },
  botBubble: {
    backgroundColor: '#e9ecef',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 14,
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
    marginTop: 8,
  },
  partCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  partName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  partPrice: {
    marginTop: 4,
    fontSize: 14,
    color: '#555',
  },
  cartButton: {
    backgroundColor: '#28a745',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  priceListButton: {
    marginTop: 10,
    backgroundColor: '#6c757d',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  carValueButton: {
    marginTop: 10,
    backgroundColor: '#17a2b8',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
});
