# L4GG Timeline
Microsite to display events compiled by Lawyers for Good Government Volunteers.

## Getting Started

Create a .env file
```
cp sample.env .env
```

Install dependencies
```
npm install
```

Start the dev server
```
npm start
```

Open [localhost:3000](http://localhost:3000)

## Creating an Event

You can generate all the files needed to display an event by running the following command from the project root directory:
```
npm run create "Event Name" "2017-02-28 19:30"
```

Valid event date formats include `YYYY`, `YYYY-MM`, `YYYY-MM-DD`, and `YYYY-MM-DD HH:mm`.

**Note:** Event times will be interpreted in UTC. Please verify that the event time looks correct for your local timezone by viewing it in a browser.
