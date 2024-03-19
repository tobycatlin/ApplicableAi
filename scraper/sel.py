import re

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from urllib.parse import quote


# Path to your ChromeDriver executable
chrome_driver_path = "/usr/bin/chromedriver"
# Configure Chrome options for headless mode
chrome_options = Options()
# chrome_options.add_argument("--headless")  # Enable headless mode

# URL of the webpage to scrape
# url = "https://uk.indeed.com/jobs?q=developer&l=Norwich%2C+Norfolk&vjk=b1083ef10100aa80"

# Create a WebDriver instance
service = Service(chrome_driver_path)
driver = webdriver.Chrome(service=service, options=chrome_options)

jobTitles = [
    "Automation Engineer",
    "Back End Developer",
    "Content Marketeer",
    "CRM Developer",
    "Data Analyst",
    "Data Entry Clerk",
    "Digital Marketing Assistant",
    "Digital Marketing Executive",
    "Front End Developer",
    "Junior Data Scientist",
    "Product Manager",
    "Project Manager",
    "React Developer",
    "Software Developer",
    "System Administrator",
    "Test Engineer",
    "Technical Account Manager",
    "Technical Administrator",
    "Technical Sales Engineer",
    "Technical Support Engineer",
    "UI Designer",
    "User Experience Designer",
    "QA Test Engineer"
]

locations = [
    "Cambridge",
    "Norwich",
    "Ipswich",
    "Peterborough",
    "Liverpool",
    "Derby",
    "Nottingham",
    "Hull"
]

for location in locations:
    for jobTitle in jobTitles:
        encoded_jobTitle = quote(jobTitle)
        url = "https://uk.indeed.com/jobs?q="+encoded_jobTitle+"&l="+location+"&vjk=b1083ef10100aa80"

        # Open the webpage
        driver.get(url)

        # Find all the article titles
        #jobTitle-9e440e0322c7b005
        jobs = driver.find_elements(By.CSS_SELECTOR, "div.cardOutline")

        pattern = r'job_\w+'
        # Extract and print the titles
        job_ids = []
        for job in jobs:
            classText = job.get_dom_attribute("class")
            job_matches = re.findall(pattern, classText)
            for job_match in job_matches:
                # print(job_match)
                job_ids.append(job_match.replace("job_",""))
                # set.add({job_match})

        # print(job_ids)

        for job_id in job_ids:
            print("fetching", job_id)
            job_url = "https://uk.indeed.com/viewjob?jk="+ job_id
            driver.get(job_url)

            with open("jobs/"+job_id+".html", "w", encoding="utf-8") as file:
                file.write(driver.page_source)

# Close the WebDriver
driver.quit()


# Job Titles

# Automation Engineer
# Back End Developer
# Content Marketeer
# CRM Developer
# Data Analyst
# Data Entry Clerk
# Digital Marketing Assistant
# Digital Marketing Executive
# Front End Developer
# Junior Data Scientist
# Product Manager
# Project Manager
# React Developer
# Software Developer
# System Administrator
# Test Engineer
# Technical Account Manager
# Technical Administrator
# Technical Sales Engineer
# Technical Support Engineer
# UI Designer
# User Experience Designer
# QA Test Engineer

# Locations

# Cambridge
# Norwich
# Ipswich
# Peterborough
# Liverpool
# Derby
# Nottingham
# Hull