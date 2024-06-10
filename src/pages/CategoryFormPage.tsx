import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { getCategory, saveCategory } from "../services/categoryService";
import { useEffect } from "react";
import { useCategories } from "../hooks/useCatgories";
import { toast } from "react-toastify";

const schema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Must be a category" }),
});

type FormData = z.infer<typeof schema>;

export default function CategoryFormPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onChange" });

  const { categories } = useCategories();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetch() {
      if (!id) return;
      const { data: category } = await getCategory(id);
      reset(category);
    }
    fetch();
  }, []);

  async function onSubmit(data: FormData) {
    const category = categories.find((c) => c.name === data.name);
    if (category) return toast.error("Category already exist");
    await saveCategory(data);
    navigate("/");
  }

  return (
    <div className="h-screen grid place-items-center place-content-center">
      <h1 className="mb-4 text-center font-bold text-3xl">New Category</h1>
      <div className="p-10 shadow rounded-3xl ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Category Name</label>
            <input
              {...register("name")}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name && <p className="text-error">{errors.name.message}</p>}
          </div>
          <div className="d-grid justify-content-center mt-4">
            <button className="btn btn-primary" disabled={!isValid}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
