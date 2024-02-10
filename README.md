## Note-App

A basic note app with CRUD operations for learning the concepts of react and NextJS. This app includes creating a new note, editing notes, deleting notes and search for existing notes in the application.

DEMO - [next-note-app-six.vercel.app](https://next-note-app-six.vercel.app/ "https://next-note-app-six.vercel.app")
## Installing

Clone or [download](https://github.com/sriram-24/next-note-app/archive/refs/heads/main.zip) the repository.

```bash
git clone https://github.com/sriram-24/next-note-app.git
```

Install the dependencies by running `npm install` command.

Add `.env.dev` file in the root of the project and add your mongodb connection string. Add `notesdb` string in `{databaseName}` placeholder.

```.env
MONGODB_URI=mongodb+srv://{username}:{password}@{host}/{databaseName}?{options}
```

Run the development server

```bash
npm run dev
```

Open your browser to check the result at [localhost:3000](http://localhost:3000/)


## Issues

Post your issues found in the application by creating a new issue - [Open an Issue](https://github.com/sriram-24/next-note-app/issues/new)
