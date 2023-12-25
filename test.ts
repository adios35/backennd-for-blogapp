// ESM
import { faker } from '@faker-js/faker';
import { Post } from './models/schema';
import mongoose from 'mongoose';
// CJS

export async function createRandomUser() {
    const userId = new mongoose.Types.ObjectId("657e7a61b7d315bbea303723")
    const newPost = new Post({
        title: faker.lorem.sentence(4),
        content: faker.lorem.paragraph({ max: 40 }),
        author: userId
    })
    await newPost.save()
}


// for (let i = 1; i < 5; i++) {
//     console.log(createRandomUser())
// }

// faker.helpers.multiple(createRandomUser, {
//     count: 5,
// });