import { createSlice } from '@reduxjs/toolkit'

let lastId = 0

const slice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        addSingleUser: (users, action) => {
            users.push({
                id: ++lastId,
                name: action.payload.name
            })
        }
    }
})

export const { addSingleUser } = slice.actions
export default slice.reducer