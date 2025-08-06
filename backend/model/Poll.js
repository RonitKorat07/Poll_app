import mongoose from "mongoose";

const pollSchema = mongoose.Schema({
    title : {
        type : String,
        required: true
    },
    description :{
        type : String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'ended'],
        default: 'active'
    },
    winner: {
        type : String,
        default : null
    },
    candidate : [ 
        {
            name : {
                type : String,
                required: true
            },
            votes: [
                    {
                     userId: {
                       type : mongoose.Schema.Types.ObjectId,
                       ref : 'User' 
                     },
                     votedAt: {
                         type : Date,
                         default : Date.now
                     } 
                    }
            ],
            votecount : {
                type : Number,
                default : 0
            }

        }
    ]

})

const Poll = mongoose.model('Poll' , pollSchema)
export default Poll