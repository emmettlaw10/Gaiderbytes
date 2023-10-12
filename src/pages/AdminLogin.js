import React from "react";
import {FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {object} from "zod";


const AdminLogin = ({onSave}) => {

    const schema = z.object({
        username: z.string().min(3),
        password: z.string().min(5),
    });


    const {register, handleSubmit, formState, control} = useForm({resolver: zodResolver(schema)});

    const {errors} = formState;

    const login = (formValues) => {
        onSave(formValues)
    }


    return (
        <div>
            <div className="shadow-lg bg-slate-200 p-3 rounded-md m-2 flex flex-col items-center">
                <h1 className="text-3xl items-center">Admin Login</h1>
                <form onSubmit={handleSubmit(login)} className='p-3 flex flex-col items-center'>
                    <div>
                        <label htmlFor="username">Username: </label>
                        <input type="text" className="rounded-md p-3 ml-5 mb-5 w-50 " placeholder="Username"
                               {...register("username")}
                        />
                        <div style={{color: "red"}}>
                            {errors.username?.message}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <input type="password" className="rounded-md p-3 ml-6 w-50" placeholder="Password"
                               {...register("password")}
                        />
                        <div style={{color: "red"}}>
                            {errors.first_name?.message}
                        </div>
                    </div>
                    <button className="bg-red-400 p-3 rounded-md hover:bg-red-200 m-2 ml-2" type="submit">Sign In</button>
                </form>
            </div>
        </div>


    );
};

export default AdminLogin;
