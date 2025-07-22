import pymysql
import pandas as pd
import random
import os
from dotenv import load_dotenv

load_dotenv()

# Connexion MySQL
connection = pymysql.connect(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_NAME")
)

# Chargement du fichier Excel
file_path = "database/python/liste.xlsx"
df = pd.read_excel(file_path, engine="openpyxl")

# Transformation des données
df["status"] = df["DURUMU"].map(lambda x: "Active" if x == "U" else "Frozen")
df["phone"] = df.apply(
    lambda row: f"+33{str(row['TEL N° FR']).replace(' ', '')[1:]}" if pd.notna(row["TEL N° FR"]) 
    else f"+90{str(row['TEL N° TR']).replace(' ', '')[1:]}" if pd.notna(row["TEL N° TR"]) else None, 
    axis=1
)
df["barcode"] = df.apply(lambda _: f"{random.randint(100000000, 999999999)}", axis=1)

# Colonnes à insérer
df = df.rename(columns={"SOYADI": "lastName", "ADI": "firstName"})
df = df[["firstName", "lastName", "phone", "status", "barcode"]]
df = df.where(pd.notna(df), None)

default_role_id = 5

with connection.cursor() as cursor:
    for _, row in df.iterrows():
        sql = """
        INSERT INTO Member (
            firstName, lastName, phone, status, barcode, 
            birthDate, email, password, salt, 
            roleId, specialStatus, addressFR, addressTR, 
            funeralFund, profilePictureUrl
        ) VALUES (
            %s, %s, %s, %s, %s,
            NULL, NULL, NULL, NULL,
            %s, NULL, NULL, NULL,
            FALSE, NULL
        )
        """
        try:
            cursor.execute(sql, (
                row["firstName"], row["lastName"], row["phone"],
                row["status"], row["barcode"], default_role_id
            ))
        except Exception as e:
            print(f"⚠️ Erreur pour {row['firstName']} {row['lastName']} : {e}")

    connection.commit()

connection.close()
print("✅ Insertion terminée !")