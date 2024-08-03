"use client"


import React from 'react';
import { Formik, Field, FieldArray, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';

const daysOfWeek = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

const timeOptions = [
  '00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30',
  '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30',
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'
];

const timeSlotsSchema = Yup.object().shape({
  from: Yup.string().oneOf(timeOptions, 'Invalid time').required('From time is required'),
  to: Yup.string().oneOf(timeOptions, 'Invalid time').required('To time is required'),
});

const availabilitySchema = Yup.object().shape({
  day: Yup.string().required('Day of the week is required'),
  slots: Yup.array().of(timeSlotsSchema).required('At least one time slot is required'),
});

const validationSchema = Yup.object().shape({
  doctor: Yup.string().required('Doctor name is required'),
  availability: Yup.array().of(availabilitySchema).required('Availability is required'),
});

interface TimeSlot {
  from: string;
  to: string;
}

interface Availability {
  day: string;
  slots: TimeSlot[];
}

interface FormValues {
  doctor: string;
  availability: Availability[];
}

const AddDoctorAvailabilityForm: React.FC = () => {
  const initialValues: FormValues = {
    doctor: '',
    availability: [],
  };

  const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    // Handle form submission
    console.log(values);
    setSubmitting(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Doctor Availability Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">Doctor Name</label>
              <Field
                name="doctor"
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <FieldArray name="availability">
              {({ push, remove }) => (
                <div className="space-y-4">
                  {values.availability.map((_, index) => (
                    <div key={index} className="border p-4 rounded-lg shadow-sm">
                      <div>
                        <label htmlFor={`availability.${index}.day`} className="block text-sm font-medium text-gray-700">Day of the Week</label>
                        <Field
                          name={`availability.${index}.day`}
                          as="select"
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="">Select a day</option>
                          {daysOfWeek.map(day => (
                            <option key={day} value={day}>{day}</option>
                          ))}
                        </Field>
                      </div>
                      <FieldArray name={`availability.${index}.slots`}>
                        {({ push, remove }) => (
                          <div className="space-y-2 mt-4">
                            {values.availability[index].slots.map((_, slotIndex) => (
                              <div key={slotIndex} className="flex gap-4">
                                <div className="flex-1">
                                  <label htmlFor={`availability.${index}.slots.${slotIndex}.from`} className="block text-sm font-medium text-gray-700">From</label>
                                  <Field
                                    name={`availability.${index}.slots.${slotIndex}.from`}
                                    as="select"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                  >
                                    <option value="">Select a time</option>
                                    {timeOptions.map(time => (
                                      <option key={time} value={time}>{time}</option>
                                    ))}
                                  </Field>
                                </div>
                                <div className="flex-1">
                                  <label htmlFor={`availability.${index}.slots.${slotIndex}.to`} className="block text-sm font-medium text-gray-700">To</label>
                                  <Field
                                    name={`availability.${index}.slots.${slotIndex}.to`}
                                    as="select"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                  >
                                    <option value="">Select a time</option>
                                    {timeOptions.map(time => (
                                      <option key={time} value={time}>{time}</option>
                                    ))}
                                  </Field>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => remove(slotIndex)}
                                  className="self-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                  Remove Time Slot
                                </button>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => push({ from: '', to: '' })}
                              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              Add Time Slot
                            </button>
                          </div>
                        )}
                      </FieldArray>
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        Remove Day
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => push({ day: '', slots: [] })}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Add Day
                  </button>
                </div>
              )}
            </FieldArray>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddDoctorAvailabilityForm;
