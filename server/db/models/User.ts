import mongoose, {Document, Schema, Types} from 'mongoose'



import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";


type UserDocument = Document & {
    _id: Types.ObjectId
    username?: string
    email: string
    password: string
    profilePicture: string
    role: 'user' | 'admin',
    orders: []
}

type OrderSchemaDocument = Document & {

    subtotal: number
    total: number

}

const userSchema = new Schema({
        username: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        profilePicture: {
            type: String,
            default: "https://c1chy.lima-city.de/graphic/Webentwicklung.png",
        },

    },
    { timestamps: true,


        statics: {
            async findByCredentials(email: string, password: string): Promise<any> {
                const user = await User.findOne({ email })

                if (!user)
                    throw new Error('Account not found!')
                // 透過 bcrypt 驗證密碼
                const isMatch = await bcrypt.compare(password, user.password!)

                if (!isMatch)
                    throw new Error('Password is incorrect!')
                return user
            },

            async findByEmail(email: string): Promise<any> {
                const user = await User.findOne({ email })
                if (!user)
                    throw new Error('Account Exist!')

                return user
            },
        },

        methods: {
        async generateAuthToken(): Promise<string> {
                const user = this
                const token = jwt.sign({ _id: user._id.toString(), role: user.role }, useRuntimeConfig().jwtSecret)
                await user.save()

                return token
            },
        },
        }


);

userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password!, 8)
    }
})

const User = mongoose.model<UserDocument>("User", userSchema);
export default User;