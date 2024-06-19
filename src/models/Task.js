// // models/Task.ts
import { Schema } from 'mongoose';

const TaskSchema = new Schema({
    nameLink: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    bio: { type: String, required: true },
    image: { type: String, required: true },
    lists: { type: [String], required: true },
    // add more items in future!
}, {
    timestamps: true,
});

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);
