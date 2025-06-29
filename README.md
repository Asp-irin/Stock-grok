# Stock-Grok – Groww Assignment

A React Native (Expo) application developed as part of the React Native Intern assignment for Groww. This application enables users to explore top market movers (gainers and losers), track ETFs and stocks, manage personalized watchlists, and view detailed company information through interactive line charts.

With the API limit of 25 calls per day, building this app presented a challenge. What initially appeared as a straightforward implementation evolved into a valuable learning experience in caching strategies and efficient API utilization.

---

## Low-Level Planning

Refer to the attached [documentation](https://docs.google.com/document/d/1uiOwHSV9ZLF9YyHlDGlbPntBX8Pkkjke-Ky21wFUAzg/edit?usp=sharing) for comprehensive details on trade-offs, architecture decisions, and feature planning.

---

## Key Features

### Market Exploration
- **Explore Tab**: View top gainers and losers in the stock/ETF market
- **View All Screen**: Access paginated lists of stocks under each explore section

### Portfolio Management
- **Watchlist Tab**: Create, view, and manage personalized watchlists
- **Add to Watchlist**: Conveniently add stocks to new or existing watchlists via popup interface

### Company Analysis
- **Product Screen**: Display comprehensive company information and price charts for selected stocks/ETFs

### Technical Implementation
- **Theme Support**: Seamless switching between light and dark modes
- **Performance Optimizations**: Implemented API caching with expiration
- **Robust State Handling**: Proper management of loading, error, and empty states

---

## Getting Started

### 1. Clone the Repository
 
```
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Install Dependencies
 
```
npm install
```

### 3. Configure Environment Variables

Create a .env file in the root directory and add your Alpha Vantage API key:
.env
```
ALPHA_VANTAGE_API_KEY=your_api_key_here
```

You can obtain a free API key from: https://www.alphavantage.co/support/#api-key

### 4. Run the App

To run on Android:
 
```
npm run android
```
Or use Expo:
 
```
npx expo start
```

Available runtime options include:
- Android Emulator
- Physical device via Expo Go
- iOS Simulator (macOS only)

---

## API Integration

The application utilizes Alpha Vantage's financial data APIs:
Data Endpoints :

- Alpha Intelligence : Top Gainers and Losers
- Fundamental Data :Company Overview
- Core Stock APIs:
  - TIME_SERIES_DAILY
  - TIME_SERIES_WEEKLY_ADJUSTED
  - TIME_SERIES_MONTHLY_ADJUSTED

Note: The free API tier enforces a 25-request daily limit. The application implements caching mechanisms to optimize request utilization.

## Media Assets

Access all visual resources and mockups via the Google Drive link:  
[Media Drive Folder](https://drive.google.com/drive/folders/1sry7rJwkl6FuICUZOEzxhc-goIL4w8mg?usp=sharing)

---
## Author

**Hemanth Kumar** (aka *Asp-irin*)  
[LinkedIn](https://www.linkedin.com/in/hemanth-kumar-reddy-89668b252/)
---
