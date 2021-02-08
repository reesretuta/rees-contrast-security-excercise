### Setup
`npm install`

### Run the app
`npm start` and open localhost:3000

### Testing
`npm test` 

### Notes
- Searching for "BA" will provide 3 working tickers can click: "Boeing Company" "Banro Corporation" and "Alibaba" so as to more easily stay below 5 requests per minute api threshold from alphavantage.co
- recommended Node version 12 or higher
- if on Mac OS Catalina, there is an issue with the watchman package having access to desktop when running `npm test`, pls move project to anywhere within ~/Documents instead to by pass this.  See https://github.com/facebook/watchman/issues/751