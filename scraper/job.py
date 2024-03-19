import os
from bs4 import BeautifulSoup

def extract_content_from_html(filename, html_file):
    with open(html_file, 'r', encoding='utf-8') as file:
        html_content = file.read()

    # Parse HTML content using BeautifulSoup
    soup = BeautifulSoup(html_content, 'html.parser')
    for script in soup(["script", "style"]):
        script.extract()    # rip it out

    # get text
    text = soup.get_text()

    # break into lines and remove leading and trailing space on each
    lines = (line.strip() for line in text.splitlines())
    # break multi-headlines into a line each
    chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
    # drop blank lines
    text = ' \n'.join(chunk for chunk in chunks if chunk)
    job_id = filename.split(".")[0]
    print(job_id)
    with open("jobs/"+job_id+".txt", "w", encoding="utf-8") as file:
        file.write(text)
    
    # salary
    # id="salaryInfoAndJobType"

    jobTitles = soup.find_all('h1.jobsearch-JobInfoHeader-title')
    for title in jobTitles:
        print("Title:", title.text)

    jobDetails = soup.find(id='jobDetailsSection')
    if jobDetails:
        print("Deets:", jobDetails.text)

    # jobDescription = soup.find(id='jobDescriptionText')
    # print("Desc:", jobDescription.text)

# data-testid="Permanent-tile"
    # jobType = soup.find(attrs={"data-testid": "Permanent-tile"})
    # if jobType:
    #     print("Desc:", jobType.text)


def extract_content_from_folder(folder_path):
    # Loop over files in the folder
    for filename in os.listdir(folder_path):
        if filename.endswith('.html'):
            # Construct the full path of the HTML file
            html_file = os.path.join(folder_path, filename)
            # print("Extracting content from:", html_file)
            
            # Call the function to extract content from HTML file
            extract_content_from_html(filename, html_file)

if __name__ == "__main__":
    # Path to the folder containing HTML files
    folder_path = "jobs"
    
    # Call the function to extract content from HTML files in the folder
    extract_content_from_folder(folder_path)