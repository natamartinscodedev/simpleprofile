// models/Users.ts
import { Schema, model, models } from 'mongoose';

const TaskSchema = new Schema({
    nameLink: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    bio: { type: String },
    image: { type: String },
    lists: { type: [String], required: true },
    // add more items in future!
}, {
    timestamps: true,
});

export default models.User || model('User', TaskSchema);
