import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI"
import { setCourse, setStep } from "../../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../../utils/constants"
import IconBtn from "../../../../Common/IconBtn"
import Upload from "../Upload"
import ChipInput from "./ChipInput"
import RequirementsField from "./RequirementsField"

export default function CourseInformationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { course, editCourse } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const [courseCategories, setCourseCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      const categories = await fetchCourseCategories()
      console.log("Categories API Result:", categories)
      if (categories && Array.isArray(categories) && categories.length > 0) {
        setCourseCategories(categories)
      }
      setLoading(false)
    }

    if (editCourse) {
      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTags", course.tag)
      setValue("courseBenefits", course.whatYouWillLearn)
      setValue("courseCategory", course.category?._id)
      setValue("courseRequirements", course.instructions)
      setValue("courseImage", course.thumbnail)
    }

    getCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = async (data) => {
    const formData = new FormData()

    if (editCourse) {
      // ✅ FIXED: courseId add karo edit mode mein
      formData.append("courseId", course._id)
      formData.append("courseName", data.courseTitle)
      formData.append("courseDescription", data.courseShortDesc)
      formData.append("price", data.coursePrice)
      formData.append("tag", JSON.stringify(data.courseTags))
      formData.append("whatYouWillLearn", data.courseBenefits)
      formData.append("category", data.courseCategory)
      formData.append("instructions", JSON.stringify(data.courseRequirements))
      if (data.courseImage !== course.thumbnail) {
        formData.append("thumbnailImage", data.courseImage)
      }
    } else {
      formData.append("courseName", data.courseTitle)
      formData.append("courseDescription", data.courseShortDesc)
      formData.append("price", data.coursePrice)
      formData.append("tag", JSON.stringify(data.courseTags))
      formData.append("whatYouWillLearn", data.courseBenefits)
      formData.append("category", data.courseCategory)
      formData.append("status", COURSE_STATUS.DRAFT)
      formData.append("instructions", JSON.stringify(data.courseRequirements))
      formData.append("thumbnailImage", data.courseImage)
    }

    setLoading(true)

    const result = editCourse
      ? await editCourseDetails(formData, token)
      : await addCourseDetails(formData, token)

    if (result) {
      dispatch(setStep(2))
      dispatch(setCourse(result))
    }

    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border border-richblack-700 bg-richblack-800 p-6"
    >
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5">
          Course Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="form-style w-full"
        />
        {errors.courseTitle && (
          <span className="text-xs text-pink-200">Course title is required</span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5">
          Course Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          placeholder="Enter Description"
          {...register("courseShortDesc", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.courseShortDesc && (
          <span className="text-xs text-pink-200">Course Description is required</span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5">
          Course Price <sup className="text-pink-200">*</sup>
        </label>
        <input
          placeholder="Enter Course Price"
          {...register("coursePrice", {
            required: true,
            valueAsNumber: true,
            pattern: { value: /^(0|[1-9]\d*)(\.\d+)?$/ },
          })}
          className="form-style w-full"
        />
        {errors.coursePrice && (
          <span className="text-xs text-pink-200">Course Price is required</span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5">
          Course Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("courseCategory", { required: true })}
          defaultValue=""
          className="form-style w-full"
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {!loading &&
            courseCategories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <span className="text-xs text-pink-200">Course Category is required</span>
        )}
      </div>

      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        setValue={setValue}
        getValues={getValues}
        errors={errors}
      />

      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5">
          Benefits of the course <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          placeholder="Enter benefits of the course"
          {...register("courseBenefits", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.courseBenefits && (
          <span className="text-xs text-pink-200">Benefits of the course is required</span>
        )}
      </div>

      <RequirementsField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />

      <div className="flex justify-end gap-x-2">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
          >
            Continue Without Saving
          </button>
        )}
        <IconBtn
          disabled={loading}
          text={!editCourse ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  )
} 








