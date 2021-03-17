# Bla! App

Bla! is an application to chat via audio.

## Run the app

### Front
```
  $ cd front
  $ npm i
  $ npm start
```

### Back
Before running the project you must have installed `psql`, `node` and `npm`. Also make sure to install globally latest version of `sails`:
```
  $ npm i -g sails
```
It's possible to seed the DB using `knex`. Make sure to install it globally too:
```
  $ npm i -g knex
```
To run the backend project:
```
  $ cd back
  $ npm i
  $ sails lift --alter
```
---
## TODO
- Make a trello board to manage issues.
- Apply design + UX.
- Create iframe wrapper and widgetize.
- Create tags > ppl and audio/threads.
- Create preset filters.
- Create custom filters bar.
- Store audios.
- Store filters.
- Create conversations' trees (maybe).
- Create Auth layer.
- Create transcriptor.
- Show transcriptions.
- User settings.
- Widget customization (user + owner).

## Fix me
- Recordings pag issues > Implement recordings pagination
## Widgets
- Bag of audios
- Live conversations
- Normal asynchronic conversation