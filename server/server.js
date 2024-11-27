
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const authRouter = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const database = require('./config/database');
const fileUpload = require('express-fileupload');
const { cloudinaryConnect } = require('./config/cloudinary');

// find port
dotenv.config();
const PORT = process.env.PORT || 5000;

// middelware
app.use(express.json());
app.use(
	cors({
		origin:"*",
		credentials:true,
	})
)
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
)

// databse connection
database.connect();

// cloudinary connect
cloudinaryConnect();

// mounting routes
app.use("/auth", authRouter);
app.use("/profile", profileRoutes);
// app.use("/adminRoutes", adminRoutes);

// default route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: 'Server is up and running'
    })
})

app.listen(PORT, () => {
    console.log("Server is Running at Port-",PORT);
})





// nimbadkarnitin
// lwdFpRhXtkcnvwqn
// mongodb+srv://nimbadkarnitin:lwdFpRhXtkcnvwqn@cluster0.kka8x.mongodb.net/