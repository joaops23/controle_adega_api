import { AppDataSource } from "./data-source"
import { StatusUser, User } from "./entity/User"
import * as dotenv from "dotenv";
import * as express from "express";
import { errorHandler } from "./middleware/errorHandler";
import { UserRouter } from "./routes/user.router";
import UserModel from "./model/user.model";
import { Encrypt } from "./helpers/encrypt";

dotenv.config();

const app = express();
app.use(express.json());
app.use(errorHandler);
const {PORT = 3000 } = process.env;
app.use("/user", UserRouter);

// app.get("*", (req: Request, res: Response) => {
//     res.status(505).json({ message: "Bad Request" });
// });
AppDataSource.initialize().then(async () => {

    if(process.env.NODE_ENV == 'DEV'){
        console.log("Inserting a new user into the database...")
        if(!await (new UserModel).findByEmail(process.env.EMAIL_DEFAULT_USER)) {
            const user = new User()
            user.name = "admin"
            user.password = await Encrypt.encryptPass("123456");
            user.email = process.env.EMAIL_DEFAULT_USER
            user.role = "admin";
            user.status = StatusUser.Active;
            await AppDataSource.manager.save(user)
            console.log("Saved a new user with id: " + user.id)
        
            console.log("Loading users from the database...")
            const users = await AppDataSource.manager.find(User)
            console.log("Loaded users: ", users)
        }
    
        console.log("Here you can setup and run express / fastify / any other framework.")
    }

    app.listen(PORT, () => {
        console.log("Server is running on http://localhost:" + PORT);
    })

}).catch(error => console.log(error))
