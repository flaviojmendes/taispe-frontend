[![Build Status](https://travis-ci.org/flaviojmendes/mmk.svg?branch=master)](https://travis-ci.org/flaviojmendes/mmk)
[![codecov](https://codecov.io/gh/flaviojmendes/mmk/branch/master/graph/badge.svg)](https://codecov.io/gh/flaviojmendes/mmk)

# Taispe

This project was created to support a small business. 

Buy local.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running on Docker

To run on Docker, first build the image:

```
$ docker build -t taispe-frontend .
```

Then run it:

```
$ sudo docker run -d -p 80:80 -v "/home/taispe/letsencrypt:/etc/letsencrypt" --network host --name taispe-frontend taispe-frontend
```

You will be able to access the app through `https://localhost`
