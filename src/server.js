import { app } from "./app.js";

const port =3000;
try {
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`)
    })
} catch (error) {
    console.error("Server start failed",error)
}