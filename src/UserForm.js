import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from 'yup';
import axios from 'axios';


const UserForm = ({ values, errors, touched, status }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (status) {
            status && setUsers(users => [...users, status]);
        }
    }, [status]);

    return (
        <div className='user-form'>
            <h1>User Form</h1>
            <Form>
                <Field type="text" name="name" placeholder="Name" />
                {touched.name && errors.name && (<p className="error">{errors.name}</p>)}

                <Field type="text" name="email" placeholder="Email" />
                {touched.email && errors.email && (<p className="error">{errors.email}</p>)}

                <label htmlFor='role' className="role">Role: </label>
                <Field component="select" name="role">
                    <option value="Select-Role">Select Role</option>
                    <option value="Front-End">Front-End</option>
                    <option value="Back-End">Back-End</option>
                    <option value="Full-Stack">Full-Stack</option>
                </Field>
                {touched.role && errors.role && (<p className="error">{errors.role}</p>)}

                <Field type="text" name="password" placeholder="Password" />
                {touched.password && errors.password && (<p className="error">{errors.password}</p>)}

                <label>
                    Terms of Service
          <Field type="checkbox" name="termsofservice" checked={values.termsofservice} />

                </label>

                <button type="submit">Submit</button>
            </Form>

            {users.map(user => (
                <ul key={user.id}>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                    <li>Role: {user.role}</li>
                    <li>Password: {user.password}</li>
                </ul>
            ))}
        </div>
    );
};
const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, termsofservice, role }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            termsofservice: termsofservice || false,
            role: role || ""
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required(),
        role: Yup.string().required()
    }),

    handleSubmit(values, { setStatus }) {
        axios
            .post("https://reqres.in/api/users/", values)
            .then(res => {
                setStatus(res.data);
            })
            .catch(error => console.log(error.res));
    }

})(UserForm);


export default FormikUserForm;