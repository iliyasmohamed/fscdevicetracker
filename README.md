# fscdevicetracker

***Base setup required to run this program***
- npm init
- npm install express
- npm install mongodb
- npm install mongoose
- npm install -g nodemon --save-dev

Application runs on port:8080 and mongodb listens on port:27017

npm start

Download IaC from github
Login to aws console -> CF -> Create Stack
Select Template is ready -> Choose file -> IaC.yml -> Next -> 
Enter values for StackName, AZ, VPC, Subnet, KeyName: (Existing EC2 KeyPair) --> Next --> Next --> Create Stack

Get EC2 IP details -> RDP EC2 -> Open VSC -> npm start
postmon -> run & post CRUD operations

***How to execute CRUD operations***
* open PostMan and use the below URLs for CRUD operations:
* To Create devices                                     -   POST    : http://localhost:8080/devices
* To Fetch all the devices from the DB                  -   GET     : http://localhost:8080/devices
* To Fetch specific devices from the DB                 -   GET     : http://localhost:8080/devices/<id>
* To Check-in/Check-out the devices from the storage    -   PATCH   : http://localhost:8080/devices/<id>
* To Delete the devices from the storage                -   DELETE  : http://localhost:8080/devices/<id>

### Files used in the Project
* modeles/device.js - this file contains the configuration details pertaining to the database, collections and schema
* routes/devices.js - this file contains the code that will create, read, update, and delete data into the mongo Database tables. Also, display the output in JSON format
* apps.js - root file contains definition of required library details

### Functions names and their usage in routes/devices.js
* router.post   - creates the required devices to the mongo databasae table (CREATE)
* router.get    - display the list of devices / devices based on therir id from the mongo database table (READ)
* router.patch  - updates the required devices to the mongo databasae table. Also, check in / check out can be done to/from the mongo database table (UPDATE)
* router.delete - remove the devices based on therir id from the mongo database table (DELETE)

### Functions names and their usage in models/device.js
* load_staging_tables - loads the JSON data from S3 location into the Redshift database staging tables
* insert_tables - inserts data from the staging tables into the Redshift datanase final tables

### Functions names and their usage in apps.js - root file

### Criterion - A successful execution of the required funtions as part of this project will result in the following:
1. Display a list of devices currently in storage
2. Be able to add and remove devices
3. Be able to check-in/out a device to/from storage
4. Give good user feedback on the status of all devices
5. Save updates to a database of your choosing
6. Run without issues

* Edge cases handled:
1. Attempt to check out a device that's already checked out
2. Checkouts can only be performed between 9:00am - 17:00pm
3. Indicate if a device has been checked out for more than a week
4. Max number of allowed in the garage is 10, the system should prevent adding more.
5. Each person can only check out one device at a time.
