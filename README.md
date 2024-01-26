# ChopeSeats (MERN Full Stack App)
Our Restaurant Reservation App, developed with the MERN stack, offers a streamlined booking experience for users and restaurant owners. It features three main models: User, Booking, and Restaurant, supporting two user roles - Restaurant Owners and Customers. The app simplifies the process of managing and making restaurant reservations, leveraging the latest web technologies for efficiency and user engagement.

Developers:
* [@jx0906](https://github.com/jx0906)
* [@cedricyong00](https://github.com/cedricyong00)
* [@natsumi-h](https://github.com/natsumi-h)

## Live URL
https://front-end-ftue.onrender.com/

## Source Repositories
* Backend API https://github.com/jx0906/proj3-backend
* Frontend Application https://github.com/cedricyong00/proj3-FE

## Screenshots

### Create, read, update and delete operations across user account, restaurant and booking workflows in FE
<img width="1375" alt="Screenshot 2024-01-24 at 12 10 56 AM" src="https://github.com/jx0906/proj3-backend/assets/88537845/ed96c6ca-88c2-4ba5-81c2-23a0f663feba">
<img width="1388" alt="Screenshot 2024-01-24 at 12 12 25 AM" src="https://github.com/jx0906/proj3-backend/assets/88537845/9a0e9016-0978-4155-b5fe-d78b83d3fa45">
<img width="1388" alt="Screenshot 2024-01-24 at 12 12 50 AM" src="https://github.com/jx0906/proj3-backend/assets/88537845/35a4530d-28f3-4ed6-9ebb-fda377072486">
<img width="1388" alt="Screenshot 2024-01-24 at 12 13 23 AM" src="https://github.com/jx0906/proj3-backend/assets/88537845/596d5a50-ebbb-4720-9ff1-de1e25896b27">

### BE validation and feedback for unauthorised data operations

_Original restaurant entry with owner info_
<img width="863" alt="image" src="https://github.com/jx0906/proj3-backend/assets/142247158/958a1bbc-91e4-4d4f-8a2f-d8bd307b3075">

_Request to update and delete info returns feedback of unauthorised operation as we are not logged in as the authorised owner in Postman_

<img width="865" alt="image" src="https://github.com/jx0906/proj3-backend/assets/142247158/8a5c2cea-7dab-4219-b6c7-246f09a31c2d">
 
<img width="870" alt="image" src="https://github.com/jx0906/proj3-backend/assets/142247158/4aa028ab-eae3-4bfc-a182-08ad4a23724d">

## Technologies Used
### Backend API/DB
* [Mongo DB](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)
* [Express](https://expressjs.com/)

### Frontend Application
* [React](https://react.dev/)
* [React router dom](https://reactrouter.com/en/main) -Routing system
* [Mantine](https://mantine.dev/) -UI Library
* [Mantine form](https://mantine.dev/form/use-form/) -Form validation

### Other packeges used
* [dayjs](https://www.npmjs.com/package/dayjs) - Date formatting
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [bcrypt](https://www.npmjs.com/package/bcrypt)
* [Nodemailer](https://nodemailer.com/)

### PaaS
* [Render](https://render.com/)

## Product Design Documentations
* [Wireframe](https://www.figma.com/file/TVVDEixxtJCfQdbbG35vUs/GA-P3-Idea?type=design&node-id=1302-33&mode=design&t=eBcyAbpJGdW5CTb1-0)
* [Data model ERD](https://app.diagrams.net/#Hjx0906%2Fproj3-backend%2Fmain%2Fdatabase_erd.drawio)
* [CRUD List](https://docs.google.com/spreadsheets/d/1TnCePLg6PgL4GXJ8U22dSM6ApNFd635rB7x1h6AjDYc/edit#gid=298224344)
* [Frontend page structure](https://docs.google.com/spreadsheets/d/1TnCePLg6PgL4GXJ8U22dSM6ApNFd635rB7x1h6AjDYc/edit#gid=0)

## Key Challenges/takeaways
*

## Next Steps
* Media upload implementation for restaurant profile
* Enhance UI for restaurant owner's view of restaurant details and validation of edited info
* Enhancement for validation (Operation hours etc)

## References and Inspirations
* [Chope](https://www.chope.co/singapore-restaurants) - UIUX of restaurant reservation app
