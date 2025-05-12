import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestRegressor
import joblib

# Veri setini oku
df = pd.read_csv('car-price-dataset.csv')

# Kolon adlarını boşluklardan temizle (gerek kalmadı ama dursun)
df.columns = df.columns.str.strip()

# Gerekli kolonları al
df = df[['Marka', 'Model', 'Yıl', 'YakıtTipi', 'VitesTipi', 'Kilometre', 'Fiyat']]

# Label Encoders
le_marka = LabelEncoder()
le_model = LabelEncoder()
le_yakit = LabelEncoder()
le_vites = LabelEncoder()

df['Marka'] = le_marka.fit_transform(df['Marka'])
df['Model'] = le_model.fit_transform(df['Model'])
df['YakıtTipi'] = le_yakit.fit_transform(df['YakıtTipi'])
df['VitesTipi'] = le_vites.fit_transform(df['VitesTipi'])

# Özellikler (X) ve hedef değişken (y)
X = df[['Marka', 'Model', 'Yıl', 'YakıtTipi', 'VitesTipi', 'Kilometre']]
y = df['Fiyat']

# Veriyi eğitim ve test seti olarak ayır
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Model oluştur ve eğit
model = RandomForestRegressor()
model.fit(X_train, y_train)

# Modeli ve encoder'ları kaydet
joblib.dump(model, 'car_price_model.pkl')
joblib.dump(le_marka, 'le_marka.pkl')
joblib.dump(le_model, 'le_model.pkl')
joblib.dump(le_yakit, 'le_yakit.pkl')
joblib.dump(le_vites, 'le_vites.pkl')

print("✅ Model ve LabelEncoder'lar başarıyla kaydedildi.")

