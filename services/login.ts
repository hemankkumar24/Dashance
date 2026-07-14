import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { generateToken } from "@/lib/jwt";

interface loginInput {
    email: string;
    password: string;
}

export async function loginUser({
    email,
    password,
}: loginInput) {
    // wait for mongo connection
    await connectDB();

    // check email
    const findAccount = await User.findOne({ email });

    if (!findAccount) {
        throw new Error("Invalid email or password.");
    }

    // Hash password
    const checkPassword = await bcrypt.compare(password, findAccount.password);

    // generates jwt token for auth
    if(checkPassword) {
        return generateToken({
            userId: findAccount._id.toString(),
            email: findAccount.email,
        });
    }

    throw new Error("Invalid email or password.");
    
}