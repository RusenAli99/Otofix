import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const dummyParts = [
  { id: '1', name: 'NGK Buji', price: '120 TL' },
  { id: '2', name: 'Bosch Buji', price: '150 TL' },
  { id: '3', name: 'Fren Balatası - Delphi', price: '320 TL' },
  { id: '4', name: '12V Akü - Mutlu', price: '950 TL' },
  { id: '5', name: 'Yağ Filtresi - Mann', price: '80 TL' },
  { id: '6', name: 'Hava Filtresi - Bosch', price: '90 TL' },
  { id: '7', name: 'Polen Filtresi - Filtron', price: '60 TL' },
  { id: '8', name: 'Debriyaj Seti - Valeo', price: '1250 TL' },
  { id: '9', name: 'Far Ampulü - Osram H7', price: '130 TL' },
  { id: '10', name: 'Triger Seti - Contitech', price: '1450 TL' },
  { id: '11', name: 'Radyatör - Behr', price: '1100 TL' },
  { id: '12', name: 'Termostat - Mahle', price: '220 TL' },
];

export default function PartListScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📦 Yedek Parça Fiyat Listesi</Text>
      <FlatList
        data={dummyParts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>🔩 {item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eef1f5', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  name: { fontSize: 16, fontWeight: 'bold' },
  price: { fontSize: 14, color: '#333', marginTop: 6 },
});
