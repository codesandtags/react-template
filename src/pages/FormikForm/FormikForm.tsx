import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const FormikForm: React.FC = () => {
    return (
        <Formik
            initialValues={{firstName: '', lastName: '', email: '', month: ''}}
            validationSchema={Yup.object({
                firstName: Yup.string()
                    .min(10, 'Must be 10 characters or more')
                    .required('Please enter your first name'),
                lastName: Yup.string()
                    .min(5, 'Must be 5 characters or more')
                    .required('Please enter your last name'),
                email: Yup.string()
                    .email('Invalid email addresss`')
                    .required('Please enter your email'),
                month: Yup.string().required('Please select a month'),
            })}
            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {formik => (
                <form onSubmit={formik.handleSubmit} className="margin--spacing-7">
                    <div>
                        <div>
                            <div>
                                <input id="firstName" placeholder="Enter your first name here"/>
                            </div>
                        </div>
                        <div>
                            <div>
                                <input id="lastName" placeholder="Enter your last name here"/>
                            </div>
                        </div>
                        <div>
                            <div>
                                <input id="email" placeholder="Enter your email here"/>
                            </div>
                        </div>
                        <div>
                            <div>
                                <select id="month" name="month" placeholder="Select a month">
                                    <option value="January">January</option>
                                    <option value="February">February</option>
                                    <option value="March">March</option>
                                    <option value="April">April</option>
                                    <option value="May">May</option>
                                    <option value="June">June</option>
                                    <option value="July">July</option>
                                    <option value="August">August</option>
                                    <option value="September">September</option>
                                    <option value="October">October</option>
                                    <option value="November">November</option>
                                    <option value="December">December</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div>
                                <button>Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    );
};

export default FormikForm;
