# fscdevicetracker
Technology used: Nodejs and mongodb. CloudFormation to build Infrastructure.
This application runs on port:8080 and database listens on port:27017

### How to setup the application
*GH Repo -> https://github.com/iliyasmohamed/fscdevicetracker*
*Download this Infra/application setup file from github --> https://github.com/iliyasmohamed/fscdevicetracker/blob/main/IaCfscdevicetracker.yml to local disk.*
*You need this file at step 5 below to run the Stack creation*

*Pre-requisites: You need to create a EC2 KeyPair or Name of an existing EC2 KeyPair to extract the password for the newly created windows instance*

1. Login to aws console 
2. Navigate to Services -> CloudFormation -> Create Stack
3. Under "Prerequisite - Prepare template" select option  "Template is ready"
4. Under "Specify template" select "Upload a template file"
5. Click "Choose file" under "Upload a template file" and Open "IaCfscdevicetracker" and click "Next"
6. Specify stack details:
    Stack name: *Enter a stack name for our reference*
    
    AMI: Use ami-02642c139a9dfb378 for us-east-1 
             ami-00843a337042b9b8b for us-east-2
             ami-0b7c10374cfb013e6 for us-west-1 
             ami-0f7db24b49508dd37 for us-west-2
    
    AZ: *Pick from the list. You can pick any available AZ from the list*    
    
    CidrIp: *accept the default*    
    
    EC2SubnetID: *accept the default*
    
    EC2NodeCount: 1
    
    EC2SubnetID: *Pick from the list. You can pick any available AZ from the list*
    
    Environment: *Enter a name for our reference*
    
    KeyName: *Name of an existing EC2 KeyPair to enable RDP access to the instances*
    
    VpcID: *Pick from the list.*

7. Configure stack options -> accept the default and click "Next"
8. Review the details and click "Create stack"
9. In AWS Console -> Navigate to EC2 -> Launch Configurations from the left side bar
10. Under "Launch Configurations" you can view the status of the Stack Creation process that you have submitted earlier.
 
Once you see the stack created successful message, navigate to AWS Services -> EC2 instance and extrack the EC2 password.
RDP to the EC2 instance and launch "PostMan" application to access the application, run & post CRUD operations

### How to execute CRUD Operations
*Please ensure to select "raw" option and "JSON" format in POSTMAN while executing CRUD operations*

* open PostMan application on the EC2 instance and use the below URLs for CRUD operations:
* To Create devices                                     -   POST    : http://localhost:8080/devices
* To Fetch all the devices from the Storage             -   GET     : http://localhost:8080/devices
* To Fetch specific devices from the Storage            -   GET     : http://localhost:8080/devices/<id>
* To Check-in/Check-out the devices from the storage    -   PATCH   : http://localhost:8080/devices/<id>
* To Delete the devices from the storage                -   DELETE  : http://localhost:8080/devices/<id>

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

***How to start manually?***
Naviagte to c:\fscdevicetracker\fscdevicetracker-main
- npm run start

***Base setup required to run this program***
- npm init
- npm install express
- npm install mongodb
- npm install mongoose
- npm install -g nodemon --save-dev

### Files used in the Project
* modeles/device.js - this file contains the configuration details pertaining to the database, collections and schema
* routes/devices.js - this file contains the code that will create, read, update, and delete data into the mongo Database tables. Also, display the output in JSON format
* apps.js - root file contains definition of required library details

### Functions names and their usage in routes/devices.js
* router.post   - creates the required devices to the Storage (CREATE)
* router.get    - display the list of devices / devices based on therir id from the mongo Storage (READ)
* router.patch  - updates the required devices to the  Storage. Also, check in / check out can be done to/from the  Storage (UPDATE)
* router.delete - remove the devices based on therir id from the Storage (DELETE)