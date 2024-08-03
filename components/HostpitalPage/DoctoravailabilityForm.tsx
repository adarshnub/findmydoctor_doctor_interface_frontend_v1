"use client";

import React from "react";
import { Formik, Field, FieldArray, Form, FormikHelpers } from "formik";
import * as Yup from "yup";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const timeOptions = [
  "00:00",
  "00:30",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
];

// Convert time to minutes since start of day
const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

// Convert minutes since start of day to time string
const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const mins = (minutes % 60).toString().padStart(2, "0");
  return `${hours}:${mins}`;
};

// Function to filter "From" times based on existing slots
const getAvailableFromTimes = (slots: TimeSlot[]): string[] => {
  const lastToTimes = slots
    .filter((slot) => slot.to)
    .map((slot) => timeToMinutes(slot.to));

  const latestToTime = Math.max(...lastToTimes, 0);

  // Add 30 minutes to the latest "To" time
  const earliestFromTime = latestToTime + 30;

  return timeOptions.filter((time) => {
    const timeMinutes = timeToMinutes(time);
    return timeMinutes >= earliestFromTime;
  });
};

// Function to filter "To" times based on "From" time
const getAvailableToTimes = (fromTime: string): string[] => {
  const fromTimeMinutes = timeToMinutes(fromTime);
  const earliestToTime = fromTimeMinutes + 30;

  return timeOptions.filter((time) => {
    const timeMinutes = timeToMinutes(time);
    return timeMinutes >= earliestToTime;
  });
};

const timeSlotsSchema = Yup.object().shape({
  from: Yup.string()
    .oneOf(timeOptions, "Invalid time")
    .required("From time is required"),
  to: Yup.string()
    .oneOf(timeOptions, "Invalid time")
    .test(
      "is-valid-to-time",
      "To time must be at least 30 minutes after From time",
      function (value) {
        const { from } = this.parent;
        if (from && value) {
          return timeToMinutes(value) >= timeToMinutes(from) + 30;
        }
        return true;
      }
    )
    .required("To time is required"),
});

const availabilitySchema = Yup.object().shape({
  day: Yup.string().required("Day of the week is required"),
  slots: Yup.array()
    .of(timeSlotsSchema)
    .required("At least one time slot is required"),
});

const validationSchema = Yup.object().shape({
  doctor: Yup.string().required("Doctor name is required"),
  availability: Yup.array()
    .of(availabilitySchema)
    .required("Availability is required"),
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

const DoctorAvailabilityForm: React.FC = () => {
  const initialValues: FormValues = {
    doctor: "",
    availability: [],
  };

  const handleSubmit = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    
    console.log(values, "VALUES");

    setSubmitting(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Doctor Availability Form</h1>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, setFieldTouched }) => (
          <Form className="space-y-4">
            <div>
              <label
                htmlFor="doctor"
                className="block text-sm font-medium text-gray-700"
              >
                Doctor Name
              </label>
              <Field
                name="doctor"
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <FieldArray name="availability">
              {({ push, remove }) => (
                <div className="space-y-4">
                  {values.availability.map((availability, dayIndex) => (
                    <div
                      key={dayIndex}
                      className="border p-4 rounded-lg shadow-sm"
                    >
                      <div>
                        <label
                          htmlFor={`availability.${dayIndex}.day`}
                          className="block text-sm font-medium text-gray-700"
                        >
                          Day of the Week
                        </label>
                        <Field
                          name={`availability.${dayIndex}.day`}
                          as="select"
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="">Select a day</option>
                          {daysOfWeek.map((day) => (
                            <option key={day} value={day}>
                              {day}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <FieldArray name={`availability.${dayIndex}.slots`}>
                        {({ push, remove }) => (
                          <div className="space-y-2 mt-4">
                            {availability.slots.map((slot, slotIndex) => {
                              // Calculate available "From" times for each slot
                              const availableFromTimes = getAvailableFromTimes(
                                availability.slots.slice(0, slotIndex)
                              );

                              return (
                                <div key={slotIndex} className="flex gap-4">
                                  <div className="flex-1">
                                    <label
                                      htmlFor={`availability.${dayIndex}.slots.${slotIndex}.from`}
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      From
                                    </label>
                                    <Field
                                      as="select"
                                      name={`availability.${dayIndex}.slots.${slotIndex}.from`}
                                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                      onChange={(e: any) => {
                                        const selectedFromTime = e.target.value;
                                        setFieldValue(
                                          `availability.${dayIndex}.slots.${slotIndex}.from`,
                                          selectedFromTime
                                        );
                                        setFieldTouched(
                                          `availability.${dayIndex}.slots.${slotIndex}.from`,
                                          true
                                        );

                                        // Update "To" times
                                        setFieldValue(
                                          `availability.${dayIndex}.slots.${slotIndex}.to`,
                                          ""
                                        );
                                      }}
                                    >
                                      <option value="">Select time</option>
                                      {availableFromTimes.map((time) => (
                                        <option key={time} value={time}>
                                          {time}
                                        </option>
                                      ))}
                                    </Field>
                                  </div>
                                  <div className="flex-1">
                                    <label
                                      htmlFor={`availability.${dayIndex}.slots.${slotIndex}.to`}
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      To
                                    </label>
                                    <Field
                                      as="select"
                                      name={`availability.${dayIndex}.slots.${slotIndex}.to`}
                                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                      disabled={
                                        !values.availability[dayIndex].slots[
                                          slotIndex
                                        ].from
                                      }
                                    >
                                      <option value="">Select time</option>
                                      {getAvailableToTimes(
                                        values.availability[dayIndex].slots[
                                          slotIndex
                                        ].from
                                      ).map((time) => (
                                        <option key={time} value={time}>
                                          {time}
                                        </option>
                                      ))}
                                    </Field>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => remove(slotIndex)}
                                    className="text-red-600 hover:text-red-800 mt-6"
                                  >
                                    Remove Slot
                                  </button>
                                </div>
                              );
                            })}
                            <button
                              type="button"
                              onClick={() => push({ from: "", to: "" })}
                              className="text-blue-600 hover:text-blue-800 mt-4"
                            >
                              Add Time Slot
                            </button>
                          </div>
                        )}
                      </FieldArray>
                      <button
                        type="button"
                        onClick={() => remove(dayIndex)}
                        className="text-red-600 hover:text-red-800 mt-4"
                      >
                        Remove Day
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => push({ day: "", slots: [] })}
                    className="text-blue-600 hover:text-blue-800 mt-4"
                  >
                    Add Day
                  </button>
                </div>
              )}
            </FieldArray>
            <div className="mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700"
              >
                Submit
              </button>
            </div>

            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <h2 className="text-lg font-bold">Formik State</h2>
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DoctorAvailabilityForm;
