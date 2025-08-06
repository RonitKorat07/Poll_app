import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
    },
    number: {
        type: Number,
    },
    role: {
        type: String,
        enum: ['voter', 'admin'],
        default: 'voter'
    },
    votes: [
        {
            pollId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Poll'
            },
            candidateId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Poll.candidate'
            },
            voted: {
                type: Boolean,
                default: false
            },
            votedAt: {
                type: String,
                default: Date.now
            }
        }
    ]

})

userSchema.pre('save', async function (next) {
    const User = this
    if (!User.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hashpass = await bcrypt.hash(User.password, salt)
        User.password = hashpass;
        next();
    } catch (err) {
        console.log('err', err);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const ismatch = await bcrypt.compare(candidatePassword, this.password);
        return ismatch;
    } catch (error) {
        console.log('err', error);
    }
};

userSchema.methods.hasRole = function (role) {
  return this.role === role;
};

const User = mongoose.model("User", userSchema);
export default User;
