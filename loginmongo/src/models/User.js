import { Schema, model } from 'mongoose'
import bcryptjs from 'bcryptjs'

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    token: String,
    expiration: String
}, {
    timestamps: true
})

UserSchema.pre('save', async function() {
    this.password = await bcryptjs.hash(this.password, 8)
})

UserSchema.methods.show = function() {
    return {
        _id: this._id,
        name: this.name,
        email: this.email,
        deleted: this.deleted
    }
}

export default model('User', UserSchema)