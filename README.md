# Mamuska

This project was created to support a small business. 

Buy local.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running on Docker

To run on Docker, first build the image:

```
$ docker build -t mamuska .
```

Then run it:

```
$ docker run -d -p 80:80 --name mamuska mamuska
```

You will be able to access the app through `http://localhost`
