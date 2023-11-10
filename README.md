# Live Demo [FPS-Aim-Trainer](https://confident-wiles-6da088.netlify.com) - Heroku Backend Is Permanently Down - Setup DB Locally if you want to run it. Instrusctions below


# How to setup fps-aim-trainer-backend database locally (or on a virtual computer through a third party service such as Heroku that allows you to attach databases with your application)

## Steps to setup database locally (WSL Ubuntu)

1. `sudo apt-get update`
2. `sudo apt-get install postgresql postgresql-contrib`
3. `sudo service postgresql start`
4. `sudo -u postgres psql -c "SELECT version();"`

## Create new super user (optional)

1. `sudo -u postgres psql`
2. `CREATE ROLE your_username WITH SUPERUSER LOGIN PASSWORD 'your_password';`
3. Verify role `\du`
4. Exit PostgreSQL `q` (if desired)

## Add Create role, Create DB, Replication, Bypass RLS roles to new super user (optional)

1. `sudo -u postgres psql`
1. `ALTER ROLE brianruff WITH BYPASSRLS CREATEDB CREATEROLE REPLICATION;`
1. Verify roles with `\du`
1. Exit PostgreSQL `q` (if desired)

## Access psql shell with your user

1. psql -U brianruff -d postgres -W
2. enter the password that assigned to the user

## Updating pg_hba.conf files - Allows you to access psql shell as different user than root

1. change peer to md5 or scram-sha-256

## Create Database

1. `CREATE DATABASE "fps-aim-trainer";`
2. `\c fps-aim-trainer`

## Create table named "score" (be sure that you are connected to the correct database "fps-aim-trainer" or w/e u named it)

1. `CREATE TABLE score (
    username VARCHAR(255),
    score INT
);`

## Grant User Permission to database

1. `GRANT CONNECT ON DATABASE "fps-aim-trainer" TO new_username;`
2. `GRANT ALL PRIVILEGES ON TABLE score TO new_username;`

## Create connection string to configure database in dbConfig.js

- example connection string: "postgresql://username:password@localhost:5432/fps-aim-trainer"

# How to run the backend

1. node or nodemon `node index.js`

# How to run the user interface once you have the backend running

1. In the ui folder, runt he index.html file in your browser.

# Running on HTTPS (Ubuntu) - Server will try to do this for you automatically now

1. create signed certificate with OpenSSL
   `openssl genrsa -out localhost.key 2048
openssl req -new -x509 -key localhost.key -out localhost.cert -days 3650 -subj /CN=localhost`
