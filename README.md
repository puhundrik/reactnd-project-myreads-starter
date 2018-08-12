# Frontend Nanodegree MyReads Project

## Project Overview

This is the project for Udacity Frontend Nanodegree Course.

MyReads is a simple app that allows users to track and categorize books they have read, are currently reading or want to read.

## REQUIREMENTS

1. [Node.js](https://nodejs.org/en/)
2. [npm](https://www.npmjs.com/)
3. Internet connection to load external scripts.


## How to Install

Get the project files:

* Clone the [repository](https://github.com/puhundrik/udacity_myreads_project.git) to local PC.

or

* Download [zip-file](https://github.com/puhundrik/udacity_myreads_project/archive/master.zip) with repository, unpack the files to any folder

In terminal navigate to the folder with the project files and run:

```
npm install
```

to install all needed packages and dependences.

To start the project run this command from the folder with the project files:

```
npm start
```
The web-page should open in your default browser.

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).

## License

This project is licensed under the MIT License.