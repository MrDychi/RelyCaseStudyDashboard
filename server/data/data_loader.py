import csv
import os
import pandas as pd

# build absolute path safely
BASE_DIR = os.path.dirname(__file__)
CSV_PATH = os.path.join(BASE_DIR, 'space_missions.csv')

# load once at import time
with open(CSV_PATH, mode='r') as file:
    DATA = pd.read_csv(CSV_PATH, sep=",")

# FUNCTIONS
# Required Function 1: 
def getMissionCountByCompany(companyName: str) -> int:
    """
    Description: Returns the total number of missions for a given company.
    Input:
        - companyName (string): Name of the company (e.g., "SpaceX", "NASA", "RVSN USSR")
    Output:
        - Integer representing the total number of missions
    """
    return len(DATA[DATA["Company"] == companyName])

# Required Function 2:
def getSuccessRate(companyName: str) -> float:
    """
    Description: Calculates the success rate for a given company as a percentage.
    Input:
        - companyName (string): Name of the company
    Output:
        - Float representing success rate as a percentage (0-100), rounded to 2 decimal places
        - Only "Success" missions count assuccessful
        - Return 0.0 if company has no missions
    """
    company_missions = DATA[DATA["Company"] == companyName]
    if len(company_missions) == 0:
        return 0.0
    success_count = len(company_missions[company_missions["MissionStatus"] == "Success"])
    success_rate = (success_count / len(company_missions)) * 100
    return round(success_rate, 2)

# Required Function 3: 
def getMissionsByDateRange(startDate: str, endDate: str) -> list:
    """
    Description: Returns a list of all mission names launched between startDate and
        endDate (inclusive).
    Input:
        - startDate (string): Start date in "YYYY-MM-DD" format
        - endDate (string): End date in "YYYY-MM-DD" format
    Output:
    - List of strings containing mission names, sorted chronologically
    """
    after_start = DATA[DATA["Date"] >= startDate]
    in_range = after_start[after_start["Date"] <= endDate]
    return in_range.sort_values("Date")["Mission"].tolist()

# Required Function 4:
def getTopCompaniesByMissionCount(n: int) -> list:
    """
    Description: Returns the top N companies ranked by total number of missions.
    Input:
        - n (integer): Number of top companies to return
    Output:
        - List of tuples: [(companyName, missionCount), ...]
        - Sorted by mission count in descending order
        - If companies have the same count, sort alphabetically by company name
    """
    all_companies = DATA["Company"].unique().tolist()
    counts = []
    for company in all_companies:
        counts.append((company, getMissionCountByCompany(company)))
    sorted_companies = sorted(counts, key=lambda x: (-x[1], x[0]))
    return sorted_companies[:n]

# Required Function 5:
def getMissionStatusCount() -> dict:
    """
    Description: Returns the count of missions for each mission status.
    Input: None
    Output:
        - Dictionary with status as key and count as value
        - Keys: "Success", "Failure", "Partial Failure", "Prelaunch Failure"
    """
    all_statuses = DATA["MissionStatus"].unique().tolist()
    status_counts = {}
    for status in all_statuses:
        status_counts[status] = len(DATA[DATA["MissionStatus"] == status])
    return status_counts

# Required Function 6: 
def getMissionsByYear(year: int) -> int:
    """
    Description: Returns the total number of missions launched in a specific year.
    Input:
        - year (integer): Year (e.g., 2020)
    Output:
        - Integer representing the total number of missionsin that year
    """
    return len(DATA[DATA["Date"].str.startswith(str(year))])

# Required Function 7:
def getMostUsedRocket() -> str:
    """
    Description: Returns the name of the rocket that has been used the most times.
    Input: None
    Output:
        - String containing the rocket name
        - If multiple rockets have the same count, return the first one alphabetically
    """
    all_rockets = DATA["Rocket"].unique().tolist()
    rocket_counts = []
    for rocket in all_rockets:
        rocket_counts.append((rocket, len(DATA[DATA["Rocket"] == rocket])))
    sorted_rockets = sorted(rocket_counts, key=lambda x: (-x[1], x[0]))
    return sorted_rockets[0][0]

# Required Function 8: 
def getAverageMissionsPerYear(startYear: int, endYear: int) -> float:
    """
    Description: Calculates the average number of missions per year over a given range.
    Input:
        - startYear (integer): Starting year (inclusive)
        - endYear (integer): Ending year (inclusive)
    Output:
        - Float representing average missions per year, rounded to 2 decimal places
    """
    total_missions = 0
    for year in range(startYear, endYear + 1):
        total_missions += getMissionsByYear(year)
    num_years = endYear - startYear + 1
    average = total_missions / num_years
    return round(average, 2)

def getYearRangeData():
    """
    Get minimum year and maximum year in database
    """
    sorted_data = sorted(DATA["Date"])
    minVal = sorted_data[0][:4]
    maxVal = sorted_data[-1][:4]
    print(f"returning: {minVal}, {maxVal}")
    return (minVal, maxVal)

def getAllCompanyNames():
    """
    Get all company names
    """
    return DATA["Company"].unique().tolist()

if __name__ == "__main__":
    # Testing functions here
    print("Testing Function 1: getMissionCountByCompany...")
    print(getMissionCountByCompany("NASA"))

    print("Testing Function 2: getSuccessRate...")
    print(getSuccessRate("NASA"))
    print(getSuccessRate("NonExistentCompany")) # Should return 0.0

    print("Testing Function 3: getMissionsByDateRange...")
    print(DATA["Date"].is_monotonic_increasing)
    print(getMissionsByDateRange("1957-10-01", "1957-12-31"))

    print("Testing Function 4: getTopCompaniesByMissionCount...")
    print(getTopCompaniesByMissionCount(3))

    print("Testing Function 5: getMissionStatusCount...")
    print(getMissionStatusCount())

    print("Testing Function 6: getMissionsByYear...")
    print(getMissionsByYear(2022))
    print(getMissionsByYear(1957))

    print("Testing Function 7: getMostUsedRocket...")
    print(getMostUsedRocket())

    print("Testing Function 8: getAverageMissionsPerYear...")
    print(getAverageMissionsPerYear(1957, 1957))
    print(getAverageMissionsPerYear(2022, 2022))
    print(getAverageMissionsPerYear(1957, 2022))

    print(f"# Unique Companies: {len(DATA["Company"].unique().tolist())}")
    print(f"# Unique Locations: {len(DATA["Location"].unique().tolist())}")
    print(f"# Unique Rockets: {len(DATA["Rocket"].unique().tolist())}")
    print(f"# Unique Missions: {len(DATA["Mission"].unique().tolist())}")

