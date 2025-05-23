import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Platform } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import structuredData from '../data/carData.json';

export default function ArabamScreen() {
  const [formData, setFormData] = useState({
    Marka: '',
    Seri: '',
    Model: '',
    Yıl: '',
    YakıtTipi: '',
    VitesTipi: '',
    Kilometre: '',
  });

  const [seriesList, setSeriesList] = useState([]);
  const [modelList, setModelList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [fuelList, setFuelList] = useState([]);
  const [gearList, setGearList] = useState([]);
  const [estimatedPrice, setEstimatedPrice] = useState(null);

  useEffect(() => {
    if (formData.Marka) {
      const seriesSet = new Set(
        Object.keys(structuredData[formData.Marka] || {}).map(model => model.split(' ')[0])
      );
      setSeriesList(Array.from(seriesSet));
      setFormData(prev => ({ ...prev, Seri: '', Model: '', Yıl: '', YakıtTipi: '', VitesTipi: '' }));
    }
  }, [formData.Marka]);

  useEffect(() => {
    if (formData.Marka && formData.Seri) {
      const models = Object.keys(structuredData[formData.Marka] || {}).filter(model => model.startsWith(formData.Seri));
      setModelList(models);
      setFormData(prev => ({ ...prev, Model: '', Yıl: '', YakıtTipi: '', VitesTipi: '' }));
    }
  }, [formData.Seri]);

  useEffect(() => {
    if (formData.Marka && formData.Model) {
      const options = structuredData[formData.Marka][formData.Model] || [];
      const years = Array.from(new Set(options.map(opt => String(opt.Yıl)))).sort();
      setYearList(years);
      setFormData(prev => ({ ...prev, Yıl: '', YakıtTipi: '', VitesTipi: '' }));
    }
  }, [formData.Model]);

  useEffect(() => {
    if (formData.Marka && formData.Model && formData.Yıl) {
      const options = structuredData[formData.Marka][formData.Model] || [];
      const filtered = options.filter(opt => String(opt.Yıl) === String(formData.Yıl));
      const fuels = Array.from(new Set(filtered.map(opt => opt.YakıtTipi)));
      const gears = Array.from(new Set(filtered.map(opt => opt.VitesTipi)));
      setFuelList(fuels);
      setGearList(gears);
    }
  }, [formData.Yıl]);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handlePredict = async () => {
    try {
      const payload = {
        Marka: formData.Marka,
        Model: formData.Model,
        Yıl: formData.Yıl,
        YakıtTipi: formData.YakıtTipi,
        VitesTipi: formData.VitesTipi,
        Kilometre: parseInt(formData.Kilometre) || 0
      };

      const res = await axios.post('http://172.20.10.2:5000/predict', payload);
      const price = res.data.estimated_price || res.data.predicted_price;
      setEstimatedPrice(price);
    } catch (error) {
      console.error('Tahmin hatası:', error.response?.data || error.message);
      Alert.alert('Hata', error.response?.data?.error || 'Fiyat tahmini yapılamadı.');
    }
  };

  const renderPicker = (label, field, options) => (
    <View style={styles.pickerGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={formData[field]}
          onValueChange={(value) => handleChange(field, value)}
          style={styles.picker}
          dropdownIconColor="#555"
        >
          <Picker.Item label="Seçiniz" value="" />
          {options.map((item) => (
            <Picker.Item key={item} label={item.toString()} value={item} />
          ))}
        </Picker>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        <Text style={styles.header}>Arabam Ne Kadar Eder?</Text>

        {renderPicker('Marka', 'Marka', Object.keys(structuredData))}
        {formData.Marka && renderPicker('Seri', 'Seri', seriesList)}
        {formData.Seri && renderPicker('Model', 'Model', modelList)}
        {formData.Model && renderPicker('Yıl', 'Yıl', yearList)}
        {formData.Yıl && renderPicker('Yakıt Tipi', 'YakıtTipi', fuelList)}
        {formData.YakıtTipi && renderPicker('Vites Tipi', 'VitesTipi', gearList)}

        <TextInput
          style={styles.input}
          placeholder="Kilometre"
          keyboardType="numeric"
          value={formData.Kilometre.toString()}
          onChangeText={(text) => handleChange('Kilometre', text)}
        />

        <TouchableOpacity style={styles.button} onPress={handlePredict}>
          <Text style={styles.buttonText}>Fiyatı Tahmin Et</Text>
        </TouchableOpacity>

        {estimatedPrice !== null && (
          <View style={styles.resultBox}>
            <Text style={styles.resultTitle}>Tahmin Sonucu</Text>
            <Text style={styles.resultText}>
              {Number(estimatedPrice).toLocaleString()} TL
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#eef1f5',
  },
  container: {
    width: '100%',
    maxWidth: 600,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#007bff',
  },
  pickerGroup: {
    marginBottom: 12,
  },
  pickerWrapper: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    overflow: 'hidden',
    minHeight: Platform.OS === 'web' ? 45 : undefined,
    justifyContent: 'center',
  },
  picker: {
    height: Platform.OS === 'web' ? 45 : undefined,
    width: '100%',
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#28a745',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultBox: {
    backgroundColor: '#fff',
    marginTop: 30,
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#28a745',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  resultTitle: {
    fontSize: 18,
    color: '#28a745',
    marginBottom: 8,
    fontWeight: '600',
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

