import { Button } from "@/components/ui/button"
import { authenticate_user } from "./login"



export const JWTTestTokenButton = () => {


    const handleLogin = async () => {
        try {
            await authenticate_user("user1", "user1password");
            console.log("Logged in!")

        } catch (err) {
            console.log("Login Failed!", err);
        }
    }

    return (
        <div className="">
            <Button onClick={handleLogin}>
                JWT TOKEN
            </Button>
        </div>
    )

}
