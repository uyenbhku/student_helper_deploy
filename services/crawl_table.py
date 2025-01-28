from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
import pandas as pd

def crawl_table(url: str) -> pd.DataFrame:
    """
    Crawl table content using Selenium

    Args:
        url (str): Website URL containing the table

    Returns:
        pandas.DataFrame: Extracted table data
    """
    # Chrome options
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Run in background
    
    # Setup webdriver
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    
    try:
        # Navigate to page
        driver.get(url)
        
        # Find table
        table = driver.find_element(By.CLASS_NAME, 'tablesorter')
        
        # Extract headers
        headers = [th.text for th in table.find_elements(By.TAG_NAME, 'th')]
        
        # Extract rows
        trows = table.find_elements(By.TAG_NAME, 'tr')[1:]
        rows = []
        for tr in trows:
            tdatarow = tr.find_elements(By.TAG_NAME, 'td')
            row_data = []
            for td in tdatarow: 
                try:
                    img = td.find_element(By.TAG_NAME, 'img')
                    # Add image alt/title text or check for specific conditions
                    cell_value = img.get_attribute('alt') or img.get_attribute('title')
                except:
                    # If no image, use text content
                    cell_value = td.text
                row_data.append(cell_value)
            
            rows.append(row_data)
        
        # Convert to DataFrame
        return pd.DataFrame(rows, columns=headers)
    
    finally:
        driver.close()


if __name__ == "__main__":
    print(crawl_table("https://daa.uit.edu.vn/danh-muc-mon-hoc-dai-hoc"))