import AddDoctorAvailabilityForm from '@/components/HostpitalPage/AddDoctorAvailabilityForm'
import DoctorAvailabilityForm from '@/components/HostpitalPage/DoctoravailabilityForm'
import React from 'react'

const HospitalPage = () => {
  return (
    <section className="w-full border h-full rounded-[10px] p-[24px]">
      {/* <AddDoctorAvailabilityForm /> */}
      <DoctorAvailabilityForm />
    </section>
  )
}

export default HospitalPage