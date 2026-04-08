import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { IoAddCircleOutline } from "react-icons/io5"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseDetailsAPI"
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice"

import IconBtn from "../../../../Common/IconBtn"
import NestedView from "./NestedView"

export default function CourseBuilderForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)

  const [loading, setLoading] = useState(false)
  const [editSectionName, setEditSectionName] = useState(null)

  const dispatch = useDispatch()

  // submit
  const onSubmit = async (data) => {
    setLoading(true)

    let result

    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      )
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      )
    }

    if (result) {
      dispatch(setCourse(result))
      setEditSectionName(null)
      setValue("sectionName", "")
    }

    setLoading(false)
  }

  // cancel edit
  const cancelEdit = () => {
    setEditSectionName(null)
    setValue("sectionName", "")
  }

  // edit mode
  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit()
      return
    }
    setEditSectionName(sectionId)
    setValue("sectionName", sectionName)
  }

  // next
  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("⚠️ Add at least one section")
      return
    }

    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("⚠️ Each section must have at least one lecture")
      return
    }

    dispatch(setStep(3))
  }

  // back
  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }

  return (
    <div className="space-y-8 rounded-lg border border-richblack-700 bg-richblack-800 p-6 shadow-lg">
      
      {/* Heading */}
      <p className="text-2xl font-semibold text-richblack-5">
        📚 Course Builder
      </p>

      {/* FORM */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Input */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5">
            Section Name <span className="text-pink-200">*</span>
          </label>

          <input
            placeholder="Enter section name..."
            {...register("sectionName", { required: true })}
            disabled={loading}
            className="form-style w-full focus:ring-2 focus:ring-yellow-50"
          />

          {errors.sectionName && (
            <span className="text-xs text-pink-200">
              Section name is required
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">

          <IconBtn
            type="submit"
            disabled={loading}
            text={editSectionName ? "Update Section" : "Add Section"}
            outline={true}
          >
            <IoAddCircleOutline className="text-yellow-50" />
          </IconBtn>

          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-richblack-300 underline hover:text-red-400"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Section List */}
      {course?.courseContent?.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

      {/* Navigation */}
      <div className="flex justify-end gap-3">

        <button
          onClick={goBack}
          className="rounded-md bg-richblack-300 px-5 py-2 font-semibold text-richblack-900 hover:bg-richblack-200"
        >
          Back
        </button>

        <IconBtn text="Next" onclick={goToNext} disabled={loading}>
          <MdNavigateNext />
        </IconBtn>
      </div>
    </div>
  )
}


// import { useState } from "react"
// import { useForm } from "react-hook-form"
// import { toast } from "react-hot-toast"
// import { IoAddCircleOutline } from "react-icons/io5"
// import { MdNavigateNext } from "react-icons/md"
// import { useDispatch, useSelector } from "react-redux"

// import {
//   createSection,
//   updateSection,
// } from "../../../../../services/operations/courseDetailsAPI"
// import {
//   setCourse,
//   setEditCourse,
//   setStep,
// } from "../../../../../slices/courseSlice"
// import IconBtn from "../../../../Common/IconBtn"
// import NestedView from "./NestedView"

// export default function CourseBuilderForm() {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm()

//   const { course } = useSelector((state) => state.course)
//   const { token } = useSelector((state) => state.auth)
//   const [loading, setLoading] = useState(false)
//   const [editSectionName, setEditSectionName] = useState(null)
//   const dispatch = useDispatch()

//   // handle form submission
//   const onSubmit = async (data) => {
//     // console.log(data)
//     setLoading(true)

//     let result

//     if (editSectionName) {
//       result = await updateSection(
//         {
//           sectionName: data.sectionName,
//           sectionId: editSectionName,
//           courseId: course._id,
//         },
//         token
//       )
//       // console.log("edit", result)
//     } else {
//       result = await createSection(
//         {
//           sectionName: data.sectionName,
//           courseId: course._id,
//         },
//         token
//       )
//     }
//     if (result) {
//       // console.log("section result", result)
//       dispatch(setCourse(result))
//       setEditSectionName(null)
//       setValue("sectionName", "")
//     }
//     setLoading(false)
//   }

//   const cancelEdit = () => {
//     setEditSectionName(null)
//     setValue("sectionName", "")
//   }

//   const handleChangeEditSectionName = (sectionId, sectionName) => {
//     if (editSectionName === sectionId) {
//       cancelEdit()
//       return
//     }
//     setEditSectionName(sectionId)
//     setValue("sectionName", sectionName)
//   }

//   const goToNext = () => {
//     if (course.courseContent.length === 0) {
//       toast.error("Please add atleast one section")
//       return
//     }
//     if (
//       course.courseContent.some((section) => section.subSection.length === 0)
//     ) {
//       toast.error("Please add atleast one lecture in each section")
//       return
//     }
//     dispatch(setStep(3))
//   }

//   const goBack = () => {
//     dispatch(setStep(1))
//     dispatch(setEditCourse(true))
//   }

//   return (
//     <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
//       <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div className="flex flex-col space-y-2">
//           <label className="text-sm text-richblack-5" htmlFor="sectionName">
//             Section Name <sup className="text-pink-200">*</sup>
//           </label>
//           <input
//             id="sectionName"
//             disabled={loading}
//             placeholder="Add a section to build your course"
//             {...register("sectionName", { required: true })}
//             className="form-style w-full"
//           />
//           {errors.sectionName && (
//             <span className="ml-2 text-xs tracking-wide text-pink-200">
//               Section name is required
//             </span>
//           )}
//         </div>
//         <div className="flex items-end gap-x-4">
//           <IconBtn
//             type="submit"
//             disabled={loading}
//             text={editSectionName ? "Edit Section Name" : "Create Section"}
//             outline={true}
//           >
//             <IoAddCircleOutline size={20} className="text-yellow-50" />
//           </IconBtn>
//           {editSectionName && (
//             <button
//               type="button"
//               onClick={cancelEdit}
//               className="text-sm text-richblack-300 underline"
//             >
//               Cancel Edit
//             </button>
//           )}
//         </div>
//       </form>
//       {course.courseContent.length > 0 && (
//         <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
//       )}
//       {/* Next Prev Button */}
//       <div className="flex justify-end gap-x-3">
//         <button
//           onClick={goBack}
//           className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
//         >
//           Back
//         </button>
//         <IconBtn disabled={loading} text="Next" onclick={goToNext}>
//           <MdNavigateNext />
//         </IconBtn>
//       </div>
//     </div>
//   )
// }
