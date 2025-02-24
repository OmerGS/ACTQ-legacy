import pymysql
import pandas as pd
import random
import os
from dotenv import load_dotenv

load_dotenv()

# Connexion à MySQL avec les variables d'environnement
connection = pymysql.connect(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_NAME")
)

# Charger le fichier Excel
file_path = "database/python/liste.xlsx"  
df = pd.read_excel(file_path, engine="openpyxl") 

# Recuperer les données
df["Statut"] = df["DURUMU"].map(lambda x: "Actif" if x == "U" else "Suspendu")
df["Telephone"] = df.apply(
    lambda row: f"+33{str(row['TEL N° FR']).replace(' ', '')[1:]}" if pd.notna(row["TEL N° FR"]) 
    else f"+90{str(row['TEL N° TR']).replace(' ', '')[1:]}" if pd.notna(row["TEL N° TR"]) else None, 
    axis=1
)
df["CodeBarre"] = df.apply(lambda _: f"{random.randint(100000000, 999999999)}", axis=1)
df = df[["SOYADI", "ADI", "Telephone", "Statut", "CodeBarre"]]
df = df.where(pd.notna(df), None)

print(df.head())

# Insertion des données
with connection.cursor() as cursor:
    for _, row in df.iterrows():
        sql = """
        INSERT INTO Membre (nom, prenom, telephone, statut, barcode)
        VALUES (%s, %s, %s, %s, %s)
        """
        try:
            cursor.execute(sql, (row["SOYADI"], row["ADI"], row["Telephone"], row["Statut"], row["CodeBarre"]))
        except Exception as e:
            print(f"⚠️ Erreur lors de l'insertion de {row}: {e}")

    connection.commit()

connection.close()
print("✅ Insertion terminée !")