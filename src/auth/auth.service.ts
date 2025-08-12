import { sql } from "drizzle-orm"
import db from "../Drizzle/db"
import { TIUser, UsersTable } from "../Drizzle/schema"

export const createUserService = async(user:TIUser) => {
    await db.insert(UsersTable).values(user)
    return "User created successfully"

}


export const userLoginService = async(user:TIUser) => {
    const { email } = user


    return await db.query.UsersTable.findFirst({
        columns: {
            userId: true,
            firstname: true,
            lastname: true,
            email: true,
            password: true,
            role: true

        }, where: sql`${UsersTable.email} = ${email}`
    })
}

// export const verifyUserService = async(email:string) => {
//     await db.update(UsersTable)
//     .set({isVerified: true, verficationCode: null})
//     .where(sql`${UsersTable.email} = ${email}`)
//     .execute()
//     return "User verified successfully"
// }