import express from 'express'
import { jwtauthmiddleware } from '../middleware/jwt.js'
import { checkRole } from '../middleware/role.js'
import Poll from '../model/Poll.js'
import User from '../model/User.js'
const pollRouter = express.Router()

pollRouter.post('/createpoll', jwtauthmiddleware, checkRole('admin'), async (req, res) => {
    try {
        const data = req.body;

        const newPoll = await new Poll(data);
        const response = await newPoll.save();

        res.status(201).json({
            success: true,
            message: "Poll Is Created",
            response: response
        })
    } catch (error) {
        console.log("Internal Server Error", error)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }

});

pollRouter.delete('/delete/:pollId', jwtauthmiddleware, checkRole('admin'), async (req, res) => {
    try {
        const { pollId } = req.params;

        const poll = await Poll.findByIdAndDelete(pollId)

        if (!poll) {
            return res.status(404).json({
                success: false,
                message: "Poll not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Poll Deleted Successfully"
        })
    } catch (error) {
        console.log("Internal Server Error", error)
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }

});

pollRouter.put('/update/:pollId', jwtauthmiddleware, checkRole('admin'), async (req, res) => {
    try {
        const { pollId } = req.params
        const poll = await Poll.findById(pollId);

        if (!poll) {
            return res.status(404).json({
                success: false,
                message: "Poll not found"
            });
        }

        const { status } = req.body
        if (status && status === 'ended') {
            poll.status = status;

            const winner = poll.candidate.reduce((prev, current) => {
                return (prev.votecount > current.votecount) ? prev : current;
            });

            poll.winner = winner.name;
            await poll.save()

            return res.status(200).json({
                success: true,
                message: "Poll End And Declare Result",
                winner: {
                    candidateId: winner._id,
                    name: winner.name,  // Assuming 'name' is a field on the candidate
                    votecount: winner.votecount
                }
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid status value"
            });
        }

    } catch (error) {
        console.log("Internal Server Error", error)
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }

});

pollRouter.get('/allPoll', jwtauthmiddleware, async (req, res) => {
    try {
        const allPoll = await Poll.find(); // Saare polls fetch karna

        if (allPoll.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No polls found"
            });
        }
        return res.status(200).json({
            success: true,
            polls: allPoll // Saare polls response mein bhej rahe hain
        });
    } catch (error) {
        console.log("Internal Server Error", error);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
});

pollRouter.get('/allPoll/:pollId', jwtauthmiddleware, async (req, res) => {
    try {
        const { pollId } = req.params
        const poll = await Poll.findById(pollId); // Saare polls fetch karna

        if (!poll) {
            return res.status(404).json({
                success: false,
                message: "No polls found"
            });
        }

        return res.status(200).json({
            success: true,
            poll: poll // Saare polls response mein bhej rahe hain
        });

    } catch (error) {
        console.log("Internal Server Error", error);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
});

pollRouter.post('/:pollId/vote', jwtauthmiddleware, checkRole('voter') , async (req, res) => {
    try {
        const { pollId } = req.params
        const poll = await Poll.findById(pollId);

        if (!poll) {
            return res.status(404).json({
                success: false,
                message: "No polls found"
            });
        }

        if(poll.status === "ended"){
            return res.status(404).json({
                success : false,
                message : "Poll is End You Can't Vote"
            })
        }

        const userId = req.user.id
        const user = await User.findById(userId);

        const alreadyVoted = user.votes.some((ele) => ele.pollId.toString() === pollId.toString());
        if (alreadyVoted) {
            return res.status(400).json({
                success: false,
                message: "You have already voted in this poll"
            });
        }

        

        const { candidateId } = req.body;
        user.votes.push({
            pollId: pollId,
            candidateId: candidateId, // The selected candidate's ID
            voted: true,
        });

        await user.save();

        const candidate = poll.candidate.find((ele) => ele._id.toString() === candidateId);
        if(!candidate){
            return res.status(404).json({
                success : false,
                message : "Candidate Not Found"
            })
        }
        candidate.votes.push({
            userId : userId,
        })

        candidate.votecount++;

        await poll.save();

        return res.status(200).json({
            success: true,
            message: "Your Vote Has Been Recorded"
        })
    } catch (error) {
        console.log("Internal Server Error", error);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
});

export default pollRouter