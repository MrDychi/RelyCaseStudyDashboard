import csv
import os

# build absolute path safely
BASE_DIR = os.path.dirname(__file__)
CSV_PATH = os.path.join(BASE_DIR, 'space_missions.csv')

# load once at import time
with open(CSV_PATH, mode='r') as file:
    csv_reader = csv.reader(file, delimiter=",")
    DATA = list(csv_reader)

# FUNCTIONS

def getUniqueValues(column_title):
    #find the index of the column title
    column_index = DATA[0].index(column_title)
    values = [row[column_index] for row in DATA[1:]]
    return {
        "num": len(set(values)),
        "values": set(values)
    }

def getRows():
    return len(DATA)