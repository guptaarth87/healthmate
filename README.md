# HealthMate

**HealthMate** is a data-driven health application built using the MERN stack (MongoDB, Express, React, Node.js) and Python. The app collects user data, including location, gender, region, health issues, and prescribed medicines, and stores it in a centralized MongoDB database. The data is then analyzed to identify health issue patterns, trends in medicine usage, and to provide city-wise visualizations and machine learning predictions.

## Project Structure

- **Frontend**: The React application that handles the user interface and user interactions. Located in the `frontend` folder.
- **Backend**: The Node.js application that manages API requests, interacts with the MongoDB database, and handles user data. Located in the `backend` folder.
- **Data Analysis**: A Python script (`medical_data_analysis.ipynb`) that performs data analytics by pulling data directly from MongoDB. This script provides visualizations and machine learning predictions based on the collected data.

## Features

- **User Data Collection**: Collects user data such as location, gender, region, health issues, and prescribed medicines.
- **Centralized Database**: Stores collected data in a centralized MongoDB database for easy access and analysis.
- **Data Analytics**: Utilizes Python to analyze health issue patterns, trends in medicine usage, and provides visualizations and machine learning predictions.
- **City-Wise Insights**: Offers city-wise insights and trends to better understand health patterns and medicine usage.

## Technologies Used

- **Frontend**: React.js, HTML, CSS, Bootstrap
- **Backend**: Node.js, Express.js, MongoDB
- **Data Analytics**: Python, Pandas, Matplotlib, Scikit-learn

## Installation

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB
- Python 3.x
- Jupyter Notebook or any other Python IDE (for running `medical_data_analysis.ipynb`)

### Clone the Repository

```bash
git clone https://github.com/guptaarth87/HealthMate.git
cd HealthMate
